/** @format */

import React from "react";

export const IconButtonModal = ({
  text,
  onClick,
  children,
  disabled,
  outline=false,
  customClasses,
  type,
}) => {
  return (
    <button>
        {
            children ? " " : " "
        }
    </button>
  );
};
