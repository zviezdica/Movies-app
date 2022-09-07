import { Container, Navbar, NavbarBrand } from "react-bootstrap";
import Favorites from "./Favorites";
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
          <Favorites />
          <SearchInput />
        </div>
      </Container>
    </Navbar>
  );
};

export default Navigation;
