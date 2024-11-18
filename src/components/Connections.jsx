import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice"

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      // Handle Error Case
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) return (
    <div className="h-screen p-4 m-4">
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
  <span>No Connections Found!</span>
</div>
</div>
  );

  return (
    <div className="text-center my-10 h-screen">
      <h1 className="text-bold text-3xl">Connections</h1>
    <div className="flex flex-wrap gap-4 m-4 p-4">
      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          connection;
     
            
        return (
          <div
            key={_id}
            className="mx-auto"
          >
            <div className="card bg-base-100 w-96 shadow-xl">
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
            </div>
          </div>
        );
      })}
      </div>
    </div>
  );
};
export default Connections;