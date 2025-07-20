import React from "react";

export const HighlightText = ({ text }) => {
  return (
    <span className="bg-gradient-to-r from-yellow-50 via-yellow-100 to-yellow-300 text-transparent bg-clip-text font-bold">
      {" "}
      {text}
    </span>
  );
};
