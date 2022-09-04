import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

// Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Lazy } from "swiper";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";

//Internal components and functions
import getAPIData from "../../helpers/getAPIData";
import MovieCard from "./MovieCard";

interface MoviesList {
  title: string;
  id?: string;
  upcoming?: boolean;
}

const MoviesList: React.FC<MoviesList> = ({ title, id, upcoming }) => {
  const [movies, setMovies] = useState([]);
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });
  // console.log(inView);

  let apiQuery: string, aditional: string;
  if (upcoming) {
    apiQuery = "movie/upcoming?";
  } else {
    apiQuery = "discover/movie?";
    aditional = `&page=1&with_genres=${id}`;
  }

  const getMovies = async () => {
    return getAPIData(apiQuery, aditional).then((res) => {
      res.results.length && setMovies(res.results);
    });
  };

  useEffect(() => {
    inView && getMovies();
  }, [inView]);

  const displayMovies = () => {
    return movies.map((movie) => {
      const { id, title, poster_path } = movie;
      const movieData = { id, title, img: poster_path };
      return (
        <SwiperSlide key={id + Math.random()} style={{ width: "fit-content" }}>
          <MovieCard movie={movieData} />
        </SwiperSlide>
      );
    });
  };

  return (
    <div ref={ref} className="section">
      <h2 className="text-white pb-2 text-capitalize">{title}</h2>
      <Swiper
        spaceBetween={10}
        slidesPerView={"auto"}
        watchSlidesProgress={true}
        preloadImages={false}
        // lazy={true}
        navigation={true}
        modules={[Navigation, Lazy]}
      >
        {displayMovies()}
      </Swiper>
    </div>
  );
};

export default MoviesList;
