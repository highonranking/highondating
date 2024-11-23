import React from "react";
import "react-toastify/dist/ReactToastify.css";

const ShimmerUserCard = () => {
  return (
    <div className="card min-h-[600px] glass w-96 animate-pulse">
      <figure className="w-full h-64 bg-gray-300 rounded-lg"></figure>
      <div className="flex flex-row gap-12 my-2 justify-center">
        <div className="badge badge-info gap-2 bg-gray-300 w-16 h-6"></div>
        <div className="badge badge-success gap-2 bg-gray-300 w-16 h-6"></div>
      </div>
      <div className="card-body">
        <h2 className="card-title bg-gray-300 h-6 w-3/4 rounded-md"></h2>
        <p className="bg-gray-300 h-4 w-full mt-4 rounded-md"></p>
        <div className="flex flex-col space-y-2 mt-4">
          <div className="bg-gray-300 h-4 w-5/6 rounded-md"></div>
          <div className="bg-gray-300 h-4 w-3/4 rounded-md"></div>
        </div>
        <div className="card-actions justify-center flex gap-24 mt-12">
          <div className="btn bg-gray-300 w-12 h-12 rounded-full"></div>
          <div className="btn bg-gray-300 w-12 h-12 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default ShimmerUserCard;
