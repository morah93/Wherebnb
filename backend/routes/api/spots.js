const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const {
  SpotImage,
  Spot,
  User,
  Review,
  sequelize,
  Booking,
  ReviewImage,
} = require("../../db/models");
const router = express.Router();
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const spot = require("../../db/models/spot");
const { Op } = require("sequelize");
const e = require("express");

// get all spots
//Done DONT TOUCH
router.get("/", async (req, res) => {
  // let spotsArr = [];
  const allSpots = await Spot.findAll();
  for (let i = 0; i < allSpots.length; i++) {
    //loops thru allspots array
    allSpots[i].dataValues.previewImage = (
      await SpotImage.findOne({
        // creates previewimage key in allSpots
        where: {
          spotId: allSpots[i].id,
          preview: true,
        },
        attributes: ["url"],
      })
    ).url; //keyed into the url and made that the value

    allSpots[i].dataValues.avgRating = (
      await Review.findOne({
        where: {
          spotId: allSpots[i].id,
        },
        attributes: [
          [sequelize.fn("AVG", sequelize.col("stars")), "avgRating"],
        ],
        raw: true,
      })
    ).avgRating;
  }
  res.json(allSpots);
});

//Get all Spots owned by the Current User
// Done DONT TOUCH
router.get("/current", requireAuth, async (req, res) => {
  const allSpots = await Spot.findAll({
    where: {
      ownerId: req.user.id,
    },
  });
  for (let i = 0; i < allSpots.length; i++) {
    //loops thru allspots array

    allSpots[i].dataValues.previewImage = (
      await SpotImage.findOne({
        // creates previewimage key in allSpots
        where: {
          spotId: allSpots[i].id,
          preview: true,
        },
        attributes: ["url"],
      })
    ).url;

    const reviewRating = (allSpots[i].dataValues.avgRating = (
      await Review.findOne({
        where: {
          userId: allSpots[i].id,
          // spotId: allSpots[i].id
        },
        attributes: [
          [sequelize.fn("AVG", sequelize.col("stars")), "avgRating"],
        ],
        raw: true,
      })
    ).avgRating);
    if (reviewRating === null) {
      //checks to see if there is no rating
      allSpots[i].dataValues.avgRating = "currently no ratings";
    } else {
      allSpots[i].dataValues.avgRating = reviewRating;
    }
  }
  res.json(allSpots);
});

//Get details of a Spot from an id
//Done DONT TOUCH
router.get("/:spotId", async (req, res) => {
  const userSpots = await Spot.findByPk(req.params.spotId, {
    include: [
      {
        model: SpotImage,
        attributes: ["id", "url", "preview"], // tryna get information from spotimages
      },
      {
        model: User, //ownerid info
        as: "Owner",
        attributes: ["id", "firstName", "lastName"],
      },
    ],
  });

  // console.log(userSpots, '=============')
  const rating = await Review.findAll({
    where: {
      userId: userSpots.id,
      // spotId: allSpots[i].id
    },
    attributes: [
      [sequelize.fn("AVG", sequelize.col("stars")), "avgRating"],
      [sequelize.fn("COUNT", sequelize.col("id")), "numReviews"],
    ],
    raw: true,
  });
  userSpots.dataValues.avgRating = rating[0].avgRating;
  userSpots.dataValues.numReviews = rating[0].numReviews;

  console.log(rating, "--------");

  res.json(userSpots);
});

//Get all bookings for a spot by id
// Done DONT TOUCH
router.get("/:spotId/bookings", requireAuth, async (req, res) => {
  // const { Bookings, spotId, StartDate, endDate } = req.body
  const userId = req.user.id;
  const allBookings = await Spot.findByPk(req.params.spotId);
  if (!allBookings) {
    res.status(404);
    res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  if (allBookings.ownerId !== userId) {
    const allBookings = await Booking.findAll({
      where: {
        spotId: req.params.spotId,
      },
      attributes: ["spotId", "startDate", "endDate"],
    });

    res.json({
      Bookings: allBookings,
    });
  }

  if (allBookings.ownerId === userId) {
    const newBookings = await Booking.findAll({
      where: {
        spotId: req.params.spotId,
      },
      include: {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
    });
    res.json({
      Bookings: newBookings
    });
  }
});

//Add an Image to a Spot based on the Spot's id
// Done Dont Touch
router.post("/:spotId/images", async (req, res) => {
  // const {id, url, preview,  address, city, state, country, lat, lng, name, description, price  } = req.body;
  const { url, preview } = req.body;
  const userId = req.user.id;
  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot) {
    res.status(404);
    res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  if (userId !== spot.ownerId) {
    res.status(403); //unauthorized
    return res.json("user doesnt have credential to add image");
  }
  // console.log(spot);
  const newImg = await SpotImage.create({
    spotId: req.params.spotId,
    url,
    preview,
  });

  const response = await SpotImage.scope("test").findByPk(newImg.id); // for creating
  res.json(response);
});

// edit a spot
//Done DONT TOUCH
router.put("/:spotId", requireAuth, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  const userId = req.user.id;

  const spotInfo = await Spot.findByPk(req.params.spotId);

  if (!spotInfo) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: res.statusCode,
    });
  }

  if (userId !== spotInfo.ownerId) {
    res.status(403);
    return res.json({
      message: "unauthorized for such action!",
      statusCode: res.statusCode,
    });
  }

  const updatedSpot = await spotInfo.update({
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });

  return res.json(updatedSpot);
});

