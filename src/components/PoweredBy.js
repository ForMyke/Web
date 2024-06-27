import React from "react";
import "../css/PowerBy.css";
import "bootstrap/dist/css/bootstrap.min.css";

const PowerBy = () => {
  return (
    <div className="power-by-container mb-5">
      <h1 className="font-power">Powered by</h1>
      <div className="container">
        <div className="row image-row">
          <div className="col-12 col-sm-6 im1 col-md-4 d-flex justify-content-center">
            <img src="./img/react.png" alt="React" className="image-item" />
          </div>
          <div className="col-12 col-sm-6  im2 col-md-4 d-flex justify-content-center">
            <img
              src="./img/Mysql.png"
              alt="MySQL"
              className="image-item middle-image"
            />
          </div>
          <div className="col-12 col-sm-6 im3 col-md-4 d-flex justify-content-center">
            <img src="./img/php.png" alt="PHP" className="image-item" />
          </div>
        </div>
        <div className="row">
          <div className="col-12 d-flex justify-content-center single-image">
            <img src="./img/trhee1.png" alt="Three.js" className="image-item" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PowerBy;
