import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

import "../css/carrito.css";

const Carrito = () => {
  return (
    <div className="carrito-container mt-5">
      <div className="alert alert-light" role="alert">
        <strong>Envío gratuito para miembros.</strong> Hazte miembro de Xclusive
        Store para disfrutar de envíos rápidos y gratuitos.{" "}
        <a href="#" className="alert-link">
          Únete
        </a>{" "}
        o{" "}
        <a href="#" className="alert-link">
          Iniciar sesión
        </a>
      </div>
      <div className="row">
        <div className="col-md-8">
          <h2>Bolsa de compra</h2>
          <div className="cart-item mb-3">
            <div className="d-flex align-items-center">
              <img
                src="./img/product1.jpg"
                alt="Producto 1"
                className="img-thumbnail"
                style={{ width: "100px", height: "100px" }}
              />
              <div className="ms-3">
                <h5 className="mb-1">Xclusive Store productos</h5>
                <p className="mb-1">Playera para hombre</p>
                <p className="mb-1">Blanco</p>
                <p className="mb-1">Talla M</p>
                <p className="mb-1">Cantidad: 1</p>
              </div>
              <div className="ms-auto" id="precio">
                <h5 className="mb-0">$999.00</h5>
              </div>
            </div>
          </div>
          <div className="cart-item mb-3">
            <div className="d-flex align-items-center">
              <img
                src="./img/product2.jpg"
                alt="Producto 2"
                className="img-thumbnail"
                style={{ width: "100px", height: "100px" }}
              />
              <div className="ms-3">
                <h5 className="mb-1">Xclusive Store Producto 2</h5>
                <p className="mb-1">Calzado para hombre</p>
                <p className="mb-1">Blanco/Blanco/Negro</p>
                <p className="mb-1">Talla 29.5</p>
                <p className="mb-1">Cantidad: 1</p>
                <p className="text-muted mb-0">Envío gratuito</p>
              </div>
              <div className="ms-auto">
                <h5 className="mb-0">$1,799.00</h5>
              </div>
            </div>
          </div>
          <div className="alert alert-warning" role="alert">
            <small>Asegurate de revisar tu pedido antes de compraras.</small>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Resumen</h3>
              <p className="card-text">
                Subtotal <span className="float-end">$2,798.00</span>
              </p>
              <p className="card-text">
                Gastos de envío y gestión estimados{" "}
                <span className="float-end">Gratis</span>
              </p>
              <h4 className="card-text">
                Total <span className="float-end">$2,798.00</span>
              </h4>
              <button className="btn btn-dark btn-block mb-2">Comprar</button>
              <button className="btn btn-dark btn-block mb-2">Guardar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carrito;
