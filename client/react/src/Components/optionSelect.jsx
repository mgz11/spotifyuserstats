import React from "react";

const OptionSelect = ({ selectedOption, handleOptionChange }) => {
  return (
    <div className="flex justify-center mb-9">
      <button
        className={`${
          selectedOption === "Tracks" ? "bg-blue-500 text-white" : ""
        } py-2 px-4 mr-12 border-b-2 border-black font-medium`}
        onClick={() => {
          handleOptionChange("Tracks");
        }}
      >
        Tracks
      </button>
      <button
        className={`${
          selectedOption === "Artists" ? "bg-blue-500 text-white" : ""
        } py-2 px-4 mr-12 border-b-2 border-black font-medium`}
        onClick={() => {
          handleOptionChange("Artists");
        }}
      >
        Artists
      </button>
    </div>
  );
};

export default OptionSelect;
