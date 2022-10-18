import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllSpots } from "../../store/spots";
import "./allSpots.css";
// import spotReducer from "../../store/spots";

//Get All Spots Home
// get all spots will be displayed in home
const AllSpots = (spot) => {
  const dispatch = useDispatch();
  const allSpots = useSelector((state) => state.spot.allSpots); //useSelector for the state being used to attain info
  const allSpotsArr = Object.values(allSpots) // attained info in array

  //create function for currentSpot
  
  useEffect(() => {
    dispatch(getAllSpots())
  }, [])

  // if (!manySpots) return null;

  return (
    <>
      <div className="outerSpotContainer">
      <ul>
        {
          allSpotsArr.map(spot => (
            <div className="spotCard">
              <div>{spot.name}</div>
              <div>{spot.address}</div>
              <div>{spot.city}</div>
              <div>{spot.state}</div>
              <div>{spot.description}</div>
              <div>{spot.avgRating}</div>
              <div>{spot.price}</div>
              <NavLink to={`/spots/${spot.id}`}>
              <img className="spotImg" src={spot.previewImage} />
              </NavLink>
            </div>
          ))
        }
      </ul>
      </div>
      {/* <div>

      </div> */}
    </>
  );
};

export default AllSpots;
