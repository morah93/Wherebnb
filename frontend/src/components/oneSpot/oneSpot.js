import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOneSpot } from "../../store/spots";
import { useParams } from "react-router-dom";
// import "./allSpots.css";
// import spotReducer from "../../store/spots";

const OneSpot = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  console.log(spotId)
  const oneSpot = useSelector((state) => state.spot.allSpots[spotId]); //useSelector for the state being used to attain info
  // const oneSpotArr = Object.values(oneSpot.spot.id); // attained info in array

  // useEffect(() => {
  //   dispatch(getOneSpot(spotId));
  // }, []);

  return (
    <>
      <h1>suuuuup</h1>
      <div>
      <ul >
        <div>{oneSpot?.name}</div>
        <div>{oneSpot?.address}</div>
        <div>{oneSpot?.city}</div>
        <div>{oneSpot?.state}</div>
        <div>{oneSpot?.description}</div>
        <div>{oneSpot?.avgRating}</div>
        <div>{oneSpot?.price}</div>
        <button>Reviews</button>
      </ul>
      </div>
    </>
  );
};

export default OneSpot;
