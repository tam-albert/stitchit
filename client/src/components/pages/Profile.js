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
  const [singleActivities, setSingleActivities] = useState([]);
  const [allEntriesShown, setAllEntriesShown] = useState(false);

  useEffect(() => {
    document.title = "Profile Page";
    get("/api/user", { userid: props.profileId }).then((user) => {
      setName(user.name);
      setPfpUrl(user.pfp);
    });

    get("/api/profileFeed", { userId: props.profileId }).then((activityObjs) => {
      setActivities(activityObjs.reverse());
    });
  }, [props.profileId]);

  useEffect(() => {
    setSingleActivities(
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
    );
  }, [activities]);

  useEffect;

  return (
    <>
      <ProfileNameCard
        name={name}
        pfpUrl={pfpUrl}
        profileId={props.profileId}
        userId={props.userId}
      />
      <div className="flex flex-col mt-4 p-12 space-y-4">
        {singleActivities.length ? (
          (singleActivities.length > 8) & !allEntriesShown ? (
            <>
              {singleActivities.slice(0, 8)}
              <button
                className="w-full text-gray-700 italic underline"
                onClick={() => setAllEntriesShown(true)}
              >{`+${singleActivities.length - 8} more...`}</button>
            </>
          ) : (
            singleActivities
          )
        ) : (
          <span className="italic text-lg text-center">Nothing in your feed yet!</span>
        )}
      </div>
    </>
  );
};

export default Profile;
