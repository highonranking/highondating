import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect, useState } from "react";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    axios.defaults.withCredentials = true;

    try {
      const res = axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {}
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequests(res.data.data));
    } catch (err) {}
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return (
        <div className="h-screen p-4 m-4 mt-24">
        <div role="alert" className="alert w-1/2 flex justify-center items-center mx-auto alert-warning">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <span>No Requests Found!</span>
    </div>
    </div>);

    

  return (
    <div className="text-center my-10 mt-24">
      <h1 className="text-bold text-3xl">Connection Requests</h1>
    <div className="flex flex-wrap m-4 gap-4">
      {requests.map((request) => {

        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;

        return (
          <div
            key={_id}
            className=" flex justify-between items-center m-4 p-4  mx-auto"
          >
             <div className="card bg-base-100 shadow-xl p-8 w-96 ">
                <figure>
                    <img
                    src={photoUrl}
                    alt="Profile" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">
                    {firstName + " " + lastName}
                    <div className="badge badge-secondary"> {gender} </div>
                    <div className="badge badge-primary"> {age} </div>
                    </h2>
                    <p>{about}</p>
                </div>
                <div>
              <button
                className="btn btn-secondary mx-2"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-primary mx-2"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
            </div>
            </div>
          </div>
        );
      })}
      </div>
    </div>
  );
};
export default Requests;