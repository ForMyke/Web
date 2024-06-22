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
          Bienvenidos a Xclusive Store
        </h1>
      </div>

      <div className="container mt-5 text-white">
        <div className="row mb-5">
          <div className="col-lg-6 col-md-12 d-flex justify-content-center align-items-center">
            <ThreeFigure color={0xffffff} />
          </div>
          <div className="col-lg-6 col-md-12 d-flex flex-column justify-content-center">
            <h1 className="display-1">Innovación y Tecnología</h1>
            <p className="lead">
              En Xclusive Store, nos apasiona ofrecerte lo último en tecnología
              y productos innovadores. Nuestra misión es brindarte una
              experiencia de compra única y exclusiva.
            </p>
          </div>
        </div>
        <div className="row hero-image-text">
          <div className="col-12">
            <h2>Quiénes Somos</h2>
            <p>
              Xclusive Store es más que una tienda, es un destino donde la
              tecnología y la innovación se encuentran. Desde nuestra fundación,
              hemos trabajado incansablemente para traer los productos más
              exclusivos y de alta calidad a nuestros clientes. Nuestro equipo
              de expertos está siempre en busca de las últimas tendencias y
              avances tecnológicos para asegurar que siempre estés a la
              vanguardia.
            </p>
          </div>
        </div>
        <h1 className="text-center my-4">Nuestras Iniciativas</h1>
        <div className="row initiative-section mb-4">
          <div className="col-lg-6 col-md-12 d-flex justify-content-center align-items-center">
            <ThreeFigure color={0xffffff} />
          </div>
          <div className="col-lg-6 col-md-12 d-flex flex-column justify-content-center">
            <h2>Fomentando el Futuro Activo</h2>
            <p>
              En Xclusive Store, creemos en la importancia de un futuro activo y
              saludable. Por eso, invertimos en programas y actividades que
              promueven el deporte y el juego para todos los niños. Nuestro
              objetivo es asegurar que la próxima generación crezca en un
              entorno equitativo y lleno de oportunidades.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcercaDe;
