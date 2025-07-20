
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import RatingStars from "react-rating-stars-component";
import { reatingAndReviewEndpoints } from "../../services/apis";
import { apiConnector } from "../../services/apiConnector";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export const ReviewSlider = () => {
    const [reveiw, setReview] = useState([]);
    const trucateWords = 15;

    // useEffect(() => {
    //     console.log("PRINTING REVIEW (after setReview):", reveiw);
    // }, [reveiw]);


    useEffect(() => {
        const allReveiws = async () => {
            const response = await apiConnector(
                "GET",
                reatingAndReviewEndpoints.REVIEWS_DETAILS_API
            );
            console.log("LOGGING RESPONSEOF RATING AND REVIEW", response);

            const { data } = response;
            if (data?.success) {
                setReview(data?.data);
            }
            console.log("PRINTING REVIEW:", reveiw);
        };
        allReveiws();
    }, []);

    return (
        <div className="text-richblack-5 mt-4">
            <div className="h-[200px] max-w-maxContent">
                <Swiper
                    slidesPerView={5}
                    spaceBetween={30}
                    loop={reveiw.length >= 2}
                    pagination={{ clickable: true }}
                    // navigation={true}
                    freeMode={true}
                    modules={[Pagination, Autoplay, Navigation]}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    className="w-full"
                >
                    {reveiw.map((review, index) => (
                        <SwiperSlide
                            key={index}
                            className="bg-richblack-800 p-4 rounded-md mt-5"
                        >
                            <div className="flex items-center gap-3">
                                <img
                                    src={
                                        review?.user?.image
                                            ? review.user.image
                                            : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                                    }
                                    alt="profile_pic"
                                    className="w-10 h-10 object-cover rounded-full"
                                />
                                <div>
                                    <p className="font-semibold text-base">
                                        {review?.user?.firstName} {review?.user?.lastName}
                                    </p>
                                    <p className="text-sm text-richblack-200">
                                        {review?.course?.courseName}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-2 flex gap-x-1 items-center justify-start">
                                <p className="text-[18px] flex items-center justify-center mt-1 text-richblack-200">
                                    {(Number(review.rating) || 0).toFixed(1)}
                                </p>
                                <RatingStars
                                    value={review.rating}
                                    edit={false}
                                    size={20}
                                    activeColor="#ffd700"
                                />
                            </div>
                            <p className="mt-2 flex items-center justify-start text-sm text-richblack-200">
                                {review.review.split(" ").slice(0, 10).join(" ")}
                                {review.review.split(" ").length > 10 ? "..." : ""}
                            </p>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};
