import { useState } from "react";

const backgroundColors = [
  "bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400",
  "bg-gradient-to-r from-green-200 via-green-400 to-purple-700",
  "bg-gradient-to-r from-green-300 to-purple-400",
  "bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500",
  "bg-gradient-to-tr from-violet-500 to-orange-300",
  "bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-200 via-violet-600 to-sky-900",
  "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-300 via-fuchsia-600 to-orange-600",
  "bg-gradient-to-r from-yellow-400 via-gray-50 to-teal-300",
  "bg-gradient-to-t from-orange-400 to-sky-400",
  "bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-yellow-500 via-purple-500 to-blue-500",
];

const Header = ({ handleBgColor }) => {
  // Select a random color from the array of colors
  let randomIndex = Math.floor(Math.random() * backgroundColors.length);
  let randomColor = backgroundColors[randomIndex];

  return (
    <div className="flex justify-between pt-7 pb-9">
      <button
        onClick={() => handleBgColor(randomColor)}
        className="ml-11 py-2 px-2 rounded font-medium"
      >
        Change Color
      </button>
      <button
        onClick={() => handleBgColor("bg-white")}
        className="mr-11 py-2 px-2 rounded font-medium"
      >
        Reset Color
      </button>
    </div>
  );
};

export default Header;
