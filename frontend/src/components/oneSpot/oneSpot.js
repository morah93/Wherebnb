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

  const user = useSelector((state) => state.session.user);

  const allReviews = useSelector((state) => state.reviews.spotReviews); //useSelector for the state being used to attain info
  const allReviewsArr = Object.values(allReviews);


  useEffect(() => {
    dispatch(getOneSpot(spotId));
  }, [spotId]);

  const oneSpot = useSelector((state) => state.spot.spot); //useSelector for the state being used to attain info


  useEffect(() => {
    dispatch(getAllReviews(spotId));
  }, [spotId]);

  const spotDelete = () => {
    dispatch(deleteSpot(spotId)).then(() => {
      alert("Deletion Successful");
      history.push("/");
    });
  };

  const addReview = (spotId) => {
    dispatch(createReview(spotId));
    history.push(`/spots/${spotId}/reviews`);
  };

  const reviewDelete = (reviewId) => {
    dispatch(deleteReview(reviewId)).then(() => {
      alert("Deletion Successful");
      // history.push(`/spots/${spotId}/reviews`);
      dispatch(removeReview(reviewId));
    });
  };

  if (!oneSpot?.SpotImages) return null;

  return (
    <>
      <div className='outerContainer'>
        <div className='innerContainer'>
          <ul>
            {/* <i className='fa-sharp fa-solid fa-star'></i> */}
            <div id='rating'>{Math.trunc(oneSpot?.avgRating)}</div>
            <img
              className='spotImg1'
              src={oneSpot?.SpotImages[0]?.url}
            />
            <div id='spotName'>{oneSpot?.name}</div>
            <div id='address'>{oneSpot?.address}</div>
            <div id='cityState'>{`${oneSpot?.city}, ${oneSpot?.state}`}</div>
            <div id='country'>{oneSpot?.country}</div>
            <div id='description'>{`${oneSpot?.description}`}</div>
            <div id='price'>{`$${oneSpot?.price} per night`}</div>
            <div></div>
            {oneSpot?.ownerId === user?.id && (
              <button
                className='editButton'
                onClick={() => {
                  history.push(`${oneSpot.id}/edit`);
                }}
              >
                Edit Spot
              </button>
            )}
            {user && (
              <button
                className='createButton'
                onClick={() => addReview(spotId)}
              >
                Create Review
              </button>
            )}
            {oneSpot?.ownerId === user?.id && (
              <button
                className='deleteButton'
                onClick={() => spotDelete()}
              >
                delete spot
              </button>
            )}
          </ul>
          <h1 className='review'>Reviews</h1>
          <h2></h2>
          {/* <ul> */}
          {allReviewsArr.map((review) => (
            <div
              className='userReview'
              key={review.id}
            >
              <div>
                <div>
                  <i
                    id='starReview'
                    className='fa-sharp fa-solid fa-star'
                  ></i>
                  {`Stars: ${review.stars}`}
                </div>
                <div className='userReviewNames'>{`${review?.User?.firstName} ${review?.User?.lastName}`}</div>
                <div className='userReview'>{`"${review.review}"`}</div>
                {review?.userId === user?.id && (
                  <button
                    className='deleteButton'
                    onClick={() => reviewDelete(review.id)}
                  >
                    Delete Review
                  </button>
                )}
              </div>
            </div>
          ))}
          {/* </ul> */}
        </div>
      </div>
    </>
  );
};

export default OneSpot;
