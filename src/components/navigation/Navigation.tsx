import React, { useState } from "react";
import { Container, Navbar, NavbarBrand, NavDropdown } from "react-bootstrap";
import SearchInput from "./SearchInput";

const Navigation = () => {
  return (
    <Navbar sticky="top">
      <Container className="flex-wrap flex-sm-nowrap justify-content-center justify-content-sm-between pt-xl-4 pb-xl-3">
        <div className="navigation-logo mb-3 mb-sm-0">
          <NavbarBrand href="/">
            <picture>
              <source srcSet="https://www.justwatch.com/appassets/img/logo/JustWatch-logo-large.webp" />
              <img
                src="https://www.justwatch.com/appassets/img/logo/JustWatch-logo-large.webp"
                alt="logo"
              />
            </picture>
          </NavbarBrand>
        </div>
        <div className="d-flex w-75 justify-content-center justify-content-sm-end">
          <NavDropdown
            title="My favorites"
            id="favoritesDropdown"
            className="rounded border-0 bg-primary text-secondary me-3 me-xl-4"
          >
            <NavDropdown.Item href="/" className="text-secondary">
              Fav 1
            </NavDropdown.Item>
            <NavDropdown.Item href="/" className="text-secondary">
              Fav 2
            </NavDropdown.Item>
          </NavDropdown>
          <SearchInput />
        </div>
      </Container>
    </Navbar>
  );
};

export default Navigation;
