
import React from "react";
import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { catalogData } from "../apis";

export const getCatalogPageData = async (categoryId) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector(
      "POST",
      catalogData.CATALOGPAGEDATA_API,
      { categoryId: categoryId });
      
    console.log("ROW DATA OF GET CATALOGPAGE DATA: ", response);
    console.log("CATEGORIES API RESPONSE GETCATALOGPAGEDATA: ", response.data);

    if (!response?.data?.success)
      throw new Error("Could not fetch the Category Page Data");

    result = response?.data;
  } catch (err) {
    console.log("CATALOG PAGE DATA API ERROR: ", err);
    toast.error(err.message);
    result = err.response?.data;
  }
  toast.dismiss(toastId);
  console.log("CALLING CATALOG PAGE DATA: ", categoryId);
  return result;
};
