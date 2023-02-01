import React, { useEffect, useState } from "react";
import { get } from "../../utilities";
import SingleActivity from "../modules/SingleActivity";
import HelpTooltip from "../modules/HelpTooltip";

const Feed = (props) => {
  const [activities, setActivities] = useState([]);
  const [singleActivities, setSingleActivities] = useState([]);
  const [allEntriesShown, setAllEntriesShown] = useState(false);

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
      <div className="flex flex-row-reverse px-8 mb-8">
        <HelpTooltip content="Here's your feed, so you can see what your friends are up to at a glance and jump to journals quickly!" />
      </div>
      <div className="flex flex-col space-y-4">
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
    </div>
  );
};

export default Feed;
