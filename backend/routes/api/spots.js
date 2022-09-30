const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { SpotImage, Spot, User, Review, sequelize } = require("../../db/models");
const router = express.Router();
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const spot = require("../../db/models/spot");
const { Op } = require("sequelize");

// get all spots
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
      (await Review.findOne({
        where: {
          spotId: allSpots[i].id
        },
        attributes: [
          [
            sequelize.fn('AVG', sequelize.col('stars')), "avgRating"
          ],
        ],
        raw: true

      })
    )).avgRating
  }
  res.json(allSpots);
});

//Get all Spots owned by the Current User
// Done DONT TOUCH
router.get("/current", requireAuth, async (req, res) => {
  const allSpots = await Spot.findAll({
    where: {
      ownerId: req.user.id
    }
  });
  for (let i = 0; i < allSpots.length; i++) {
    //loops thru allspots array

    allSpots[i].dataValues.previewImage = (
      await SpotImage.findOne({ // creates previewimage key in allSpots
        where: {
          spotId: allSpots[i].id,
          preview: true,
        },
        attributes: ["url"],
      })
    ).url;

    const reviewRating = allSpots[i].dataValues.avgRating = (
      (await Review.findOne({
        where: {
          userId: allSpots[i].id,
          // spotId: allSpots[i].id
        },
        attributes: [
          [
            sequelize.fn('AVG', sequelize.col('stars')), "avgRating"
          ],
        ],
        raw: true,

      })
      )).avgRating
      if (reviewRating === null) { //checks to see if there is no rating
        allSpots[i].dataValues.avgRating = "currently no ratings"
        } else {
        allSpots[i].dataValues.avgRating = reviewRating
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
          as: 'Owner',
          attributes: ["id", "firstName", "lastName"],
        },
      ]
  });

 // console.log(userSpots, '=============')
    const rating = await Review.findAll({
        where: {
          userId: userSpots.id,
          // spotId: allSpots[i].id
        },
        attributes: [
          [
            sequelize.fn('AVG', sequelize.col('stars')), "avgRating",
          ],
          [
            sequelize.fn('COUNT', sequelize.col('id')), 'numReviews'
          ]
        ],
        raw: true,

    })
    userSpots.dataValues.avgRating = rating[0].avgRating
    userSpots.dataValues.numReviews = rating[0].numReviews

      console.log(rating, '--------')

  res.json(userSpots);
});



//Add an Image to a Spot based on the Spot's id
// Done Dont Touch
router.post('/:spotId/images', async (req, res) => {
  // const {id, url, preview,  address, city, state, country, lat, lng, name, description, price  } = req.body;
  const { url, preview } = req.body
  const spot = await Spot.findOne({
    where: {
      id: req.params.spotId
    }
  });
  console.log(spot)
  const newImg = await SpotImage.create({ spotId: req.params.spotId, url, preview })

  const response = await SpotImage.scope('test').findByPk(newImg.id)// for creating
  res.json(response)

})

// edit a spot
router.post('/', requireAuth, async (req, res) => {
  // const {}
})



//Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', requireAuth, async (req, res) => {

  const spotInfo = await Spot.findByPk(req.params.spotId);
  if (spotInfo.ownerId === req.user.id){ // current user
    throw new Error('Invalid Operation')

  }

  // if(spotInfo.)


})

//create a spot
// DONE DONT TOUCH
router.post('/', requireAuth, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body;
  const newSpot = await Spot.create({ ownerId: req.user.id, address, city, state, country, lat, lng, name, description, price });

  // const id = user.id
  // await setTokenCookie(res, user);
  res.json( newSpot)
})
module.exports = router;
