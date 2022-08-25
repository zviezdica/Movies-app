import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  Container,
  Form,
  InputGroup,
  Navbar,
  NavbarBrand,
  NavDropdown,
} from "react-bootstrap";

const Navigation = () => {
  return (
    <Navbar sticky="top">
      <Container
        fluid
        className="flex-wrap flex-sm-nowrap justify-content-center justify-content-sm-between"
      >
        <div className="navigation-logo mb-2 mb-sm-0">
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
        <div className="d-flex ">
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
          <InputGroup className="rounded">
            <InputGroup.Text className="border-0 bg-primary">
              <SearchIcon className="text-secondary" />
            </InputGroup.Text>
            <Form.Control
              placeholder="name, date"
              aria-label="search by name, date"
              className="border-0 bg-primary text-secondary shadow-none"
            ></Form.Control>
          </InputGroup>
        </div>
      </Container>
    </Navbar>
  );
};

export default Navigation;
