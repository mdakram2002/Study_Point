
import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { Footer } from "../components/common/Footer";
import { useParams } from "react-router-dom";
import { apiConnector } from "../services/apiConnector";
import { categories } from "../services/apis";
import { getCatalogPageData } from "../services/operations/pageAndComponentData";
import { Course_Card } from "../components/core/Catalog/Course_Card";
import { CourseSlider } from "../components/core/Catalog/CourseSlider";

const Catalog = () => {
  const { catalogName } = useParams();
  const [catalogPageData, setCatalogPageData] = useState();
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await apiConnector("GET", categories.CATEGORIES_API);
        const category_id = response?.data?.categories?.find(
          (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
        )?._id;
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
        setCatalogPageData(response);
      } catch (err) {
        console.error("Could not fetch Category Details", err);
      }
    };

    if (categoryId) {
      getCategoryDetails();
    }
  }, [categoryId]);

  const selectedCategory = catalogPageData?.data?.selectedCategory;
  const differentCategory = catalogPageData?.data?.differentCategory;
  const topSellingCourses = catalogPageData?.data?.topSellingCourses;

  return (
    <>
      {/* Header */}
      <div className="bg-richblack-900 px-4 py-6 md:px-10 md:py-10 mx-auto w-11/12 max-w-maxContent">
        <div className="text-sm text-richblack-300">
          Home / Catalog /{" "}
          <span className="text-yellow-50">{selectedCategory?.name}</span>
        </div>

        <h1 className="mt-2 text-2xl md:text-3xl font-bold text-richblack-5">
          {selectedCategory?.name}
        </h1>
        <p className="mt-2 max-w-4xl text-richblack-200 text-sm md:text-base">
          {selectedCategory?.description}
        </p>
      </div>

      {/* Body */}
      <div className="mx-auto w-11/12 max-w-maxContentTab lg:max-w-maxContent py-6 mb-5">
        {/* Section 1: Most Popular Courses */}
        <section className="mb-10 px-4 md:px-6">
          <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">
            Most Popular Courses
          </h2>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {selectedCategory?.courses?.map((course, i) => (
              <Course_Card key={i} course={course} />
            ))}
          </div>
        </section>

        {/* Section 2: Top Courses */}
        <section className="mb-10 px-4 md:px-6">
          <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">
            Top Courses in {selectedCategory?.name}
          </h2>
          <CourseSlider Courses={differentCategory?.courses} />
        </section>

        {/* Section 3: Frequently Bought */}
        <section className="px-4 md:px-6">
          <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">
            Frequently Bought
          </h2>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {topSellingCourses?.slice(0, 8).map((course, index) => (
              <Course_Card key={index} course={course} />
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Catalog;
