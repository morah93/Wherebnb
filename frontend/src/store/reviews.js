import { csrfFetch } from "./csrf";

const VIEW_REVIEWS = "reviews/viewReviews";
const USER_REVIEWS = "reviews/updateReviews";
const ADD_REVIEW = "reviews/addReview";
const REMOVE_REVIEW = "reviews/removeReview";

const viewReviews = (reviews, spotId) => {
  return {
    type: VIEW_REVIEWS,
    reviews,
    spotId,
  };
};

const getUserReview = (userReview) => {
  return {
    type: USER_REVIEWS,
    userReview,
  };
};

const addReview = (createdReview) => {
  return {
    type: ADD_REVIEW,
    createdReview,
  };
};

export const removeReview = (reviewId) => {
  return {
    type: REMOVE_REVIEW,
    reviewId,
  };
};

//------------------------------------------------------------

export const getAllReviews = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`);

  if (res.ok) {
    const reviews = await res.json();
    dispatch(viewReviews(reviews));
    return reviews;
  }
};

export const getUserReviews = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/current`);

  if (res.ok) {
    const userReview = await res.json();
    dispatch(getUserReview(userReview.Reviews));
    return userReview;
  }
};

export const createReview = (review, spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });
  if (res.ok) {
    const createdReview = await res.json();
    dispatch(addReview(createdReview));
    return createdReview;
  }
};

// export const editAReview = (reviewId, payload) => async dispatch => {
//   const res = await csrfFetch(`/api/reviews/${reviewId}`, {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(payload)
//   })
//   if (res.ok) {
//     const review = await res.json();
//     dispatch(updateReview(review));
//     return updateReview
//   }
// }

export const deleteReview = (reviewId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    const reviews = await res.json();
    dispatch(removeReview(reviewId));
    return reviews;
  }
};

const initialState = {
  spotReviews: {},
  userReviews: {},
};

const reviewReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case VIEW_REVIEWS:
      const allReviews = { ...state, spotReviews: {} };
      action.reviews.Reviews.forEach((review) => {
        allReviews.spotReviews[review.id] = review;
      });
      return allReviews;

    case USER_REVIEWS:
      newState = {...state, userReviews:{}}
      // const usersReview = { ...state, userReviews: {} };
      // action.reviews.Reviews.forEach((review) => {
      action.userReview.forEach((review) => {
        newState.userReviews[review.id] = review;
      });
      return newState;

    case ADD_REVIEW:
      const createReview = { ...state, spotReviews: { ...state.spotReviews } };
      createReview.spotReviews[action.createdReview.id] = action.createdReview;
      return createReview;

    case REMOVE_REVIEW:
      const deleteReview = { ...state, spotReviews: { ...state.spotReviews } };

      delete deleteReview.spotReviews[action.reviewId];
      return deleteReview;

    default:
      return state;
  }
};

export default reviewReducer;
