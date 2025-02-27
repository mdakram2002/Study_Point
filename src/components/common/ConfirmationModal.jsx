/** @format */

import React from "react";
import { IconButtonModal } from "./IconButtonModal";

export const ConfirmationModal = ({ modalData }) => {
  return (
    <div className="mx-auto flex items-center justify-center">
      <div>
        <p>{modalData.text1}</p>
        <p>{modalData.text2}</p>
        <div>
          <IconButtonModal />
        </div>
      </div>
    </div>
  );
};
