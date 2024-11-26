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
  const [skills, setSkills] = useState(user?.skills);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const saveProfile = async () => {
    axios.defaults.withCredentials = true;

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
          skills,
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
        {/* Profile Form */}
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

                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Gender:</span>
                  </div>
                  <select
                    className={`select select-primary w-full`}
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
                <button
                  className="btn btn-primary w-full sm:w-auto"
                  onClick={saveProfile}
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* User Edit Card */}
        <div className="">
          <UserEditCard
            user={{ firstName, lastName, photoUrl, age, gender, about, skills }}
          />
        </div>
      </div>

      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Select Your Skills</h3>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {[
                "JavaScript",
                "React",
                "Node.js",
                "CSS",
                "HTML",
                "Python",
                "Java",
                "C++",
              ].map((skill) => (
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
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
