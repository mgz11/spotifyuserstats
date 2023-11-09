import { useState } from "react";

const TimelineButtons = ({ activeButton, handleActiveButton }) => {
  return (
    <div className="flex justify-center mb-9">
      <button
        className={`${
          activeButton === 1 ? "bg-blue-500 text-white" : ""
        } py-2 px-4 mr-12 border-b-2 border-black font-medium`}
        onClick={() => {
          handleActiveButton(1);
        }}
      >
        Last Month
      </button>
      <button
        className={`${
          activeButton === 2 ? "bg-blue-500 text-white" : ""
        } py-2 px-4 mr-12 border-b-2 border-black font-medium`}
        onClick={() => {
          handleActiveButton(2);
        }}
      >
        Last 6 Months
      </button>
      <button
        className={`${
          activeButton === 3 ? "bg-blue-500 text-white" : ""
        } py-2 px-4 border-b-2 border-black font-medium`}
        onClick={() => {
          handleActiveButton(3);
        }}
      >
        All-Time
      </button>
    </div>
  );
};

export default TimelineButtons;
