import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOneSpot } from "../../store/spots";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { deleteSpot } from "../../store/spots";
import { getAllReviews } from "../../store/reviews";
import { createReview } from "../../store/reviews";
import { deleteReview, removeReview } from "../../store/reviews";
// import { DatePicker } from "@skbkontur/react-ui";
import { thunkCreateBooking } from "../../store/booking";
// import { getUserReviews } from "../../store/reviews";
import "./oneSpot.css";
import EditSpotModal from "../editSpot";
import AddReviewModal from "../addReview";
// import editASpot from "../editSpot/editSpot";

const OneSpot = ({ setEditSpotModal, setAddReviewModal }) => {
	// const dayjs = require("dayjs");
	const dispatch = useDispatch();
	const { spotId, reviewId } = useParams();
	const history = useHistory();
	// const [lib, setLib] = useState("");
	// const [native, setNative] = useState("");
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [errors, setErrors] = useState([]);
	const [validationErrors, setValidationErrors] = useState([]);
	// if (trip && !startDate && !endDate) {
	// 	setStartDate(trip.startDate);
	// 	setEndDate(trip.endDate);
	// }

	// let numDays =
	// 	(endDate - startDate) / 86400000 ? (endDate - startDate) / 86400000 : 0;
	// const currentDate = new Date();

	const user = useSelector((state) => state.session.user);

	const allReviews = useSelector((state) => state.reviews.spotReviews); //useSelector for the state being used to attain info
	const allReviewsArr = Object.values(allReviews);
	// const [createReviewModal, setCreateReviewModal] = useState(false);

	const singleSpot = useSelector((state) => state.spot?.singleSpot);

	useEffect(() => {
		// console.log('oneSpot useEffect+++++++++')
		dispatch(getOneSpot(spotId));
	}, [dispatch, spotId, singleSpot, allReviews]);

	const oneSpot = useSelector((state) => state.spot[spotId]); //useSelector for the state being used to attain info

	// console.log(oneSpot, "onespot----------------=======");
	useEffect(() => {
		dispatch(getAllReviews(spotId));
	}, [dispatch, spotId]);

	useEffect(() => {
		const errors = [];
		const currentDate = new Date();
		if (startDate <= currentDate) errors.push("Invalid Start Date");
		if (endDate <= currentDate) errors.push("Invalid End Date");
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
		// setAddReviewModal(true)
		history.push(`/spots/${spotId}/reviews`);
	};

	const reviewDelete = (reviewId) => {
		dispatch(deleteReview(reviewId)).then(() => {
			alert("Deletion Successful");
			// history.push(`/spots/${spotId}/reviews`);
			dispatch(removeReview(reviewId));
		});
	};
	let foundReview = true;
	for (let i = 0; i < allReviewsArr.length; i++) {
		if (user) {
			if (user.id === allReviewsArr[i].userId) foundReview = false;
		}
	}

	if (!oneSpot?.SpotImages) return null;

	// const onNativeChange = (e) => {
	// 	console.log("onNativeChange: ", e.target.value);
	// 	setNative(e.target.value);
	// };

	// const onLibChange = (value) => {
	// 	console.log("onLibChange: ", value);
	// 	setLib(value);
	// };

	const onSubmit = async (e) => {
		e.preventDefault();
		const payload = {
			startDate,
			endDate,
		};
		console.log(validationErrors);

		if (!validationErrors.length) {
			// const data = await
			return dispatch(thunkCreateBooking(payload, spotId))
				.then(() => {
					// history.push("/");
					alert("Booking Successful");
				})
				.catch(async (res) => {
					const data = await res.json();
					if (data && data.errors) setErrors(data.errors);
					console.log(errors);
				});
			// history.push(`/spots/${spotId}`);
		}
	};

	return (
		<>
			<div className='outerContainer'>
				<div className='innerContainer'>
					{/* <ul> */}
					{/* <div className='nameAndStar'> */}
					<div id='spotName'>{oneSpot?.name}</div>
					<div
						id='rating'
						className='fa fa-star'
					>
						{/* {
								{ for(i = 0; i<allReviews.length; i++) {

									console.log(allReviews[i], 'starrssssss')
                }
							}} */}
						<div id='number'>{Number(oneSpot?.avgRating).toFixed(1)}</div>
					</div>
					{/* </div> */}
					<div className='imgContainer'>
						<img
							className='spotImg1'
							src={oneSpot?.SpotImages[0]?.url}
						/>
					</div>
					<div className='spotInfoAndBooking'>
						{/* <div className='bookingContainer'> */}
						{oneSpot?.ownerId !== user?.id && (
							<div className='booking'>
								<div id='price'>{`$${oneSpot?.price} night`}</div>
								<div className='nameAndStar'>
									<div
										id='rating'
										className='fa fa-star'
									></div>
									<div id='number'>{Number(oneSpot?.avgRating).toFixed(1)}</div>
								</div>
								<form onSubmit={onSubmit}>
									<div className="errorList">
									<ul>
										{validationErrors.map((error, idx) => (
											<li key={idx}>{error}</li>
										))}
									</ul>
									</div>
									<div className='App'>
										<input
											type='date'
											value={startDate}
											onChange={(e) => setStartDate(e.target.value)}
										/>
										<input
											type='date'
											value={endDate}
											onChange={(e) => setEndDate(e.target.value)}
										/>

										{/* <DatePicker
                      value={native}
                      onValueChange={onNativeChange}
                    /> */}
									</div>
									<button type='submit'>Submit</button>
								</form>
							</div>
						)}
						{/* </div> */}
						<div className='spotInfo'>
							{/* <div id='address'>{oneSpot?.address}</div> */}
							<div id='cityState'>{`${oneSpot?.city}, ${oneSpot?.state}`}</div>
							<div id='country'>{oneSpot?.country}</div>
							<div id='description'>{`${oneSpot?.description}`}</div>
							{/* <div id='price'>{`$${oneSpot?.price} night`}</div> */}
							<div></div>
						</div>
					</div>
					{oneSpot?.ownerId === user?.id && (
						// <button
						//   className='editButton'
						//   onClick={() => {
						//     setEditSpotModal(true)
						//     history.push(`${oneSpot.id}/edit`);
						//   }}
						// >
						//   Edit Spot
						// </button>
						<EditSpotModal spot={oneSpot} />
					)}
					{/* {if (user && user != user.id) && foundReview && ( */}
					{user && foundReview && (
						<AddReviewModal />
						// <button
						//   className='createReviewButton'
						//   onClick={() => {
						//     // setAddReviewModal(true)
						//     addReview(spotId);
						//   }}
						// >
						//   Create Review
						// </button>
					)}
					{oneSpot?.ownerId === user?.id && (
						<button
							className='deleteButton'
							onClick={() => spotDelete()}
						>
							Delete Spot
						</button>
					)}
					{/* </ul> */}
					<h3 className='review'>Reviews</h3>
					{/* <ul> */}
					<div className='reviewContainer'>
						{allReviewsArr.map((review) => (
							<div
								className='userReview'
								key={review.id}
							>
								<div>
									<i
										id='starReview'
										className='fa fa-star'
									></i>
									{`Stars: ${review.stars}`}
									{review.length}
								</div>
								<div className='userReviewNames'>{`${review?.User?.firstName} ${review?.User?.lastName}`}</div>
								<div className='userReview1'>{`"${review.review}"`}</div>
								{review?.userId === user?.id && (
									<button
										className='deleteReviewButton'
										onClick={() => reviewDelete(review.id)}
									>
										Delete Review
									</button>
								)}
							</div>
						))}
					</div>
					{/* </ul> */}
				</div>
			</div>
		</>
	);
};

export default OneSpot;
