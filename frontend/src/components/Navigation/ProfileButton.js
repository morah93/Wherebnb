import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";

function ProfileButton({ user }) {
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
  };

  return (
    <>
      <button
        className='menu'
        onClick={openMenu}
      >
        <i class='fa-duotone fa-user'></i>
      </button>
      {showMenu && (
        <div className='profile-dropdown'>
          <div>{user.username}</div>
          <div>{user.email}</div>
          <div className='buttonDiv'>
            <button
              className='createButton'
              onClick={() => {
                history.push("/spots");
              }}
            >
              Create Spot
            </button>
            {/* <button onClick={() => {
              history.push(`/spots/current`)
          }}>User's Spot's</button> */}
            {/* </div> */}
            {/* <div> */}
            <button
              className='logout'
              onClick={logout}
            >
              Log Out
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileButton;
