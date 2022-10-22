import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
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
        <NavLink to='/signup'>Sign Up</NavLink>
      </>
    );
  }

  return (
        <div className='navigation'>
    <ul>
        <li className="home">
          <NavLink
            exact
            to='/'
          >
            Home
          </NavLink>
      </li>
      <li className="profile">
          {isLoaded && sessionLinks}
      </li>
      </ul>
    </div>
  );
}

export default Navigation;
