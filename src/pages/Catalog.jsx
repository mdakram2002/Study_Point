
import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { Footer } from "../components/common/Footer";
import { useParams } from "react-router-dom";
import { apiConnector } from "../services/apiConnector";
import { categories } from "../services/apis";
import { getCatalogPageData } from "../services/operations/pageAndComponentData";
import { Course_Card } from "../components/core/Catalog/Course_Card";
import { CourseSlider } from "../components/core/Catalog/CourseSlider";
import { HighlightText } from "../components/core/HomePage/HighlightText";

const Catalog = () => {
  const { catalogName } = useParams();
  const [catalogPageData, setCatalogPageData] = useState();
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await apiConnector("GET", categories.CATEGORIES_API);
        const category_id = response?.data?.categories?.filter(
          (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
        )[0]?._id;
        // console.log("ROW DATA RESPONSE OF GETCATEGORIES: ", response);
        setCategoryId(category_id);
      } catch (err) {
        console.error("Could not fetch Category", err);
        toast.error(err.message);
      }
    };
    getCategories();
  }, [catalogName]);

  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const response = await getCatalogPageData(categoryId);
        // console.log("ROW DATA RESPONSE GETCATEGORYDETAILS:", response);
        setCatalogPageData(response);
      } catch (err) {
        console.error("Could not fetch Category Details", err);
        console.log(err);
      }
    };

    if (categoryId && categoryId !== undefined) {
      getCategoryDetails();
    }
  }, [categoryId]);

  const selectedCategory = catalogPageData?.data?.selectedCategory;
  const differentCategory = catalogPageData?.data?.differentCategory;
  const topSellingCourses = catalogPageData?.data?.topSellingCourses;

  // console.log("SELCECTED CATEGROY: ", selectedCategory);
  // console.log("DIFFERENT CATEGROY: ", differentCategory);
  // console.log("TOP SELLING CATEGROY: ", topSellingCourses);
  return (
    <>
      <div>
        <div className="box-content bg-richblack-900 px-4 lg:ml-10 md:mt-4">
          <div className="mx-auto mt-5 flex min-h-[20px] max-w-maxContentTab gap-3 lg:max-w-maxContent">
            <p className="text-richblack-100 mt-5 text-3xl">{`Home / Catalog / `}</p>
            <span className="mt-5 text-3xl">
              {" "}
              <HighlightText text={selectedCategory?.name} />
            </span>
          </div>
          <p className="text-3xl text-richblack-5 mt-3">
            {selectedCategory?.name}
          </p>
          <p className="max-w-[870px] text-richblack-200">
            {selectedCategory?.description}
          </p>
        </div>

        {/* section 1 for Tab  */}
        <div className="mx-auto box-content w-11/12 max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
          <div className="section_heading">
            <div className="text-richblack-5 text-2xl">
              Courses to get you started
            </div>
            <div className="my-2 flex border-b border-b-richblack-600 text-sm">
              <p className="text-richblack-5 text-2xl">Most Popular Courses</p>
            </div>
            <div className="py-4">
              <CourseSlider Courses={selectedCategory?.courses} />
            </div>
          </div>

          {/* section 2 for  */}
          <div className="section_heading mt-10">
            <div className="text-richblack-5 text-2xl font-semibold">
              Top Courses in {selectedCategory?.name}{" "}
            </div>
            <div className="py-4">
              <CourseSlider Courses={differentCategory?.courses} />
            </div>
          </div>

          {/* section 3 for  */}
          <div className="section_heading mt-5">
            <div className="text-2xl font-semibold text-white">Frequently Bought</div>
            <div className="py-4">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {topSellingCourses?.slice(0, 6).map((course, index) => (
                  <Course_Card
                    course={course}
                    key={index}
                    Height={"h-[350px]"}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Catalog;
