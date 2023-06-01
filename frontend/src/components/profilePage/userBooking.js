import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
// import { getUserSpotsThunk } from "../../store/spots";
// import { deleteSpotThunk } from "../../store/spots";
import { NavLink } from "react-router-dom";
// import UserReviews from "../UserReviews";
// import "./UserSpots.css";
import {
	thunkDeleteBooking,
	thunkUpdateBooking,
	thunkViewAllUserBookings,
} from "../../store/booking";

const UserPage = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	// const { spotId } = useParams();

	const [isLoaded, setIsLoaded] = useState(false);
  const currentDate = new Date();
	/* Subscribe to the store and listen to changes in the spots slice of state.
  newState is an object containing all spots, which can't be mapped over, it needs to be converted to an array */

	const sessionUser = useSelector((state) => state.session.user);
	console.log("sessionUser", sessionUser);

	const currentBookings = useSelector((state) => Object.values(state.bookings));
	console.log("currentBookings", currentBookings);

	// const currentUserBookings = currentBookings.filter(
	//   (booking) => booking.userId === sessionUser.id
	//   );
	// console.log('currentUserBookings', currentUserBookings)

	// console.log('/n', 'Current user spots (useSelector):', '/n', currentUserSpots)

	/* Passive data: dispatch within useEffect
  Active data, dispatch within onSubmit */

	useEffect(() => {
		// dispatch(getUserSpotsThunk()).then(() => setIsLoaded(true));
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

	/* Conditional used to debug if it's not rendering correctly */
	if (!Object.keys(currentBookings).length)
		return <h3>Currently, no bookings found.</h3>;

	return (
		isLoaded && (
			<div className='listings-container'>
				{currentBookings.map((booking) => (
					<div key={booking.id}>
						{/* <h2>{booking.name}</h2> */}
						<span>
							★ Id: {booking.id} · spot Id: {booking.spotId} User:{" "}
							{booking.userId} Start Date: {booking.startDate} · End date:{" "}
							{booking.endDate}
							{/* <button
												className='update-button'
												onClick={async (e) => {
													e.preventDefault();
													const updatedBooking = await dispatch(
														thunkUpdateBooking(booking.id)
													);
													if (updatedBooking) history.push(`/spots/${booking.spotId}`);
												}}
											>
												Update Booking
											</button> */}
              {(currentDate < booking.startDate) ? (
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
                </button>) : (<h4>Unable to delete</h4>)}
						</span>
						<div className='listings-item'>
							{/* <NavLink to={`/spots/${booking.id}`} /> */}
							<div>
								{/* <img
									className='listings-image'
									src={booking.previewImage}
									alt='No Preview'
								/> */}
								<div>
									<div className='left-div'>
										<div className='listing-update-delete'>
											{/* <NavLink
												className='edit-button'
												to={`/spots/${booking.id}/edit`}
											>
												Edit Spot
											</NavLink> */}
											{/* <button className='delete-button' onClick={() => dispatch(deleteSpotThunk(booking.id))}>Delete</button> */}
											<div></div>
											{/* <button
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
											</button> */}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		)
	);
};

export default UserPage;