//Create a Booking from a Spot based on the Spot's id
// Done DONT TOUCH
router.post("/:spotId/bookings", requireAuth, async (req, res) => {
  const spotInfo = await Spot.findByPk(req.params.spotId);
  if (spotInfo.ownerId === req.user.id) {
    // current user
    res.status(403);
    return res.json({
      message: "Invalid operation",
      statusCode: 403,
    });
  }
  const bookings = await Booking.findAll({
    where: {
      spotId: spotInfo.id,
    },
  });
  const { startDate, endDate } = req.body;
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (start >= end) {
    res.status(400);
    return res.json({
      message: "Validation error",
      statusCode: 400,
      errors: {
        endDate: "endDate cannot be on or before startDate",
      },
    });
  }
  for (let i = 0; i < bookings.length; i++) {
    const bookedStart = new Date(bookings[i].dataValues.startDate);
    const bookedEnd = new Date(bookings[i].dataValues.endDate);
    if (
      (start >= bookedStart && start <= bookedEnd) ||
      (end >= bookedStart && end <= bookedEnd) ||
      (start < bookedStart && end > bookedEnd)
    ) {
      res.status(403);
      return res.json({
        message: "Sorry, this spot is already booked for the specified dates",
        statusCode: 403,
        errors: {
          startDate: "Start date conflicts with an existing booking",
          endDate: "End date conflicts with an existing booking",
        },
      });
    }
  }

  const newBooking = await Booking.create({
    spotId: spotInfo.id,
    userId: req.user.id,
    startDate: startDate,
    endDate: endDate,
  });

  return res.json(newBooking);
});

//create a spot
// DONE DONT TOUCH
router.post("/", requireAuth, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;
  const newSpot = await Spot.create({
    ownerId: req.user.id,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });

  // const id = user.id
  // await setTokenCookie(res, user);
  return res.json(newSpot);
});

//Create a Review for a Spot based on the Spot's id
router.post("/:spotId/reviews", requireAuth, async (req, res) => {
  const { review, stars } = req.body;
  const spotInfo = await Spot.findByPk(req.params.spotId);

  if (!spotInfo) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  const allReviews = await Review.findAll({
    where: {
      spotId: spotInfo.id,
      userId: req.user.id,
    },
  });
  // console.log(allReviews)
  if (allReviews.length > 0) {
    res.status(403);
    return res.json({
      message: "User already has a review for this spot",
      statusCode: 403,
    });
  }

  for (let i = 0; i < allReviews.length; i++) {
    if (stars < 1 || stars > 5 || review === null) {
      res.status(400);
      return res.json({
        message: "Validation error",
        statusCode: 400,
        errors: {
          review: "Review text is required",
          stars: "Stars must be an integer from 1 to 5",
        },
      });
    }
  }

  const newReview = await Review.create({
    spotId: spotInfo.id,
    userId: req.user.id,
    review: review,
    stars: stars,
  });

  res.json(newReview);
});

//Delete a spot
//Done DONT TOUCH
router.delete('/:spotId', requireAuth, async (req, res) => {
  const userId = req.user.id
  const userSpot = await Spot.findByPk(req.params.spotId)
  if(userSpot.ownerId !== userId){
      res.status(403)
    return res.json({
      message: 'Unauthorized user input',
      statusCode: 403
    })
  }

  if(!userSpot) {
      res.status(404)
      return res.json({
          "message": "Spot couldn't be found",
          "statusCode": 404
      })
  }

  await userSpot.destroy()
  res.status(200)
  res.json({
      "message": "Successfully deleted",
      "statusCode": 200
  })
})

module.exports = router;
