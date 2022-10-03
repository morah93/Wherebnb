const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const {
  SpotImage,
  Spot,
  User,
  Review,
  sequelize,
  ReviewImage,
} = require("../../db/models");
const router = express.Router();
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
// const Spot = require("../../db/models/spot");
const { Op } = require("sequelize");



//Add an Image to a Review based on the Review's id
//Needs work Resource not found error
router.post("/:reviewId/images", requireAuth, async (req, res) => {
  const { url } = req.body;
  const userId = req.user.id;
  const reviewInfo = await Review.findByPk(req.params.reviewId)

  if (!reviewInfo) {
    // current user
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  // console.log(reviewInfo,'--------------')
  if (reviewInfo.userId !== userId) {
    res.status(403);
    res.json({
      message: "Unauthorized for such action",
      statusCode: res.statusCode,
    });
  }
  const reviewImgs = await ReviewImage.findAll({
    where: {
      reviewId: req.params.reviewId,
    },
  });

  if (reviewImgs.length === 10) {
    res.status(403);
    res.json({
      message: "Maximum number of images for this resource was reached",
      statusCode: res.statusCode,
    });
  }

  const newreviewImage = await ReviewImage.create({
    reviewId: req.params.reviewId,
     url,
  });

  res.json(newreviewImage);
});



//Edit a review

router.put('/:reviewId', requireAuth, async (req, res) => {

  const {review, stars} = req.body;
  const reviewInfo = await Review.findByPk(req.params.reviewId)
  if(!reviewInfo) {
      res.status(404)
      res.json({
          "message": "Review couldn't be found",
          "statusCode": 404
      })
  }

  const userId = req.user.id
  if (reviewInfo.userId !== userId) {
    res.status(403)
    res.json({
      message: 'review must belong belong to the current user',
      statusCode: 403
    })
  }
  // const getspotId = await Spot.findAll({
  //   where: {
  //     id: reviewInfo.spotId
  //   }
  // })
  // console.log(reviewInfo, '--------')
   await reviewInfo.update({

    review,
    stars,
    // userId: userId,
    // spotId: getspotId.id
  });

  res.json(reviewInfo);
})

router.delete('/:reviewId', requireAuth, async (req, res) => {

  const userId = req.user.id
  const userReview  = await Review.findByPk(req.params.reviewId)

  if (userReview.userId !== userId) {
      res.status(403)
      res.json({
          message: 'Unauthorized user input',
          statusCode: 403
      })
  }
  if(!userReview) {

      res.status(404)
      res.json({
          "message": "Review couldn't be found",
          "statusCode": 404
      })
  }
  userReview.destroy();
  res.json({
      "message": "Successfully deleted",
      "statusCode": 200
  })
})
module.exports = router;
