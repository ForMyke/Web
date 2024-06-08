import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/acercaDe.css"; // Asegúrate de crear y usar este archivo CSS

const AcercaDe = () => {
  return (
    <div className="acerca-de-container">
      <div className=" mt-5 text-white">
        <div className="hero-text">
          <h1 className="display-1">CON LA MEJOR TECNOLOGIA</h1>
          <p className="lead">Si tienes la oportunidad tomala</p>
        </div>
        <div className="hero-image">
          <img src="./img/acerca2.jpg" alt="Athlete" />
          <div className="hero-image-text">
            <h2>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and s{" "}
            </h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages,
            </p>
          </div>
        </div>
      </div>

      <h1 className="text-center my-4">Iniciativas</h1>
      <div className="initiative-section">
        <div className="initiative-img-container">
          <img
            src="./img/acerca1.jpg"
            alt="Getting Kids Active"
            className="initiative-img"
          />
        </div>
        <div className="initiative-content">
          <h2>Getting Kids Active</h2>
          <p>
            Nike invests in play and sport for all kids, because an active next
            generation means a healthier and more equitable future.
          </p>
        </div>
      </div>
      <div className="initiative-section">
        <div className="initiative-img-container">
          <img
            src="./img/acerca4.jpg"
            alt="Building and Investing In Our Teams"
            className="initiative-img"
          />
        </div>
        <div className="initiative-content">
          <h2>Building and Investing In Our Teams</h2>
          <p>
            We support the personal and professional wellbeing of NIKE, Inc.
            employees — from manufacturing to corporate — through a range of
            programs and partnerships.
          </p>
        </div>
      </div>
      <div className="initiative-section">
        <div className="initiative-img-container">
          <img
            src="./img/acerca3.jpg"
            alt="Giving Back to Our Communities"
            className="initiative-img"
          />
        </div>
        <div className="initiative-content">
          <h2>Giving Back to Our Communities</h2>
          <p>
            We’re committed to building a future where everyone — regardless of
            where they are from, the color of their skin, their abilities or who
            they love — can thrive.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AcercaDe;
