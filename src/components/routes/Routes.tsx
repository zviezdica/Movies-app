import React from "react";
import { useRoutes } from "react-router-dom";

import { HomePage, MovieDetailsPage, MovieDiscoveryPage } from "../../pages";

const Routes = () => {
  let routes = useRoutes([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/details",
      element: <MovieDetailsPage />,
    },
    {
      path: "/discovery",
      element: <MovieDiscoveryPage />,
    },
  ]);
  return routes;
};

export default Routes;
