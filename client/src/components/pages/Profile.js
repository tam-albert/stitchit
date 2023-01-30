import React, { useState, useEffect } from "react";
import ProfileNameCard from "../modules/ProfileNameCard.js";
import SingleActivity from "../modules/SingleActivity.js";

import { get } from "../../utilities.js";

import "../../utilities.css";
import "./Profile.css";

const Profile = (props) => {
  const [name, setName] = useState("");
  const [pfpUrl, setPfpUrl] = useState("");
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    document.title = "Profile Page";
    get("/api/user", { userid: props.profileId }).then((user) => {
      setName(user.name);
      setPfpUrl(user.pfp);
    });

    get("/api/profileFeed", { userId: props.profileId }).then((activityObjs) => {
      setActivities(activityObjs);
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
      <div className="flex flex-col-reverse space-y-4 space-y-reverse p-12">
        {activities.length ? (
          activities.map((activity) => (
            <SingleActivity
              key={`activity-${activity._id}`}
              selfId={props.userId}
              activityId={activity.creator_id}
              name={activity.creator_name}
              content={activity.content}
              timestamp={activity.timestamp}
              link={activity.link}
            />
          ))
        ) : (
          <span className="italic text-lg text-center">Nothing to see here!</span>
        )}
      </div>
    </>
  );
};

export default Profile;
