import React from "react";
import { Container } from "react-bootstrap";

type Props = {
  imgUrl: string;
  headline1: string;
  headline2: string;
  description: string;
  textFirst?: boolean;
};

const ImageWithText: React.FC<Props> = ({
  imgUrl,
  headline1,
  headline2,
  description,
  textFirst,
}) => {
  return (
    <Container
      fluid
      className="section image-with-text d-flex flex-wrap flex-xl-nowrap align-items-center"
    >
      <div className={`${textFirst ? "order-2" : "order-1"}`}>
        <picture>
          <source srcSet={imgUrl} />
          <img src={imgUrl} alt="functionalities image" className="img-fluid" />
        </picture>
      </div>
      <div
        className={`pt-5 pt-xl-0 d-flex justify-content-center text-center text-xl-start ${
          textFirst ? "order-1" : "order-2"
        }`}
      >
        <div className="image-with-text--text">
          <h6 className="text-uppercase text-warning">{headline1}</h6>
          <h3 className="text-white display-6 fw-bold">{headline2}</h3>
          <p className="text-secondary fs-4">{description}</p>
        </div>
      </div>
    </Container>
  );
};

export default ImageWithText;
