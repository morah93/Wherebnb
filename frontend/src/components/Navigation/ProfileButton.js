import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./Navigation.css";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function ProfileButton({ user, setLogin, setShowModal, setCreateSpotModal }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
    alert('Log Out Successful')
  };

  return (
    <>
      <div className='menuDiv'>
        {user && (
          <button
            className='createSpot'
            onClick={() => {
              setCreateSpotModal(true);
            }}
          >
            Airbnb your home
          </button>
        )}
        <i
          className='fa fa-globe'
          id='globe'
        />
        <div className="buttonDiv">
        <button
          className='menu'
          onClick={openMenu}
        >
          <i
            className='fa-solid fa-bars'
            id='hamburglar'
          ></i>
          <i
            className='fa fa-user circle'
            id='user'
          ></i>
        </button>
        </div>


      {showMenu &&
        (user ? (
          <div className='profile-dropdown'>
            <div className="dropdownUserInfo">
          <div id="username">{user.username}</div>
            <div id="email">{user.email}</div>
            </div>
          <NavLink exact to='/user' className='profileLink'>
              {/* Profile */}
              <div className='profileLink1'>
            <i
            className='fa fa-user circle'
            id='user1'
              ></i>

              My account
              </div>
          </NavLink>
            <div className='buttonDiv'>
              {/* <button
                className='createButton'
                onClick={() => {
                  setCreateSpotModal(true);
                }}
              >
                Become a Host
              </button> */}
              {/* <button onClick={() => {
              history.push(`/spots/current`)
             }}>User's Spot's</button> */}
              {/* </div> */}
              {/* <div> */}
              <button
                className='logout'
              onClick={ logout }
              >
                Log Out
              </button>
            </div>
          </div>
        ) : (
          <div className='logAndsignIn'>
            <div className="dropDown">
              <button
                id='login1'
                onClick={() => {
                  setLogin(true);
                  setShowModal(true);

                }}
              >
                Log In
              </button>

              <button
                id='login'
                onClick={() => {
                  setLogin(false);
                  setShowModal(true);
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
          ))}
        </div>
    </>
  );
}

export default ProfileButton;
