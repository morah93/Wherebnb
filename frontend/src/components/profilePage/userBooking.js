import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getAllSpots, getUsersSpots, deleteSpot } from "../../store/spots";
import { NavLink } from "react-router-dom";
import { getUserReviews, deleteReview } from "../../store/reviews";
import './userSpots.css'
import {
	thunkDeleteBooking,
	thunkViewAllUserBookings,
} from "../../store/booking";

const UserPage = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	// const { spotId } = useParams();

	const [isLoaded, setIsLoaded] = useState(false);
	// const currentDate = new Date();
	let currentDate = new Date().toISOString().slice(0, 10);
	// console.log("currentDAte", currentDate);
	/* Subscribe to the store and listen to changes in the spots slice of state.
  newState is an object containing all spots, which can't be mapped over, it needs to be converted to an array */

	const user = useSelector((state) => state.session.user);
	console.log("user", user);

	const spots = useSelector((state) => Object.values(state.spot));
	const userSpots = spots.filter(spot => spot.ownerId === user.id)
	// Object.values(state.spot)
	console.log("userSpots", spots);

	const userReviews = useSelector((state) =>
		Object.values(state.reviews.userReviews)
	);
	// const userReviews = reviews.filter(review => review.ownerId === user.id)
	console.log("userReviews", userReviews);

	const currentBookings = useSelector((state) => Object.values(state.bookings));
	console.log("userBookings", currentBookings);

	// const currentUserBookings = currentBookings.filter(
	//   (booking) => booking.userId === user.id
	//   );
	// console.log('currentUserBookings', currentUserBookings)

	// console.log('/n', 'Current user spots (useSelector):', '/n', currentUserSpots)

	/* Passive data: dispatch within useEffect
  Active data, dispatch within onSubmit */

	useEffect(() => {
		dispatch(getAllSpots()).then(() => setIsLoaded(true));

	}, [dispatch]);
	useEffect(() => {
		dispatch(getUserReviews()).then(() => setIsLoaded(true));
	}, [dispatch]);
	useEffect(() => {
		dispatch(thunkViewAllUserBookings()).then(() => setIsLoaded(true));
	}, [dispatch]);



	// const onSubmit = async (e) => {
	// 	e.preventDefault();
	// 	const payload = {
	// 		startDate,
	// 		endDate,
	// 	};
	// 	console.log(validationErrors);

	// 	if (!validationErrors.length) {
	// 		// const data = await
	// 		return dispatch(thunkCreateBooking(payload, spotId))
	// 			.then(() => {
	// 				// history.push("/");
	// 				alert("Booking Successful");
	// 			})
	// 			.catch(async (res) => {
	// 				const data = await res.json();
	// 				if (data && data.errors) setErrors(data.errors);
	// 				console.log(errors);
	// 			});
	// 		history.push(`/spots/${spotId}`);
	// 	}
	// };

	// const userReviews = useSelector((state) => state.spot.spot.review);
	// if (!allUserSpotsArr.length) return null;

	// const reviewDelete = () => {
	// 	dispatch(deleteReview(review.id));
	// 	alert("Deletion Successful");
	// 	history.push(`/user`);
	// };

	/* Conditional used to debug if it's not rendering correctly */

	// if (!Object.keys(userSpots).length)
	// 	return <h3>Currently, no spots found.</h3>;

	// if (!Object.keys(userReviews).length)
	// 	return <h3>Currently, no reviews found.</h3>;

	// if (!Object.keys(currentBookings).length)
	// 	return <h3>Currently, no bookings found.</h3>;

	return (
		<>
			<h1>Welcome {user.firstName} {user.lastName}</h1>
			{isLoaded && (
				<div className='listings-container'>
					{/*-------------------------USER SPOTS---------------------*/}
					<h2>USER LISTINGS</h2>
					{user && (
						<div className='userSpotPageContainer'>
							<ul>
								{userSpots?.map((spot) => (
									<div className='userSpotPage'>
										<NavLink to={`/spots/${spot.id}`}>
											<img
												className='spotImg'
												src={spot.previewImage}
											/>
										</NavLink>
										<div>{spot.name}</div>
										<div>{spot.address}</div>
										<div>{spot.city}</div>
										<div>{spot.state}</div>
										<div>{spot.description}</div>
										<div>{spot.avgRating}</div>
										<div>{spot.price}</div>
										<div>
										<button
											className='delete-button'
											onClick={async (e) => {
												e.preventDefault();
												const spotDeleted = await dispatch(deleteSpot(spot.id));
												if (spotDeleted) history.push("/user");
											}}
										>
											Delete
										</button>
										</div>
									</div>
								))}
							</ul>

							{/*-------------------------USER REVIEWS---------------------*/}
							<h2>USER REVIEWS</h2>
							<div className='userReview'>
								{userReviews?.map((review) => (
									<div key={review.id}>
										<div>{review.Spot.name}</div>
										<div>{review.review}</div>
										<div>{review.stars}</div>
										<button
											className='delete-button'
											onClick={async (e) => {
												e.preventDefault();
												const reviewDeleted = await dispatch(
													deleteReview(review.id)
												);
												if (reviewDeleted) history.push("/user");
											}}
										>
											Delete
										</button>
									</div>
								))}
							</div>
						</div>
					)}

					{/*-------------------------USER BOOKINGS---------------------*/}
					<h2>USER BOOKINGS</h2>
					{currentBookings?.map((booking) => (
						<div key={booking.id}>
							{/* <h2>{booking.name}</h2> */}
							<span>
								★ Id: {booking.id} · spot Id: {booking.spotId} User:{" "}
								{booking.userId} Start Date: {booking.startDate} · End date:{" "}
								{booking.endDate}
								{currentDate < booking.startDate ? (
									<button
										className='delete-button'
										onClick={async (e) => {
											e.preventDefault();
											const bookingDeleted = await dispatch(
												thunkDeleteBooking(booking.id)
											);
											if (bookingDeleted) history.push("/user");
										}}
									>
										Delete
									</button>
								) : (
									<h4>Unable to delete</h4>
								)}
							</span>
							{/* <div className='listings-item'>
							<NavLink to={`/spots/${booking.id}`} />
							<div>
							<img
							className='listings-image'
							src={booking.previewImage}
							alt='No Preview'
							/>
							<div>
							<div className='left-div'>
							<div className='listing-update-delete'>
							<NavLink
							className='edit-button'
							to={`/spots/${booking.id}/edit`}
							>
							Edit Spot
							</NavLink>
							<button className='delete-button' onClick={() => dispatch(deleteSpotThunk(booking.id))}>Delete</button>
							<div></div>
							<button
							className='delete-button'
							onClick={async (e) => {
								e.preventDefault();
								const spotDeleted = await dispatch(
									deleteSpotThunk(booking.id)
									);
									if (spotDeleted) history.push("/");
								}}
								>
								Delete
								</button>
								</div>
								</div>
								</div>
								</div>
							</div> */}
						</div>
					))}
				</div>
			)
			}
		</>
	);
};

export default UserPage;
