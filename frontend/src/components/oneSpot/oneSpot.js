import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOneSpot } from "../../store/spots";
import { useHistory, useParams } from "react-router-dom";
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
import { GoogleMap, Marker } from "@react-google-maps/api";
// import editASpot from "../editSpot/editSpot";

const OneSpot = ({ setEditSpotModal, setAddReviewModal }) => {
	// const dayjs = require("dayjs");
	const dispatch = useDispatch();
	const { spotId, reviewId } = useParams();
	const history = useHistory();
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [errors, setErrors] = useState([]);
	const [hasSubmitted, setHasSubmitted] = useState(false);
	const [validationErrors, setValidationErrors] = useState([]);

	let currentDate = new Date().toISOString().slice(0, 10);
	const bookedDates = useSelector((state) => state.spot.bookedDates);
	const user = useSelector((state) => state.session.user);

	const allReviews = useSelector((state) => state.reviews.spotReviews); //useSelector for the state being used to attain info
	const allReviewsArr = Object.values(allReviews);
	// const [createReviewModal, setCreateReviewModal] = useState(false);

	useEffect(() => {
		dispatch(getOneSpot(spotId));
	}, [dispatch, spotId, allReviews]);

	const oneSpot = useSelector((state) => state.spot[spotId]); //useSelector for the state being used to attain info
	// const firstName = oneSpot.;
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
	const spotOwner = oneSpot.owner; //useSelector for the state being used to attain info
	console.log("onespot", oneSpot);
	console.log("one", spotOwner);

	const onSubmit = async (e) => {
		e.preventDefault();
		setHasSubmitted(true);
		const payload = {
			startDate,
			endDate,
		};
		console.log("currentDAte", currentDate);
		console.log("startDAte", startDate);
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

	const isDateBooked = (date) => {
		return bookedDates.includes(date);
	};

	return (
		<>
			<div className='outerContainer'>
				<div className='innerContainer'>
					{/* <ul> */}
					{/* </div> */}
					<div className='imgContainer'>
					<div className='nameAndStar1'>
						<div id='spotName'>{oneSpot?.name}</div>

						<div id='cityStateCountry'>{`${oneSpot?.city}, ${oneSpot?.state}, ${oneSpot?.country}`}</div>
					</div>
						<img
							className='spotImg1'
							src={oneSpot?.SpotImages[0]?.url}
						/>
					</div>
					<div className='spotInfoAndBooking'>
						{/* <div className='bookingContainer'> */}
						{oneSpot?.ownerId !== user?.id && (
							<div className='booking'>
								<div className='nameAndStar'>
									<div id='price'>{`$${oneSpot?.price} night`}</div>
									<div
										id='rating'
										className='fa fa-star'
									>
										<div id='number'>
											{Number(oneSpot?.avgRating).toFixed(1)}
										</div>
									</div>
								</div>
								<form
									className='form'
									onSubmit={onSubmit}
									hasSubmitted={hasSubmitted}
								>
									<div className='errorList'>
										<ul>
											{hasSubmitted &&
												validationErrors.length > 0 &&
												validationErrors.map((error, idx) => (
													<li key={idx}>{error}</li>
												))}
										</ul>
									</div>
									<div className='App'>
										<div className='checkIn'>
											<p id='checkIn'>CHECK-IN</p>
											<input
												id='checkInInput'
												type='date'
												value={startDate}
												min={currentDate}
												onChange={(e) => setStartDate(e.target.value)}
											/>
										</div>

										<div className='checkout'>
											<p id='checkout'>CHECKOUT</p>
											<input
												id='checkoutInput'
												type='date'
												value={endDate}
												onChange={(e) => setEndDate(e.target.value)}
											/>
										</div>

										{/* <DatePicker
                      value={native}
                      onValueChange={onNativeChange}
                    /> */}
									</div>
									<button
										className='reserve'
										type='submit'
									>
										Reserve
									</button>
								</form>
								<div className='booking-des'> You won't be charged yet </div>
								<div className='booking-fee-wrap'>
									{/* <div className="booking-individual-fee"> */}
									{/* <div> ${oneSpot.price} x {((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 23)).toFixed()} night </div> */}
									{/* <div> ${oneSpot.price * ((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 23)).toFixed()}  </div> */}
									{/* </div> */}
									<div className='booking-individual-fee'>
										<div id='div1'> Cleaning fee</div>
										<div id='div2'> $150 </div>
									</div>
									<div className='booking-individual-fee'>
										<div id='div1'>Service fee</div>
										<div id='div2'> $71 </div>
									</div>
									<div className='booking-individual-fee booking-fee-total'>
										{/* <div> Total before taxes </div> */}
										{/* <div> ${oneSpot.price * ((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 23)).toFixed() + 150 + 71} </div> */}
									</div>
								</div>
							</div>
						)}
						{/* </div> */}
						<div className='spotInfo'>
							<div className='spotDesc'>
								<p id='hostedBy'>Entire home hosted by owner</p>
								{/* <div id='address'>{oneSpot?.address}</div> */}
								<div id='cityState'>{`${oneSpot?.city}, ${oneSpot?.state}`}</div>
								<div id='country'>{oneSpot?.country}</div>
								<div id='description'>{`${oneSpot?.description}`}</div>
							</div>
							{/* <div id='price'>{`$${oneSpot?.price} night`}</div> */}

							<div className='check-in'>
								<div className='self-check-in'>
									{/* <i className="fa-solid fa-door-open"></i> */}
									<img
										className='check-in-img'
										src='https://imgur.com/Y8A5rKd.png'
										alt='spot'
									/>
									<div className='self-check-in-1'>
										<strong> Self check-in </strong>
										<div className='check-in-des'>
											Check yourself in with the lockbox.
										</div>
									</div>
								</div>

								<div
									className='self-check-in'
									id='super'
								>
									{/* <i class="fa-regular fa-id-badge"></i> */}
									<img
										className='check-in-img'
										src='https://imgur.com/5gPJvEp.png'
										alt='spot'
									/>
									<div className='superhost'>
										<strong> {oneSpot.firstName} Superhost </strong>
										<div className='check-in-des'>
											{" "}
											Superhosts are experienced, highly rated hosts who are
											committed to providing great stays for guests.
										</div>
									</div>
								</div>
							</div>
							<div className='amenitiesContainer'>
								<p className='ameneties'>What this place offers</p>
								<div className='individual-amenities-container'>
									<img
										className='individual-amenities-img'
										src='https://imgur.com/fHVWE9K.png'
										alt='spot'
									/>
									<div className='individual-amenities-title'>Wifi</div>
								</div>
								<div className='individual-amenities-container'>
									<img
										className='individual-amenities-img'
										src='https://imgur.com/csXC3RL.png'
										alt='spot'
									/>
									<div className='individual-amenities-title'>TV</div>
								</div>
								<div className='individual-amenities-container'>
									<img
										className='individual-amenities-img'
										src='https://imgur.com/cHR1Rxx.png'
										alt='spot'
									/>
									<div className='individual-amenities-title'>
										Air conditioning
									</div>
								</div>
							</div>


						</div>
					</div>
					<div></div>

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
						<div className='create-review'>
							<AddReviewModal />
						</div>
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
					{/* {oneSpot?.ownerId === user?.id && (
						<button
							className='deleteButton'
							onClick={() => spotDelete()}
						>
							Delete Spot
						</button>
					)} */}
					{/* </ul> */}
					{/* <ul> */}

					<div className='reviewAndMap'>
						<div className='reviewContainer'>
							<p className='review'>reviews</p>
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
					</div>
					{/* </ul> */}
				</div>
			</div>
		</>
	);
};

export default OneSpot;
