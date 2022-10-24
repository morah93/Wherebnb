import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormPage from '../SignupFormModal/index'
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <SignupFormPage />
        {/* <NavLink to='/signup'>
          <button className='signupButton'>SignUp</button>
        </NavLink> */}
      </>
    );
  }

  return (
    <div className='navigation'>
      <div className='home'>
        <NavLink
          exact
          to='/'
        >
          <img
            className='img'
            src='https://i.imgur.com/zE4UHjw.png'
          />
        </NavLink>
      </div>
      <div className='profile'>{isLoaded && sessionLinks}</div>
    </div>
  );
}

export default Navigation;
