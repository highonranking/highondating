import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";
import ShimmerUserCard from "./ShimmerUserCard";
import calculateDistance from "../utils/distance";
const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const loggedInUser = useSelector((store) => store.user);

  const getFeed = async () => {
    axios.defaults.withCredentials = true;

    // if (feed) return;
    console.log(feed);
    try {
     const res = await axios.get(BASE_URL + "/feed", {
      params: { latitude: loggedInUser?.location?.latitude, longitude: loggedInUser?.location?.longitude },
      withCredentials: true,
    });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.error("Failed to fetch feed", err); 
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return (
    <div className="flex justify-center items-center h-screen">
    <ShimmerUserCard/>
    </div>
  );

  if (feed.length <= 0)
    return (
      <div className="h-screen p-4 m-4 mt-24">
        <div
          role="alert"
          className="alert w-1/2 flex justify-center items-center mx-auto alert-warning"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>No more Users</span>
        </div>
      </div>
    );

    const distance = calculateDistance(
      loggedInUser.location?.coordinates[0],  
      loggedInUser.location?.coordinates[1],  
      feed[0].location?.coordinates[0],  
      feed[0].location?.coordinates[1]   
    );
    
    console.log( feed[0].location?.coordinates[0]);  

  return (
    feed && (
      <div className="flex justify-center my-10 mt-24">
        <UserCard user={feed[0]} distance={distance} />
      </div>
    )
  );
};

export default Feed;
