import React, { FC } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Lazy } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import MovieCard from "./MovieCard";

import { Movie } from "../../pages/MovieDiscoveryPage";

const MoviesList: React.FC<{ movies: Movie[]; title: string }> = ({
  movies,
  title,
}) => {
  const displayMovies = () => {
    return movies.map((movie) => {
      return (
        <SwiperSlide key={movie.id} style={{ width: "fit-content" }}>
          <MovieCard movie={movie} />
        </SwiperSlide>
      );
    });
  };

  return (
    <div>
      <h2>{title}</h2>
      <Swiper
        spaceBetween={10}
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
        {displayMovies()}
      </Swiper>
    </div>
  );
};

export default MoviesList;
