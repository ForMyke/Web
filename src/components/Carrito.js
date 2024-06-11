import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/carrito.css";

const Carrito = () => {
  return (
    <div className="carrito-container container mt-5">
      <div className="row">
        <div className="col-md-8">
          <div className="alert alert-light" role="alert">
            <strong>Envío gratuito para miembros.</strong> Hazte miembro de
            Xclusive Store para disfrutar de envíos rápidos y gratuitos.{" "}
            <a href="#" className="alert-link">
              Únete
            </a>{" "}
            o{" "}
            <a href="#" className="alert-link">
              Iniciar sesión
            </a>
          </div>
          <h2>Bolsa de compra</h2>
          <p>No hay productos en tu bolsa de compra.</p>
          <h3>Favoritos</h3>
          <p>
            ¿Quieres ver tus favoritos?{" "}
            <a href="#" className="text-decoration-none">
              Únete
            </a>{" "}
            o{" "}
            <a href="#" className="text-decoration-none">
              Iniciar sesión
            </a>
          </p>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Resumen</h3>
              <p className="card-text">
                Subtotal <span className="float-right">₽0</span>
              </p>
              <p className="card-text">
                Gastos de envío y gestión estimados{" "}
                <span className="float-right">Gratis</span>
              </p>
              <h4 className="card-text">
                Total <span className="float-right">₽0</span>
              </h4>
              <button className="btn btn-secondary btn-block mb-2">
                Compra como invitado
              </button>
              <button className="btn btn-secondary btn-block mb-2">
                Compra como miembro
              </button>
              <button className="btn btn-outline-secondary btn-block">
                PayPal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carrito;
