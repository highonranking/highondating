import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import UserEditCard from "./UserEditCard";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    axios.defaults.withCredentials = true;

    //Clear Errors
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
    <div className="flex justify-center my-10 mt-24 px-4 sm:px-6 md:px-8">
      <div className="flex justify-center w-full max-w-md">
        <div className="card bg-base-300 w-full shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-center">Edit Profile</h2>
            
            <div className="space-y-4">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">First Name:</span>
                </div>
                <input
                  type="text"
                  value={firstName}
                  className="input input-bordered w-full"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
  
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Last Name:</span>
                </div>
                <input
                  type="text"
                  value={lastName}
                  className="input input-bordered w-full"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
  
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Photo URL:</span>
                </div>
                <input
                  type="text"
                  value={photoUrl}
                  className="input input-bordered w-full"
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </label>
  
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Age:</span>
                </div>
                <input
                  type="text"
                  value={age}
                  className="input input-bordered w-full"
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>
  
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Gender:</span>
                </div>
                <select
                  className="select select-primary w-full"
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option disabled selected>
                    Gender
                  </option>
                  <option>male</option>
                  <option>female</option>
                  <option>other</option>
                </select>
              </label>
  
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">About:</span>
                </div>
                <input
                  type="text"
                  value={about}
                  className="input input-bordered w-full"
                  onChange={(e) => setAbout(e.target.value)}
                />
              </label>
            </div>
  
            <p className="text-red-500 text-center">{error}</p>
  
            <div className="card-actions justify-center mt-4">
              <button className="btn btn-primary w-full sm:w-auto" onClick={saveProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <UserEditCard
      user={{ firstName, lastName, photoUrl, age, gender, about }}
    />
  
    {showToast && (
      <div className="toast toast-top toast-center">
        <div className="alert alert-success">
          <span>Profile saved successfully.</span>
        </div>
      </div>
    )}
  </>
  
  );
};
export default EditProfile;