import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Course_Card } from "./Course_Card";

export const CourseSlider = ({ Courses }) => {
    if (!Courses || Courses.length === 0) {
        return <p>No Course Found, CourseSlider</p>;
    }

    return (
        <Swiper
            key={Courses.length}
            slidesPerView={Courses.length >= 3 ? 3 : Courses.length}
            spaceBetween={30}
            loop={Courses.length > 1}
            pagination={{ clickable: true }}
            navigation={true}
            modules={[Pagination, Autoplay, Navigation]}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            breakpoints={{
                320: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
            }}
        >
            {Courses.map((course, index) => (
                <SwiperSlide key={index}>
                    <Course_Card course={course} Height={"h-full"} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};
