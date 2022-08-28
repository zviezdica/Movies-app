import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Lazy } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import MovieCard from "./MovieCard";

const MoviesList = () => {
  return (
    <div>
      <Swiper
        spaceBetween={30}
        slidesPerView={"auto"}
        loop={true}
        loopedSlides={10}
        watchSlidesProgress={true}
        preloadImages={false}
        lazy={true}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        navigation={true}
        modules={[Navigation, Lazy]}
      >
        <SwiperSlide style={{ width: "fit-content" }}>
          <MovieCard></MovieCard>
        </SwiperSlide>
        <SwiperSlide style={{ width: "fit-content" }}>
          <MovieCard></MovieCard>
        </SwiperSlide>
        <SwiperSlide style={{ width: "fit-content" }}>
          <MovieCard></MovieCard>
        </SwiperSlide>
        <SwiperSlide style={{ width: "fit-content" }}>
          <MovieCard></MovieCard>
        </SwiperSlide>
        <SwiperSlide style={{ width: "fit-content" }}>
          <MovieCard></MovieCard>
        </SwiperSlide>
        <SwiperSlide style={{ width: "fit-content" }}>
          <MovieCard></MovieCard>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default MoviesList;
