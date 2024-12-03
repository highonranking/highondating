import React from "react";

const UserEditCard = ({ user }) => {
  return (
    <div className="card glass w-96 p-4 relative shadow-lg border border-gray-200">
      <figure className="relative overflow-hidden rounded-lg shadow-lg">
        <img
          src={user?.photoUrl}
          alt="profile pic"
          className="object-cover w-full h-64"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-70"></div>
        <div className="absolute bottom-2 left-4 text-white">
          <h2 className="text-xl font-bold">
            {user?.firstName} {user?.lastName}
          </h2>
          <p className="text-sm text-gray-200">Lives in: {user?.address}</p>
        </div>
      </figure>

      <div className="flex justify-around mt-4">
        <span className="badge badge-info px-4 py-2 text-sm">
          Age: {user?.age}
        </span>
        <span
          className={`badge px-4 py-2 text-sm ${
            user?.gender === "male" ? "badge-success" : "badge-error"
          }`}
        >
          {user?.gender}
        </span>
      </div>

      <div className="card-body mt-6 bg-white rounded-lg shadow p-6">
        <p className="text-gray-600 mb-4">{user?.about || "No about info."}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {user?.skills?.length > 0 ? (
            user.skills.map((skill) => (
              <span
                key={skill}
                className="badge bg-gradient-to-r from-purple-400 to-pink-400 text-white px-3 py-1 rounded-full shadow"
              >
                {skill}
              </span>
            ))
          ) : (
            <p className="text-gray-400">No skills selected</p>
          )}
        </div>

        <div className="bg-gray-100 p-4 rounded-lg text-gray-700">
          <p className="font-medium">Address</p>
          <p className="text-sm text-gray-600 mt-1">{user?.address}</p>
        </div>
      </div>
    </div>
  );
};

export default UserEditCard;
