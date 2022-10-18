import { csrfFetch } from "./csrf";

const VIEW_SPOTS = 'spots/viewSpots';
const VIEW_CURRENT = 'spots/viewCurrent';
// const ADD_SPOT = 'spots/addSpot';
// const UPDATE_SPOT = 'spots/updateSpot';
// // const ADD_IMAGE = 'spots/addImage';
// const REMOVE_SPOT = 'spots/removeSpot';


const viewSpots = (spots) => {
  return {
    type: VIEW_SPOTS,
    spots
  };
};

const viewCurrent = (spot) => {

  return {
    type: VIEW_CURRENT,
    spot
  };
};

// const updateSpot = (spotId) => {

//   return {
//     type: UPDATE_SPOT,
//     spotId,
//   };
// };

// const setSpot = (spot) => {

//   return {
//     type: ADD_SPOT,
//     payload: spot,
//   };
// };

// const addImage = (spotId) => {
//   return {
//     type: ADD_IMAGE,
//     spotId
//   };
// };

// const removeSpot = (spotId) => {
//   return {
//     type: REMOVE_SPOT,
//     spotId
//   };
// };


export const getAllSpots = () => async dispatch => {
  const res = await csrfFetch('/api/spots')

  if (res.ok) {
    const spots = await res.json();
    dispatch(viewSpots(spots));
    return spots
  }
}

export const getOneSpot = (spotId) => async dispatch => {
  const res = await csrfFetch(`/api/spots/${spotId}`)

  if (res.ok) {
    const spot = await res.json();
    dispatch(getOneSpot(spot));
    return spot
  }
}

// export const createSpot = (spot) => async dispatch => {
//   const res = await csrfFetch('/api/spots/', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(spot)
//   })
//   if (res.ok) {
//     const createdSpot = await res.json();
//    dispatch(createdSpot(spot));
//     return createdSpot
//   }
// }

// export const updateASpot = () => async dispatch => {
//   const res = await csrfFetch('/api/spots/:spotId')
//   if (res.ok) {
//     const spot = await res.body();
//    const updateSpotThunk = dispatch(updateSpot(spot));
//     return updateSpot
//   }
// }

// export const deleteSpot = (spotId) => async dispatch => {
//   const res = await csrfFetch(`/api/spots/${spotId}`,{
//     method: 'DELETE'
// })
//   if (res.ok) {
//     const spots = await res.json();
//    const deleteSpotThunk = dispatch(deleteSpot(spotId));
//     return null
//   }
// }

//reducer
const initialState = {
  allSpots: {},
  spot: {}
}

const spotReducer = (state = initialState, action) => {
  // let newState;
  switch (action.type) {
    case VIEW_SPOTS:
      const manySpots = { ...state, allSpots: { ...state.allSpots } }
      action.spots.forEach(spot => {
        manySpots.allSpots[spot.id] = spot
      });
      return manySpots

    case VIEW_CURRENT:
      const oneSpot = { ...state }
      action.spots.forEach(spot => {
        oneSpot.spot[spot.id] = spot
      })
      return oneSpot

    // case UPDATE_SPOT:
    //   newState = { ...state }
    //   const updatedSpot = action.spot
    //   newState = {
    //     updatedSpot: {
    //       [action.spot.id]: updatedSpot
    //     }
    //   }
    //   return newState

    // case ADD_SPOT:
    //    newState = {...state}
    //   const newSpot = action.spot
    //   newState = {
    //     oneSpot: {
    //       [action.spot.id]: newSpot
    //     }
    //   }
    //   return newState


// rest goes above
    default:
      return state
  }
}

export default spotReducer
