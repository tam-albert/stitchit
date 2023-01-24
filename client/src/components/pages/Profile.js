import React, { useState, useEffect } from "react";

import "../../utilities.css";
import "./Profile.css";

const Profile = () => {
  useEffect(() => {
    document.title = "Profile Page";
  }, []);

  return (
    <>
      <div className="Profile-avatarContainer">
        <div className="Profile-avatar" />
      </div>
      <h1 className="Profile-name u-textCenter">Connie Jiang</h1>
      <hr className="Profile-line" />
      <div className="u-flex">
        <div className="Profile-subContainer u-textCenter">
          <h4 className="Profile-subTitle">About Me</h4>
          <div id="profile-description">hoe</div>
        </div>
      </div>
    </>
  );
};


export default Profile;
