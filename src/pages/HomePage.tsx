import React from "react";
import { Button, Container } from "react-bootstrap";
import ImageWithText from "../components/home-page/ImageWithText";

const HomePage = () => {
  return (
    <section className="home-page ">
      <div className="header-section d-flex flex-wrap flex-xl-nowrap">
        <div className="w-100 w-xl-50 order-2 order-xl-1">
          <h1 className="text-white display-3 fw-bold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h1>
          <p className="text-secondary">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem,
            corporis.
          </p>
          <div>
            <Button
              href="/discovery"
              variant="warning"
              className="py-3 px-4  fw-bold fs-5 d-block d-sm-inline-block me-0 mb-3 mb-sm-0 me-sm-3 "
            >
              Discover
            </Button>
            <Button
              href="#functionalities"
              variant="outline-secondary"
              className="py-3 px-4 fs-5 d-block d-sm-inline-block"
            >
              Functionalities
            </Button>
          </div>
        </div>
        <div className="hero-image--container w-100 w-xl-50 order-1 order-xl-2 position-relative ">
          <div className="hero-img w-100 h-100 position-relative position-xl-absolute top-0 start-0">
            <picture>
              <source srcSet="https://www.justwatch.com/appassets/img/home/tv/tv@2x.webp" />
              <img
                src="https://www.justwatch.com/appassets/img/home/tv/tv@2x.webp"
                alt="header image"
                className=" position-absolute start-50 translate-middle-x position-xl-relative"
              />
            </picture>
          </div>
        </div>
      </div>
      <div id="functionalities">
        <ImageWithText
          imgUrl="https://www.justwatch.com/appassets/img/home/recommendations/recommendations@2x.webp"
          headline1="Lorem ipsum dolor sit"
          headline2="Lorem ipsum dolor sit"
          description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi,
            tempore."
        />
        <ImageWithText
          imgUrl="https://www.justwatch.com/appassets/img/home/recommendations/recommendations@2x.webp"
          headline1="Lorem ipsum dolor sit"
          headline2="Lorem ipsum dolor sit"
          description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi,
            tempore."
          textFirst={true}
        />
        <ImageWithText
          imgUrl="https://www.justwatch.com/appassets/img/home/recommendations/recommendations@2x.webp"
          headline1="Lorem ipsum dolor sit"
          headline2="Lorem ipsum dolor sit"
          description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi,
            tempore."
        />
      </div>
    </section>
  );
};

export default HomePage;
