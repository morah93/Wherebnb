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
				console.log(res, 'res')
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
					<h3 className='heading'>Log in</h3>
				</div>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<div className='inputDiv'>
					<input
						id='text'
						type='text'
						placeholder="email"
						value={credential}
						onChange={(e) => setCredential(e.target.value)}
						required
					/>

						<input
							id='text1'
						type='password'
						placeholder="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>

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
							history.push("/");
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
