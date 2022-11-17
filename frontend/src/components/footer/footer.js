import React from "react";
import './footer.css'

const Footer = () => {

  return (
    <>
      <div className="footer">
        <div className="info">
        © 2022 WhereBnb
          Privacy
          Terms
          Sitemap
          Destination
        </div>
        {/* <div className="Privacy">

        </div>
        <div className="Terms">

        </div>
        <div className="SiteMap">

        </div>
        <div className="destination">

        </div> */}
      <div className="siteInfo">
        <i className="fa fa-globe"></i>
          English (US)
          <i className="fa fa-dollar" ></i>
          USD
          <i className="fa fa-facebook"></i>
          <i className="fa fa-twitter"></i>
          <i className="fa fa-instagram"></i>
      </div>
      </div>
    </>
  )
}

export default Footer
