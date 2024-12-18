import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import UserEditCard from "./UserEditCard";
import { totalskills } from "../utils/constants";


const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [skills, setSkills] = useState(user?.skills || []);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [location, setLocation] = useState(user?.location || { latitude: "", longitude: "" });
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [address, setAddress] = useState(user?.address);
  const [toastMessage, setToastMessage] = useState("");


  const saveProfile = async () => {
    axios.defaults.withCredentials = true;

    setError("");

    if (skills.length < 3 || skills.length > 5) {
        setError("Please select at least 3 skills and at most 5 skills.");
        setShowError(true); 
        setTimeout(() => {
            setShowError(false);
        }, 3000);
        return;
    }

    const lat = parseFloat(location.latitude || user?.location?.coordinates[0]);
    const lon = parseFloat(location.longitude || user?.location?.coordinates[1]);

    if (isNaN(lat) || isNaN(lon)) {
        setError("Latitude and Longitude must be valid numbers.");
        setShowError(true); 
        setTimeout(() => {
            setShowError(false);
        }, 3000);
        return;
    }

    if (lat === "" || lon === "") {
        setError("Please provide a valid location.");
        setShowError(true); 
        setTimeout(() => {
            setShowError(false);
        }, 3000);
        return;
    }

    try {
        setIsLoading(true);
        const res = await axios.patch(
            BASE_URL + "/profile/edit",
            {
                firstName,
                lastName,
                photoUrl,
                age,
                gender,
                about,
                skills,
                location: { type: "Point", coordinates: [lon, lat] },
            },
            { withCredentials: true }
        );

        const updatedUser = res?.data?.data;
        dispatch(
            addUser({
                ...updatedUser,
                address,
            })
        );

        setShowToast(true); 
        setToastMessage("Profile Saved!")
        setTimeout(() => {
            setShowToast(false);
            setToastMessage("");
        }, 3000);

        setIsLoading(false);
    } catch (err) {
        setError(err.response?.data?.message || "An error occurred. Please try again.");
        setShowError(true); 
        setTimeout(() => {
            setShowError(false);
        }, 3000);

        setIsLoading(false);
    }
};


const fetchCurrentLocation = async () => {
  if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
  }
  setIsFetchingLocation(true);
  setError("");

  navigator.geolocation.getCurrentPosition(
      async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setLocation({
              latitude: lat,
              longitude: lon,
          });

          try {
              const response = await axios.get(BASE_URL + `/api/maps/getAddress`, {
                  params: { lat, lon },
              });
              const fetchedAddress = response.data?.address;

              setAddress(fetchedAddress);

              dispatch(
                  addUser({
                      ...user, 
                      location: { type: "Point", coordinates: [lon, lat] },
                      address: fetchedAddress,
                  })
              );

              setShowToast(true); 
              setToastMessage("Location Fetched!")
              
              setTimeout(() => {
                  setShowToast(false);
                  setToastMessage("");
              }, 3000);
          } catch (err) {
              console.error("Error fetching address:", err);
              setError(err.response?.data?.error || "Failed to fetch address. Please try again.");
              setShowError(true); 
              setTimeout(() => {
                  setShowError(false);
              }, 3000);
          } finally {
              setIsFetchingLocation(false);
          }
      },
      (err) => {
          console.error("Error fetching location:", err);
          setError("Unable to fetch location. Please enter manually.");
          setShowError(true);
          setTimeout(() => {
              setShowError(false);
          }, 3000);
          setIsFetchingLocation(false);
      }
  );
};

  const toggleSkill = (skill) => {
    setSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };


 
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center items-start gap-8 my-10 px-4 sm:px-6 md:px-8">
        <div className="flex-1 max-w-md w-full">
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

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">About:</span>
                  </div>
                  <input
                    type="text"
                    value={about}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </label>

                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Gender:</span>
                  </div>
                  <select
                    value={gender}
                    className={`select select-primary w-full`}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option>
                      Gender
                    </option>
                    <option>male</option>
                    <option>female</option>
                    <option>other</option>
                  </select>
                </label>


                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Skills:</span>
                  </div>
                  <button
                    className="btn btn-primary w-full"
                    onClick={() => setShowModal(true)}
                  >
                    Select Skills
                  </button>
                  <div className="mt-2">
                    {skills.length > 0 ? (
                      skills.map((skill) => (
                        <span
                          key={skill}
                          className="badge badge-primary badge-sm mr-2"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500">No skills selected.</p>
                    )}
                  </div>
                </label>

                <div className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Location:</span>
                  </div>
                  <button
                    className={`btn btn-primary ${isFetchingLocation ? "loading" : ""}`}
                    onClick={fetchCurrentLocation}
                    disabled={isFetchingLocation}
                  >
                    {isFetchingLocation ? "Fetching Location..." : "Use Current Location"}
                  </button>
                </div>

                {address || location.latitude && location.longitude && (
                  <p className="text-success mt-2">
                    Location captured: {address || location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                  </p>
                )}
            
                <div className="card-actions justify-center mt-4">
                  <button className="btn btn-primary"
                  disabled={isloading}
                  onClick={saveProfile}>
                    Save Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
         
        </div>
        <div className="">
          <UserEditCard
            user={{ firstName, lastName, photoUrl, age, gender, about, skills, location, address }}
          />
          </div>
      </div>
    

      {showToast && (
        <div className="toast fixed z-10 toast-top toast-center">
          <div className="alert alert-success">
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
      
      {showError && (
        <div className="toast fixed z-10 toast-top toast-center">
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        </div>
      )}


      {showModal && (
  <div className="modal modal-open">
    <div className="modal-box">
      <h3 className="font-bold text-lg">Select Your Skills</h3>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {totalskills?.map((skill) => (
          <label
            key={skill}
            className="cursor-pointer flex items-center space-x-2"
          >
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              checked={skills.includes(skill)}
              onChange={() => toggleSkill(skill)}
            />
            <span className="label-text">{skill}</span>
          </label>
        ))}
      </div>
      <div className="modal-action">
        <button
          className="btn btn-secondary"
          onClick={() => setShowModal(false)}
          disabled={skills.length < 3 || skills.length > 5}
        >
          Done
        </button>
      </div>
      {skills.length < 3 && (
        <p className="text-red-500 text-sm mt-2">
          Please select at least 3 skills.
        </p>
      )}
      {skills.length > 5 && (
        <p className="text-red-500 text-sm mt-2">
          Please select at most 5 skills.
        </p>
      )}
    </div>
  </div>
)}

    </>
  );
};

export default EditProfile;
