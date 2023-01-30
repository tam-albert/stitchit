import React, { useEffect, useState } from "react";
import { get } from "../../utilities";
import SingleActivity from "../modules/SingleActivity";

const Feed = () => {
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    get("/api/feed").then((activityObjs) => {
      setActivities(activityObjs);
    });
  });

  return (
    <div className="p-12">
      <div className="flex flex-col-reverse space-y-4 space-y-reverse">
        {activities.length ? (
          activities.map((activity) => (
            <SingleActivity
              key={`activity-${activity._id}`}
              name={activity.creator_name}
              content={activity.content}
              timestamp={activity.timestamp}
              link={activity.link}
            />
          ))
        ) : (
          <span className="italic text-lg text-center">Nothing in your feed yet!</span>
        )}
      </div>
    </div>
  );
};

export default Feed;
