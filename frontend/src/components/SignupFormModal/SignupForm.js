import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupForm({ setShowModal }) {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);

	if (sessionUser) return <Redirect to='/' />;

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			setErrors([]);
			return dispatch(
				sessionActions.signup({
					firstName,
					lastName,
					email,
					username,
					password,
				})
			)
				.then(() => setShowModal(false))
				.catch(async (res) => {
					const data = await res.json();
					if (data && data.errors) setErrors(data.errors);
				});
		}
		return setErrors([
			"Confirm Password field must be the same as the Password field",
		]);
	};

	return (
		<form
			className='signupForm'
			onSubmit={handleSubmit}
		>
			<ul>
				{errors.map((error, idx) => (
					<li key={idx}>{error}</li>
				))}
			</ul>
      <h3 id='signuptext'>Sign Up</h3>
      <div id="welcome"> Welcome to Wherebnb</div>
      <div className="inputDiv">
			<input
				id='tetx'
        type='text'
        placeholder="First Name"
				value={firstName}
				onChange={(e) => setFirstName(e.target.value)}
				required
			/>

			<input
				id='tet'
        type='text'
        placeholder="Last Name"
				value={lastName}
				onChange={(e) => setLastName(e.target.value)}
				required
			/>

			<input
				id='tet'
        type='text'
        placeholder="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				required
			/>

			<input
				id='tet'
        type='text'
        placeholder="Username"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				required
			/>

			<input
				id='tet'
        type='password'
        placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
			/>

			<input
				id='xtet'
        type='password'
        placeholder="Confirm Password"
				value={confirmPassword}
				onChange={(e) => setConfirmPassword(e.target.value)}
				required
			/>
          </div>

			<button
				id='submitButton1'
				type='submit'
			>
				Submit
			</button>
		</form>
	);
}

export default SignupForm;
