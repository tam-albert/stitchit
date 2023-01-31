import React, { useEffect, useState } from "react";
import { get } from "../../utilities";
import SingleActivity from "../modules/SingleActivity";

const Feed = (props) => {
  const [activities, setActivities] = useState([]);
  const [singleActivities, setSingleActivities] = useState([]);

  useEffect(() => {
    get("/api/feed").then((activityObjs) => {
      setActivities(activityObjs.reverse());
    });
  }, []);

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

  return (
    <div className="p-12">
      <div className="flex flex-col space-y-4">
        {singleActivities.length ? (
          singleActivities.length > 9 ? (
            <>
              {singleActivities.slice(0, 9)}
              <div className="w-full text-center text-gray-700 italic">{`+${
                singleActivities.length - 9
              } more...`}</div>
            </>
          ) : (
            singleActivities
          )
        ) : (
          <span className="italic text-lg text-center">Nothing in your feed yet!</span>
        )}
      </div>
    </div>
  );
};

export default Feed;
