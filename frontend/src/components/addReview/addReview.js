import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSpot } from "../../store/spots";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { createReview } from "../../store/reviews";
import "./addReview.css";

const AddReview = ({setAddReviewModal}) => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmit, setHasSubmit] = useState(false);
  const history = useHistory();
  // const [createReviewModal, setCreateReviewModal] = useState(false)

  useEffect(
    (setAddReviewModal) => {
      const errors = [];
      if (!review.length) errors.push("Review cannot be empty");
      if (review.length > 255) errors.push("Review too long");
      if (!stars) errors.push("Please put a valid number");
      setValidationErrors(errors);
    },
    [review, stars]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      review,
      stars,
    };

    if (!validationErrors.length) {
      dispatch(createReview(payload, spotId)).then(() => {
        history.push(`/spots/${spotId}`);
      });
      setAddReviewModal(false);
    }

    // if (!validationErrors.length) {
    //   dispatch(createReview(payload, spotId))
    //     .then(() => {

    //       history.push(`/spots/${spotId}`);
    //     })
    //     .catch(() => {

    //     })

    // }
  };

  return (
    <>
      <div className='createReview'>
        <form
          id='review-form'
          onSubmit={handleSubmit}
        >
          <h2 className='review'>Please Leave a Review</h2>
          {validationErrors.length > 0 &&
            validationErrors.map((err) => {
              <div>{err}</div>;
            })}
          <div id='review-content'>
            <textarea
              id='review-text'
              placeholder='....type here'
              value={review}
              onChange={(e) => setReview(e.target.value)}
              // required
              maxLength={255}
            />
            <i className='fa fa-star'></i>
            <input
              id='review-rating'
              type='number'
              min='1'
              max='5'
              placeholder=''
              value={stars}
              onChange={(e) => setStars(e.target.value)}
              // required
            />
            <button
              className='submitButton'
              id='review-button'
              type='submit'
            >
              Submit Review
            </button>

            <button
              className='cancelButton'
              onClick={() => {
                setAddReviewModal(false)
                history.push(`/spots/${spotId}`);
              }}
            >
              Cancel
            </button>
          </div>

          {/* {hasSubmit && validationErrors.length > 0 && (
            <div id='error-div'>
            The following errors were found:
            <ul id='error-list'>
            {validationErrors.map((error, idx) => <li id='errors' key={idx}>{error}</li>)}
            </ul>
            </div>
          )} */}
        </form>
      </div>
    </>
  );
};

export default AddReview;
