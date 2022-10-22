import { csrfFetch } from "./csrf";

const VIEW_USERS = 'spots/viewSpots'//users spot
const VIEW_SPOTS = 'spots/viewSpots';
const VIEW_CURRENT = 'spots/viewCurrent';//one spot
const UPDATE_SPOT = 'spots/updateSpot';
const ADD_SPOT = 'spots/addSpot';
// // const ADD_IMAGE = 'spots/addImage';
const REMOVE_SPOT = 'spots/removeSpot';


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

export const viewUserSpots = (userId, spots) => {
  return {
    type: VIEW_USERS,
    userId,
    spots
  }
}

const updateSpot = (spotId) => {

  return {
    type: UPDATE_SPOT,
    spotId,
  };
};

const addSpot = (spot) => {

  return {
    type: ADD_SPOT,
     spot
  };
};

// const addImage = (spotId) => {
//   return {
//     type: ADD_IMAGE,
//     spotId
//   };
// };

const removeSpot = (spotId) => {
  return {
    type: REMOVE_SPOT,
    spotId
  };
};

//------------------------------------------------

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

    dispatch(viewCurrent(spot));
    return spot
  }
}

export const getUsersSpots = () => async dispatch => {
  const res = await csrfFetch('/api/spots/current')

  if (res.ok) {
    const userSpots = await res.json();
    dispatch(viewUserSpots(userSpots));
    return userSpots
  }
}

export const createSpot = (spot) => async dispatch => {
  const res = await csrfFetch('/api/spots/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(spot)
  })
  if (res.ok) {
    const createdSpot = await res.json();
   dispatch(addSpot(createdSpot));
    return createdSpot
  }
}

export const editASpot = (spotId, payload) => async dispatch => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  if (res.ok) {
    const spot = await res.json();
    dispatch(updateSpot(spot));
    return updateSpot
  }
}

export const deleteSpot = (spotId) => async dispatch => {
  const res = await csrfFetch(`/api/spots/${spotId}`,{
    method: 'DELETE'
})
  if (res.ok) {
    const spots = await res.json();
    dispatch(removeSpot(spotId));
  }
}

//reducer
const initialState = {
  allSpots: {},
  spot: {}
}

const spotReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case VIEW_SPOTS:
      const manySpots = { ...state, allSpots: {...state.allSpots} }
      action.spots.forEach(spot => {
        manySpots.allSpots[spot.id] = spot
      });
      return manySpots

    case VIEW_USERS:
      const manyUserSpots = {allSpots: { }, spot: {}}
      action.spots.forEach(spot => {
        manyUserSpots.allSpots[spot.id] = spot
      });
      return manyUserSpots

    case VIEW_CURRENT:
      const oneSpot = {}//dont spread state due to get request. rely on db
        oneSpot.spot = action.spot
      return oneSpot

    case UPDATE_SPOT:
      newState = { ...state, spot: {...state.spot} }
      const updatedSpot = action.spot
      newState.spot = {...newState.spot, ...updatedSpot}
      return newState

    case ADD_SPOT:
       newState = {...state}
      const newSpot = action.spot
      newState = {
        oneSpot: {
          [action.spot.id]: newSpot
        }
      }
      return newState

      case REMOVE_SPOT:
        const deleteSpot = {
          allSpots: { ...state.allSpots },
          Spot: { ...state.spot }
        }
          delete deleteSpot.allSpots[action.id];
          return deleteSpot;



// rest goes above
    default:
      return state
  }
}

export default spotReducer
