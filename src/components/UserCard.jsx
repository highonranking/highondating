import { useEffect, useState } from "react";
import { useSpring, animated, config } from "@react-spring/web";
import { useSwipeable } from "react-swipeable";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user, distance }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about, skills, address } = user;
  const dispatch = useDispatch();

  const cleanAddress = address ? address.split(",").slice(1).join(",").trim() : "Location not available";


  const [{ x, rotate, scale }, api] = useSpring(() => ({
    x: 0,
    rotate: 0,
    scale: 1,
    config: { tension: 250, friction: 20, clamp: false }, 
  }));

 
  const handleAction = async (status) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(_id));
      toast.success(status === "interested" ? "Request Sent!" : "User Ignored");
    } catch (err) {
      toast.error("Failed to perform action");
    }
  };

  const swipeHandlers = useSwipeable({
    onSwiping: ({ deltaX }) => {
      api.start({
        x: deltaX,
        rotate: deltaX / 15, 
        scale: 1.1,
      });
    },
    onSwipedLeft: () => {
      api.start({
        x: -window.innerWidth,
        rotate: -45,
        scale: 1,
      });
      setTimeout(() => {
        handleAction("ignored");
        api.start({ x: 0, rotate: 0, scale: 1 });
      }, 400); 
    },
    onSwipedRight: () => {
      api.start({
        x: window.innerWidth,
        rotate: 45,
        scale: 1,
      });
      setTimeout(() => {
        handleAction("interested");
        api.start({ x: 0, rotate: 0, scale: 1 });
      }, 400); 
    },
    delta: 50,
    preventScrollOnSwipe: true,
    trackTouch: true,
    trackMouse: true,
  });

  return (
    <>
      <animated.div
        {...swipeHandlers}
        style={{
          x,
          rotate,
          scale,
          touchAction: "pan-y",
        }}
        className="relative min-h-[550px] w-96 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-3xl shadow-2xl transform transition-transform duration-500 hover:scale-105"
      >
        <div className="absolute inset-0 rounded-3xl overflow-hidden opacity-30">
          <div className="absolute -top-10 -left-10 w-48 h-48 bg-white rounded-full blur-[60px]"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-yellow-300 rounded-full blur-[80px]"></div>
        </div>

        <figure className="relative rounded-t-3xl overflow-hidden shadow-lg">
          <img
            src={photoUrl}
            alt="profile pic"
            draggable="false"
            className="object-cover w-full h-64"
          />
        </figure>

        <div className="relative z-10 p-6 bg-white rounded-b-3xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-extrabold text-gray-800">
              {`${firstName} ${lastName}`}
            </h2>
            <span className="text-sm text-gray-500">{age} years old</span>
          </div>

          <div className="flex gap-2 mb-4">
            <span className="badge badge-primary py-1 px-2 bg-purple-200 text-purple-800 rounded-full">
              {gender}
            </span>
            <span className="badge badge-secondary py-1 px-2 bg-blue-200 text-blue-800 rounded-full">
              📍 {distance.toFixed(1)} km away
            </span>
          </div>

          <p className="text-gray-600 mb-4">{`${about.substring(0, 40)}...`}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {skills?.length > 0 ? (
              skills.map((skill) => (
                <span
                  key={skill}
                  className="badge py-1 px-2 bg-gradient-to-br from-pink-300 to-purple-300 text-white rounded-full shadow transform transition duration-200 hover:scale-105"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-gray-400">No skills found</p>
            )}
          </div>

          <p className="text-gray-500 mb-4">
            <strong>Lives in:</strong> {cleanAddress}
          </p>

          <div className="flex justify-between mt-6">
            <button
              className="btn w-20 h-10 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full shadow-lg transform transition duration-200 hover:scale-110"
              onClick={() => handleAction("ignored")}
            >
              ❌
            </button>
            <button
              className="btn w-20 h-10 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full shadow-lg transform transition duration-200 hover:scale-110"
              onClick={() => handleAction("interested")}
            >
              ✔️
            </button>
          </div>
        </div>
      </animated.div>
      <ToastContainer />
    </>
  );
};

export default UserCard;
