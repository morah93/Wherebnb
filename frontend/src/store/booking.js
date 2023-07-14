import { csrfFetch } from "./csrf";

// ACTIONS
const VIEW_USER_BOOKINGS = "booking/viewUserBooking";
const VIEW_BOOKINGS = "booking/viewBooking";
const ADD_BOOKING = "booking/createBooking";
const EDIT_BOOKING = "booking/editBooking";
const DELETE_BOOKING = "booking/deleteBooking";

const actionViewUserBookings = (payload) => {
  return {
    type: VIEW_USER_BOOKINGS,
    payload,
  };
};
const actionViewBookings = (payload) => {
  return {
    type: VIEW_BOOKINGS,
    payload,
  };
};
const actionCreateBooking = (payload) => {
  return {
    type: ADD_BOOKING,
    payload,
  };
};
const actionEditBooking = (payload) => {
  return {
    type: EDIT_BOOKING,
    payload,
  };
};
const actionDeleteBooking = (payload) => {
  return {
    type: DELETE_BOOKING,
    payload,
  };
};

//THUNKS

export const thunkViewAllUserBookings = () => async (dispatch) => {
  const res = await csrfFetch(`/api/bookings/current`);

  if (res.ok) {
    const payload = await res.json();
    console.log('userBookings', payload)
    dispatch(actionViewUserBookings(payload));
    return payload;
  }
};
export const thunkViewAllSpotBookings = (payload) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${payload}/bookings`);

  if (res.ok) {
    const bookings = await res.json();
    dispatch(actionViewBookings(bookings));
    return bookings;
  }
};

export const thunkCreateBooking = (payload, spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // body: JSON.stringify({startDate: payload.startDate, endDate:payload.endDate}),
    body: JSON.stringify(payload),
  });
  // console.log('RESSSSSS', res)
  if (res.ok) {
    const newBooking = await res.json();
    dispatch(actionCreateBooking(newBooking));
    return newBooking
  } else {
    return res.json
  }
};

export const thunkUpdateBooking = (payload, bookingId) => async (dispatch) => {
  console.log('payload', payload)
  const res = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (res.ok) {
    const payload = await res.json();
    dispatch(actionEditBooking(payload));
    return payload;
  }
  return;
};

export const thunkDeleteBooking = (bookingId) => async (dispatch) => {
  const res = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    // const bookings = await res.json();
   await dispatch(actionDeleteBooking(bookingId));
  }
  return
};

//Reducer
const initialState = {
  // bookings: {
    // user: {}
    // spot: {}
  // }
  // spotBookings: {},
  // userBookings: {},
};

const bookingReducer = (state = initialState, action) => {
  let newState = {...state};
  switch (action.type) {
    //get all spot bookings
    case VIEW_BOOKINGS:
      newState = {}
      // const allBookings = { ...state, spotBookings: {} };
      action.payload.Bookings.forEach((booking) => {
        newState[booking.id] = booking;
      });
      return newState;

    //get user bookings
    case VIEW_USER_BOOKINGS:
      newState = {}
      // const allUserBookings = { ...state, userBookings: {} };
      action.payload.Bookings.forEach((booking) => {
        newState[booking.id] = booking;
      });
      return newState;

    // create booking
    case ADD_BOOKING:

      newState[action.payload.id] = action.payload;
      return newState;

    //edit booking
    case EDIT_BOOKING:

      newState[action.payload.id] = {...newState[action.payload.id], ...action.payload};
      return newState

    //delete booking
    case DELETE_BOOKING:
      delete newState[action.payload]
      return newState

    // rest goes above
    default:
      return state;
  }
};

export default bookingReducer;
