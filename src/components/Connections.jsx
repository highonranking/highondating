import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import ChatWindow from "./ChatWindow"; 
import ShimmerUserCard from "./ShimmerUserCard";


const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const [selectedConnection, setSelectedConnection] = useState(null); 
  const [unreadCounts, setUnreadCounts] = useState({});

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

  
  const fetchUnreadMessageCount = async (connectionId) => {
    console.log("Fetching unread count for user:", connectionId);
    try {
      const res = await axios.get(
        `${BASE_URL}/api/messages/unread-count?userId=${connectionId}`,
        { withCredentials: true }
      );
      console.log("Unread count response:", res.data.unreadCount); 
      setUnreadCounts((prevCounts) => ({
        ...prevCounts,
        [connectionId]: res.data.unreadCount,
      }));
    } catch (err) {
      console.error("Error fetching unread message count:", err);
    }
  };
  

  useEffect(() => {
    fetchConnections();
  }, []);

  useEffect(() => {
    if (connections?.length > 0) {
      connections.forEach((connection) => {
        fetchUnreadMessageCount(connection._id); 
      });
    }
  }, [connections]);

  if (!connections) return(
    <div className="flex justify-center items-center h-screen">
    <ShimmerUserCard/>
    </div>
  );

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
          const { _id, firstName, lastName, photoUrl, age, gender, about, skills } =
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
                  <div className="mt-1 mb-4">
                  {skills?.length > 0 ? (
                    skills.map((skill) => (
                      <span
                        key={skill}
                        className="badge badge-primary badge-sm mr-2"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500">No skills found</p>
                  )}
                </div>
                <button
                  className="btn btn-primary relative"
                  onClick={() => setSelectedConnection(connection)}
                >
                  Send Message

                  {unreadCounts[_id] > 0 && (
                    <span className="absolute top-0 right-0 text-white text-xs bg-red-500 rounded-full w-5 h-5 flex justify-center items-center">
                      {unreadCounts[_id]}
                    </span>
                  )}
                </button>

                </div>
              </div>
            </div>
          );
        })}
      </div>

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
