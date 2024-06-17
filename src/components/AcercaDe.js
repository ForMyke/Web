import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/acercaDe.css";
import ThreeFigure from "../Animaciones/ThreeFigure";
import ThreeFigureExpanded from "../Animaciones/ThreeFigureExpanded";

const AcercaDe = () => {
  return (
    <div className="acerca-de-container black">
      <div
        className="black-section position-relative d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <ThreeFigureExpanded color={0xffffff} />
        <h1 className="centered-text text-white position-absolute">
          Xclusive Store es solo
        </h1>
      </div>

      <div className="container mt-5 text-white">
        <div className="row mb-5">
          <div className="col-lg-6 col-md-12 d-flex justify-content-center align-items-center">
            <ThreeFigure color={0xffffff} />
          </div>
          <div className="col-lg-6 col-md-12 d-flex flex-column justify-content-center">
            <h1 className="display-1">CON LA MEJOR TECNOLOGIA</h1>
            <p className="lead">Si tienes la oportunidad, tómala</p>
          </div>
        </div>
        <div className="row hero-image-text">
          <div className="col-12">
            <h2>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages.
            </p>
          </div>
        </div>
        <h1 className="text-center my-4">Iniciativas</h1>
        <div className="row initiative-section mb-4">
          <div className="col-lg-6 col-md-12 d-flex justify-content-center align-items-center">
            <ThreeFigure color={0xffffff} />
          </div>
          <div className="col-lg-6 col-md-12 d-flex flex-column justify-content-center">
            <h2>Getting Kids Active</h2>
            <p>
              Xclusive Store invests in play and sport for all kids, because an
              active next generation means a healthier and more equitable
              future.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcercaDe;
