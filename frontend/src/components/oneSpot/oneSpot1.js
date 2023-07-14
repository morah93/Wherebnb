import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOneSpot } from "../../store/spots";
import { useHistory, useParams } from "react-router-dom";
import { deleteSpot } from "../../store/spots";
import { getAllReviews } from "../../store/reviews";
import { createReview } from "../../store/reviews";
import { deleteReview, removeReview } from "../../store/reviews";
import { thunkCreateBooking } from "../../store/booking";
import "./oneSpot.css";
import EditSpotModal from "../editSpot";
import AddReviewModal from "../addReview";

const OneSpot1 = ({ setEditSpotModal, setAddReviewModal }) => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const history = useHistory();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const currentDate = new Date().toISOString().slice(0, 10);
  const user = useSelector((state) => state.session.user);
  const oneSpot = useSelector((state) => state.spot[spotId]);

  useEffect(() => {
    dispatch(getOneSpot(spotId));
  }, [dispatch, spotId]);

  useEffect(() => {
    dispatch(getAllReviews(spotId));
  }, [dispatch, spotId]);

  useEffect(() => {
    const errors = [];

    if (startDate <= currentDate) errors.push("Invalid Start Date");
    if (endDate <= currentDate) errors.push("Invalid End Date");
    if (startDate === endDate) errors.push("End date cannot equal start date");
    setValidationErrors(errors);
  }, [startDate, endDate]);

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
      dispatch(removeReview(reviewId));
    });
  };

  if (!oneSpot?.SpotImages) return null;
  const spotOwner = oneSpot.owner;

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      startDate,
      endDate,
    };

    if (!validationErrors.length) {
      dispatch(thunkCreateBooking(payload, spotId))
        .then(() => {
          alert("Booking Successful");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <div className="outerContainer">
        <div className="innerContainer">
          <div className="nameAndStar1">
            <div id="spotName">{oneSpot?.name}</div>
          </div>
          <div id="cityStateCountry">{`${oneSpot?.city}, ${oneSpot?.state}, ${oneSpot?.country}`}</div>
          <div className="imgContainer">
            <img className="spotImg1" src={oneSpot?.SpotImages[0]?.url} />
          </div>
          <div className="spotInfoAndBooking">
            {oneSpot?.ownerId !== user?.id && (
              <div className="booking">
                <div className="bookingContainer">
                  <form onSubmit={onSubmit}>
                    <div className="bookingInputs">
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        min={currentDate}
                        max={endDate || ""}
                      />
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        min={startDate || ""}
                      />
                    </div>
                    {validationErrors.length > 0 && (
                      <div className="validationErrors">
                        {validationErrors.map((error, idx) => (
                          <div key={idx}>{error}</div>
                        ))}
                      </div>
                    )}
                    <button
                      className="bookingSubmit"
                      type="submit"
                      disabled={validationErrors.length > 0}
                    >
                      Book
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OneSpot1;
