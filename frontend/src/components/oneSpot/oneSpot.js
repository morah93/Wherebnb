import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOneSpot } from "../../store/spots";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { deleteSpot } from "../../store/spots";
import { getAllReviews } from "../../store/reviews";
import { createReview } from "../../store/reviews";
import { deleteReview, removeReview } from "../../store/reviews";
// import { getUserReviews } from "../../store/reviews";
// import "./allSpots.css";
// import editASpot from "../editSpot/editSpot";

const OneSpot = () => {
  const dispatch = useDispatch();
  const { spotId, reviewId } = useParams();
  const history = useHistory();
  console.log(spotId,'=============spotId')
  const user = useSelector((state) => state.session.user);
  console.log(user, '---------USER')
  const allReviews = useSelector((state) => state.reviews.spotReviews); //useSelector for the state being used to attain info
  const allReviewsArr = Object.values(allReviews)
  console.log(allReviews, '++++++++++++++++++++++')

  useEffect(() => {
    dispatch(getOneSpot(spotId));
  }, [spotId]);



  const oneSpot = useSelector((state) => state.spot.spot); //useSelector for the state being used to attain info
  console.log(oneSpot, "onespot------");



  useEffect(() => {
    dispatch(getAllReviews(spotId))
  }, [spotId])

  const spotDelete = () => {
    dispatch(deleteSpot(spotId))
      .then(() => {
        alert("Deletion Successful");
        history.push("/");
    })
  };

  const addReview = (spotId) => {
    dispatch(createReview(spotId))
    history.push(`/spots/${spotId}/reviews`)
  }

  const reviewDelete = (reviewId) => {
    dispatch(deleteReview(reviewId))
      .then(() => {
        alert("Deletion Successful");
        // history.push(`/spots/${spotId}/reviews`);
        dispatch(removeReview(reviewId))
    })
  };

  if (!oneSpot.SpotImages) return null;

  return (
    <>
      <div className='outerContainer'>
        <ul>
          <img
            className='spotImg'
            src={oneSpot?.SpotImages[0].url}
          />
          <div>{oneSpot?.name}</div>
          <div>{oneSpot?.address}</div>
          <div>{oneSpot?.city}</div>
          <div>{oneSpot?.state}</div>
          <div>{oneSpot?.description}</div>
          <div>{oneSpot?.avgRating}</div>
          <div>{oneSpot?.price}</div>
          <div>

          </div>
          {oneSpot?.ownerId === user?.id && (
            <button
              onClick={() => {
                history.push(`${oneSpot.id}/edit`);
              }}
            >
              Edit Spot
            </button>
          )}
            {user && (
              <button onClick={() => addReview(spotId)}>Create Review</button>
            )}
          {oneSpot?.ownerId === user?.id && (
            <button onClick={() => spotDelete()}>delete spot</button>
          )}

        </ul>
        <h1>Reviews</h1>
        <div>
        <ul>
          {
            allReviewsArr.map(review => (
              <div key={review.id}>
                <div>{ review?.User?.firstName }</div>
                <div>{ review?.User?.lastName}</div>
                <div>{ review.review }</div>
                <div>{ review.stars}</div>
                {review?.userId === user?.id && (
                  <button onClick={() => reviewDelete(review.id)}>delete review</button>
                )}
              </div>
            ))
        }
      </ul>
        </div>

      </div>
    </>
  );
};

export default OneSpot;
