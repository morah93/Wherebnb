import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormModal";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from "./components/AllSpots/allSpots";
import OneSpot from "./components/oneSpot/oneSpot";
import OneSpot1 from "./components/oneSpot/oneSpot1";
import EditSpot from "./components/editSpot/editSpot";
import AddSpot from "./components/addSpot/addSpot";
import AddReview from "./components/addReview/addReview";
import Footer from "./components/footer/footer";
import UserPage from "./components/profilePage/userBooking";


function App() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
	}, [dispatch]);

	return (
		<>
			<div className='app'>
				<Navigation isLoaded={isLoaded} />
				{isLoaded && (
					<Switch>
						<Route
							exact
							path='/'
						>
							<AllSpots />
						</Route>
						<Route
							path='/user'
						>
              <UserPage />
              {/* <AllSpots /> */}
						</Route>
						<Route
							exact
							path='/spots'
						>
							<AddSpot />
						</Route>
						<Route path='/spots/:spotId/edit'>
							<EditSpot />
						</Route>
						<Route
							exact
							path='/spots/:spotId/reviews'
						>
							<AddReview />
						</Route>
						<Route path='/spots/:spotId'>
							<OneSpot />
						</Route>
						{/* <Route path='/spots/:spotId'>
							<OneSpot1 />
						</Route> */}
						<Route path='/signup'>
							<SignupFormPage />
						</Route>
					</Switch>
				)}
				<Footer />
			</div>
		</>
	);
}

export default App;
