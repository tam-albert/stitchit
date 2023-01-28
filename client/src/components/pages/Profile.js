import React, { useState, useEffect } from "react";
import ProfileNameCard from "../modules/ProfileNameCard.js";

import { get } from "../../utilities.js";

import "../../utilities.css";
import "./Profile.css";

const Profile = (props) => {
  const [name, setName] = useState("");
  const [pfpUrl, setPfpUrl] = useState("");

  useEffect(() => {
    document.title = "Profile Page";
    get("/api/user", { userid: props.profileId }).then((user) => {
      setName(user.name);
      setPfpUrl(user.pfp);
    });
  }, [props.profileId]);

  return (
    <>
      <ProfileNameCard
        name={name}
        pfpUrl={pfpUrl}
        profileId={props.profileId}
        userId={props.userId}
      />
      <div className="Profile-avatarContainer">
        <div className="Profile-avatar" />
      </div>
      <h1 className="Profile-name u-textCenter">{name}</h1>
      <hr className="Profile-line" />
      <div className="u-flex">
        <div className="Profile-subContainer u-textCenter">
          <h4 className="Profile-subTitle">About Me</h4>
          <div id="profile-description">insert bio</div>
        </div>
      </div>
    </>
  );
};

export default Profile;
