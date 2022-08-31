import React from "react";

import { Container } from "react-bootstrap";

import Navigation from "../navigation/Navigation";

type Props = {
  children: React.ReactElement;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Navigation />
      <Container>
        <main className="py-5">{children}</main>
      </Container>
    </>
  );
};

export default Layout;
