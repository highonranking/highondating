import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";
import ShimmerUserCard from "./ShimmerUserCard";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    axios.defaults.withCredentials = true;

    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error("Error reviewing request:", err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests)
    return (
      <div className="flex justify-center items-center h-screen">
        <ShimmerUserCard />
      </div>
    );

  if (requests.length === 0)
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
          <span>No Requests Found!</span>
        </div>
      </div>
    );

  return (
    <div className="text-center my-10 mt-24">
      <h1 className="text-bold text-3xl mb-6">Connection Requests</h1>
      <div className="flex flex-wrap justify-center gap-6 mx-4">
        {requests.map((request) => {
          const {
            _id,
            firstName,
            lastName,
            photoUrl,
            age,
            gender,
            about,
            skills,
            address,
          } = request.fromUserId;

          return (
            <div
              key={_id}
              className="relative py-2 px-8 min-h-[550px] w-96 bg-gradient-to-br  rounded-3xl shadow-2xl transform transition-transform duration-500 hover:scale-105"
              >
              <div className="relative  rounded-lg overflow-hidden">
                <img
                  src={photoUrl}
                  alt={`${firstName} ${lastName}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <div className="mt-4 text-left">
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
                 
                </div>
                <p className="mt-2">
                  <span className="font-bold">About:</span> {about || "N/A"}
                </p>
                <p className="mt-2">
                  <span className="font-bold">Address:</span>{" "}
                  {address || "Not provided"}
                </p>
                <div className="mt-4">
                  <span className="font-bold">Skills:</span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {skills?.length > 0 ? (
                      skills.map((skill) => (
                        <span
                          key={skill}
                          className="badge badge-primary badge-smbg-gradient-to-br from-pink-300 to-purple-300 text-white  px-3 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-300">No skills selected</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-around">
                <button
                  className="btn btn-secondary bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                  onClick={() => reviewRequest("rejected", request._id)}
                >
                  Reject
                </button>
                <button
                  className="btn btn-primary bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                  onClick={() => reviewRequest("accepted", request._id)}
                >
                  Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
