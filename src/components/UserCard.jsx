import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { useSwipeable } from "react-swipeable";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();

  const handleAction = async (status) => {
    axios.defaults.withCredentials = true;

    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(_id));
      toast.success(
        status === "interested" ? "Request Sent!" : "User Ignored"
      );
    } catch (err) {
      toast.error("Failed to perform action");
    }
  };

  // Configure swipe gestures
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleAction("ignored"),
    onSwipedRight: () => handleAction("interested"),
    delta: 50, 
    preventScrollOnSwipe: true, 
    trackTouch: true, 
    trackMouse: true, 
  });

  return (
    <>
      <div
        className="card min-h-[600px] glass w-96"
        {...swipeHandlers}
      >
        <figure>
          <img src={photoUrl} alt="profile pic" />
        </figure>
        <div className="flex flex-row gap-12 my-2 justify-center">
          <div className="badge badge-info gap-2">{age}</div>
          <div className="badge badge-success gap-2">{gender}</div>
        </div>
        <div className="card-body">
          <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
          <p>{`${about.substring(0, 40)}...`}</p>
          <div className="card-actions justify-center flex gap-24 mt-12">
            <button
              className="btn btn-secondary"
              onClick={() => handleAction("ignored")}
            >
              ❌
            </button>
            <button
              className="btn btn-primary"
              onClick={() => handleAction("interested")}
            >
              ✔️
            </button>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </>
  );
};

export default UserCard;
