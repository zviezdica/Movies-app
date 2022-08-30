import React from "react";
import { useParams } from "react-router-dom";

const MovieDetailsPage = () => {
  const { id } = useParams();
  console.log(id);

  return <div>vidi id</div>;
};

export default MovieDetailsPage;
