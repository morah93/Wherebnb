import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import "./LoginForm.css";

function LoginForm({ setShowModal }) {
	const history = useHistory;
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const [credential, setCredential] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState([]);

	if (sessionUser) return <Redirect to='/' />;

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors([]);
		return dispatch(sessionActions.login({ credential, password }))
			.then(() => {
				setShowModal(false);
				history.push("/");
				alert("Log In Successful");
			})
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) setErrors(data.errors);
			});
	};

	return (
		<div className='loginFormContainer'>
			<form
				onSubmit={handleSubmit}
				className='loginForm'
			>
				<div className='headingDiv'>
					<h3 className='heading'>Log in or sign up</h3>
				</div>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<div className='labelDiv'>
					<label className='emailInput'>
						Username or Email
						<input
							id='input'
							type='text'
							value={credential}
							onChange={(e) => setCredential(e.target.value)}
							required
						/>
					</label>
					<label className='passwordInput'>
						Password
						<input
							id='input'
							type='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</label>
				</div>
				<div className='loginDemoButtons'>
					<button
						className='login'
						type='submit'
					>
						Log In
					</button>
					<button
						className='demoButton'
						onClick={() => {
							setCredential("Demo-lition");
							setPassword("password");
							alert("Log In Successful");
							history.push('/');
						}}
					>
						Demo User
					</button>
				</div>
			</form>
		</div>
	);
}

export default LoginForm;
