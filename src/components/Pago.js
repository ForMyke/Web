import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/pago.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import JustValidate from "just-validate";

const Pago = ({ cartItems }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const formRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const userEmail = decoded.correo;

        fetch("https://localhost/backend/api/sesion.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: userEmail }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              setUser(data.user);
            } else {
              setError("Error al obtener los datos del usuario: " + data.message);
            }
          })
          .catch((error) => {
            setError("Error al obtener los datos del usuario: " + error.message);
          })
          .finally(() => {
            setLoading(false);
          });
      } catch (e) {
        setError("Token inválido.");
        setLoading(false);
      }
    } else {
      setLoading(false);
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (formRef.current) {
      const validation = new JustValidate(formRef.current);

      validation
        .addField("#street", [
          { rule: "required", errorMessage: "La calle es obligatoria" },
        ])
        .addField("#extNumber", [
          { rule: "required", errorMessage: "El número es obligatorio" },
        ])
        .addField("#colony", [
          { rule: "required", errorMessage: "La colonia es obligatoria" },
        ])
        .addField("#municipality", [
          { rule: "required", errorMessage: "El municipio es obligatorio" },
        ])
        .addField("#state", [
          { rule: "required", errorMessage: "El estado es obligatorio" },
        ])
        .addField("#postalCode", [
          { rule: "required", errorMessage: "El código postal es obligatorio" },
          { rule: "number", errorMessage: "El código postal debe ser numérico" },
        ])
        .addField("#cardNumber", [
          { rule: "required", errorMessage: "El número de tarjeta es obligatorio" },
          { rule: "number", errorMessage: "El número de tarjeta debe ser numérico" },
          { rule: "minLength", value: 16, errorMessage: "El número de tarjeta debe tener 16 dígitos" },
          { rule: "maxLength", value: 16, errorMessage: "El número de tarjeta debe tener 16 dígitos" },
        ])
        .addField("#cardExpiry", [
          { rule: "required", errorMessage: "La fecha de vencimiento es obligatoria" },
          { rule: "customRegexp", value: /^(0[1-9]|1[0-2])\/\d{2}$/, errorMessage: "La fecha de vencimiento debe estar en el formato MM/AA" },
        ])
        .addField("#cardCSC", [
          { rule: "required", errorMessage: "El CVV es obligatorio" },
          { rule: "number", errorMessage: "El CVV debe ser numérico" },
          { rule: "minLength", value: 3, errorMessage: "El CVV debe tener 3 dígitos" },
          { rule: "maxLength", value: 3, errorMessage: "El CVV debe tener 3 dígitos" },
        ])
        .addField("#cardHolderName", [
          { rule: "required", errorMessage: "El nombre del titular es obligatorio" },
        ])
        .addField("#cardHolderSurname", [
          { rule: "required", errorMessage: "El apellido del titular es obligatorio" },
        ])
        .addField("#terms", [
          { rule: "required", errorMessage: "Debe aceptar los términos y condiciones" },
        ])
        .onSuccess(async (event) => {
          event.preventDefault();
          
          if (isSubmitting) return;
          setIsSubmitting(true);

          const correo = user.correo;
          const productos = cartItems.map(item => ({
            id: item.id,
            titulo: item.title,
            cantidad: item.quantity
          }));
          const total = parseFloat(getTotalPrice()) + getShippingCost();

          try {
            const response = await fetch("https://localhost/backend/api/comprar.php", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ correo, productos, total })
            });

            const responseText = await response.text(); // Obtener el texto de respuesta para depuración
            let data;
            try {
              data = JSON.parse(responseText); // Intentar parsear el texto a JSON
            } catch (e) {
              throw new Error(`Error parsing JSON: ${responseText}`); // Si falla, lanzar un error con el texto de respuesta
            }

            if (data.error) {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: data.error,
              });
            } else {
              Swal.fire({
                icon: "success",
                title: "Compra Realizada",
                text: "Su compra se realizó con éxito",
              });
            }
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: error.message,
            });
          } finally {
            setIsSubmitting(false);
          }
        });
    }
  }, [loading, cartItems, user, isSubmitting]);

  const getTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const getShippingCost = () => {
    const subtotal = parseFloat(getTotalPrice());
    return subtotal < 100 ? 20 : 0;
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const shippingCost = getShippingCost();
  const totalPrice = (parseFloat(getTotalPrice()) + shippingCost).toFixed(2);

  return (
    <div className="container mt-5 mb-5">
      <h2 className="text-center mb-4">Proceso de compra</h2>
      <div className="row">
        <div className="col-md-8">
          <div className="mb-3">
            <div className="card-body">
              <h4 className="card-title">1 Identificación</h4>
              <p className="card-text">
                <strong>Correo electrónico: </strong>{user.correo}
              </p>
              <p className="card-text">
                <strong>Nombre: </strong>{user.nombre}
              </p>
              <p className="card-text">
                <strong>Apellido: </strong>{user.apellidos}
              </p>
              <p className="card-text">
                <strong>Saldo disponible: </strong>{user.saldo}
              </p>
            </div>
          </div>
          <div className="mb-3">
            <div className="card-body">
              <h4 className="card-title">2 Envío</h4>
              <form ref={formRef}>
                <div className="form-group mb-3">
                  <label>Calle</label>
                  <input
                    type="text"
                    className="form-control"
                    id="street"
                    defaultValue={user.calle}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Número</label>
                  <input
                    type="text"
                    className="form-control"
                    id="extNumber"
                    defaultValue={user.numCalle}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Colonia</label>
                  <input
                    type="text"
                    className="form-control"
                    id="colony"
                    defaultValue={user.colonia}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Municipio</label>
                  <input
                    type="text"
                    className="form-control"
                    id="municipality"
                    defaultValue={user.municipio}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Estado</label>
                  <input
                    type="text"
                    className="form-control"
                    id="state"
                    defaultValue={user.estado}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Código Postal</label>
                  <input
                    type="text"
                    className="form-control"
                    id="postalCode"
                    defaultValue={user.CP}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Número de tarjeta *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cardNumber"
                    placeholder="Número de tarjeta"
                    required
                  />
                </div>
                <div className="form-row mb-3">
                  <div className="form-group col-md-6">
                    <label>Nombre del titular *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="cardHolderName"
                      placeholder="Nombre del titular"
                      required
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Apellidos *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="cardHolderSurname"
                      placeholder="Apellidos"
                      required
                    />
                  </div>
                </div>
                <div className="form-row mb-3">
                  <div className="form-group col-md-6">
                    <label>Vence el *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="cardExpiry"
                      placeholder="MM/AA"
                      required
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>CVV *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="cardCSC"
                      placeholder="3 dígitos"
                      required
                    />
                  </div>
                </div>
                <div className="form-group mb-3">
                  <label>
                    <input type="checkbox" /> Deseo recibir información
                    importante, ofertas especiales y descuentos de PayPal.
                  </label>
                </div>
                <div className="form-group mb-3">
                  <label>
                    <input type="checkbox" id="terms" required /> He leído el{" "}
                    <a href="#">Aviso de Privacidad</a>
                  </label>
                </div>
                <button type="submit" className="btn btn-dark w-100" disabled={isSubmitting}>
                  {isSubmitting ? "Procesando..." : "Comprar ahora"}
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div>
            <div className="card-body">
              <h4 className="card-title">Resumen de la compra</h4>
              {cartItems.map((item, index) => (
                <p key={index}>
                  {item.title} ({item.quantity}){" "}
                  <span className="float-right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </p>
              ))}
              <hr />
              <p>
                Subtotal <span className="float-right">${getTotalPrice()}</span>
              </p>
              <p>
                Gastos de envío{" "}
                <span className="float-right" style={{ color: shippingCost === 0 ? 'green' : 'black' }}>
                  {shippingCost === 0 ? 'GRATIS' : `$${shippingCost}`}
                </span>
              </p>
              <h5>
                Total{" "}
                <span className="float-right">
                  ${totalPrice}
                </span>
              </h5>
              <hr />
              <p>
                ¿Necesitas ayuda? Contacta con nuestro{" "}
                <a href="#">Servicio de Atención al Cliente</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pago;
