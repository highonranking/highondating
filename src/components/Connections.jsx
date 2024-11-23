import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import ChatWindow from "./ChatWindow"; // Import ChatWindow component


const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const [selectedConnection, setSelectedConnection] = useState(null); // To manage selected chat

  const fetchConnections = async () => {
    axios.defaults.withCredentials = true;

    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error("Error fetching connections:", err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0)
    return (
      <div className="h-screen p-4 m-4 mt-24">
        <div
          role="alert"
          className="alert w-1/2 flex justify-center items-center mx-auto alert-warning"
        >
          <span>No Connections Found!</span>
        </div>
      </div>
    );

  return (
    <div className="text-center my-10  mt-24">
      <h1 className="text-bold text-3xl">Connections</h1>
      <div className="flex flex-wrap gap-4 m-4 p-4">
        {connections.map((connection) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            connection;

          return (
            <div key={_id} className="mx-auto">
              <div className="card bg-base-100 w-96 shadow-xl">
                <figure>
                  <img src={photoUrl} alt="Profile" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">
                    {firstName + " " + lastName}
                    <div className="badge badge-secondary"> {gender} </div>
                    <div className="badge badge-primary"> {age} </div>
                  </h2>
                  <p>{about}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => setSelectedConnection(connection)}
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Render Chat Window */}
      {selectedConnection && (
        <ChatWindow
          connection={selectedConnection}
          onClose={() => setSelectedConnection(null)}
        />
      )}
    </div>
  );
};

export default Connections;
