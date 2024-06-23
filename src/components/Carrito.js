import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../css/carrito.css";

const Carrito = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(savedCartItems);
  }, [setCartItems]);

  const handleComprar = (e) => {
    e.preventDefault();
    let timerInterval;
    Swal.fire({
      title: "Redirigiendo al pago...",
      html: "Serás redirigido en <b></b> milisegundos.",
      timer: 1000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getHtmlContainer().querySelector("b");
        timerInterval = setInterval(() => {
          timer.textContent = Swal.getTimerLeft();
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
        navigate("/pago");
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("Redirigido al pago por el temporizador");
      }
    });
  };

  const handleRemoveItem = (index) => {
    const updatedCartItems = cartItems.filter((item, i) => i !== index);
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const handleViewProduct = (id) => {
    navigate(`/productos/${id}`);
  };

  const getTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="carrito-container mt-5">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8">
            <h2>Bolsa de compra</h2>
            {cartItems.length === 0 ? (
              <p>No hay productos en el carrito</p>
            ) : (
              cartItems.map((item, index) => (
                <div className="cart-item mb-3" key={index}>
                  <div className="d-flex align-items-center">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="img-thumbnail"
                      style={{ width: "100px", height: "100px" }}
                    />
                    <div className="ms-3">
                      <h5 className="mb-1">{item.title}</h5>
                      <p className="mb-1">{item.description}</p>
                      <p className="mb-1">Cantidad: {item.quantity}</p>
                      <button
                        className="btn btn-link p-0"
                        onClick={() => handleViewProduct(item.id)}
                      >
                        Ver producto
                      </button>
                      <button
                        className="btn btn-link text-danger p-0 ms-3"
                        onClick={() => handleRemoveItem(index)}
                      >
                        Eliminar
                      </button>
                    </div>
                    <div className="ms-auto" id="precio">
                      <h5 className="mb-0">
                        ${(item.price * item.quantity).toFixed(2)}
                      </h5>
                    </div>
                  </div>
                </div>
              ))
            )}
            <div className="alert alert-warning" role="alert">
              <small>Asegúrate de revisar tu pedido antes de comprar.</small>
            </div>
          </div>
          <div className="col-md-4">
            <div>
              <div className="card-body">
                <h3 className="card-title">Resumen</h3>
                <p className="card-text">
                  Subtotal <span className="float-end">${getTotalPrice()}</span>
                </p>
                <p className="card-text">
                  Gastos de envío y gestión estimados{" "}
                  <span className="float-end">Gratis</span>
                </p>
                <h4 className="card-text">
                  Total <span className="float-end">${getTotalPrice()}</span>
                </h4>
                <button
                  className="btn btn-dark btn-block mb-2"
                  onClick={handleComprar}
                >
                  Ir al pago
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carrito;
