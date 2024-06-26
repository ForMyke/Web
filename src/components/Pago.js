import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/pago.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import JustValidate from "just-validate";
import { jsPDF } from "jspdf";

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

        const fetchData = async () => {
          try {
            const response = await fetch(
              "https://localhost/backend/api/sesion.php",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: userEmail }),
              }
            );

            const data = await response.json();

            if (data.success) {
              setUser(data.user);
            } else {
              setError(
                "Error al obtener los datos del usuario: " + data.message
              );
            }
          } catch (error) {
            setError(
              "Error al obtener los datos del usuario: " + error.message
            );
          } finally {
            setLoading(false);
          }
        };

        fetchData();
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
    if (!loading && formRef.current) {
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
          {
            rule: "number",
            errorMessage: "El código postal debe ser numérico",
          },
        ])
        .addField("#cardNumber", [
          {
            rule: "required",
            errorMessage: "El número de tarjeta es obligatorio",
          },
          {
            rule: "number",
            errorMessage: "El número de tarjeta debe ser numérico",
          },
          {
            rule: "minLength",
            value: 16,
            errorMessage: "El número de tarjeta debe tener 16 dígitos",
          },
          {
            rule: "maxLength",
            value: 16,
            errorMessage: "El número de tarjeta debe tener 16 dígitos",
          },
        ])
        .addField("#cardExpiry", [
          {
            rule: "required",
            errorMessage: "La fecha de vencimiento es obligatoria",
          },
          {
            rule: "customRegexp",
            value: /^(0[1-9]|1[0-2])\/\d{2}$/,
            errorMessage:
              "La fecha de vencimiento debe estar en el formato MM/AA",
          },
        ])
        .addField("#cardCSC", [
          { rule: "required", errorMessage: "El CVV es obligatorio" },
          { rule: "number", errorMessage: "El CVV debe ser numérico" },
          {
            rule: "minLength",
            value: 3,
            errorMessage: "El CVV debe tener 3 dígitos",
          },
          {
            rule: "maxLength",
            value: 3,
            errorMessage: "El CVV debe tener 3 dígitos",
          },
        ])
        .addField("#cardHolderName", [
          {
            rule: "required",
            errorMessage: "El nombre del titular es obligatorio",
          },
        ])
        .addField("#cardHolderSurname", [
          {
            rule: "required",
            errorMessage: "El apellido del titular es obligatorio",
          },
        ])
        .addField("#terms", [
          {
            rule: "required",
            errorMessage: "Debe aceptar los términos y condiciones",
          },
        ])
        .onSuccess(async (event) => {
          event.preventDefault();

          if (isSubmitting) return;
          setIsSubmitting(true);

          const correo = user.correo;
          const productos = cartItems.map((item) => ({
            id: item.id,
            titulo: item.title,
            cantidad: item.quantity,
          }));
          const total = parseFloat(getTotalPrice()) + getShippingCost();

          try {
            const response = await fetch(
              "https://localhost/backend/api/comprar.php",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ correo, productos, total }),
              }
            );

            const responseText = await response.text();
            let data;
            try {
              data = JSON.parse(responseText);
            } catch (e) {
              throw new Error(`Error parsing JSON: ${responseText}`);
            }

            if (data.error) {
              let redirectPath = "/";
              if (data.error === "Saldo insuficiente") {
                redirectPath = "/perfil";
              } else {
                redirectPath = "/carrito";
              }

              Swal.fire({
                icon: "error",
                title: "Error",
                text: data.error,
              }).then(() => {
                navigate(redirectPath);
              });
            } else {
              Swal.fire({
                icon: "success",
                title: "Compra Realizada",
                text: "Su compra se realizó con éxito",
              }).then(() => {
                generatePDF();
                navigate("../");
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

  const generatePDF = () => {
    const doc = new jsPDF();
    const date = new Date();
    const oneDayLater = new Date();
    oneDayLater.setDate(date.getDate() + 1);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    const formattedArrivalDate = `${oneDayLater.getDate()}/${oneDayLater.getMonth() + 1}/${oneDayLater.getFullYear()}`;

    doc.setFontSize(18);
    doc.text("Xclusive Store", 105, 20, { align: "center" });
    doc.setFontSize(12);
    doc.text("Xclusive Store S.A. de C.V.", 105, 30, { align: "center" });
    doc.text("RFC: HAM111006K69", 105, 40, { align: "center" });
    doc.text(
      "Unidad Profesional Adolfo López Mateos, Av. Juan de Dios Bátiz",
      105,
      50,
      { align: "center" }
    );
    doc.text("Nueva Industrial Vallejo, Gustavo A. Madero", 105, 60, {
      align: "center",
    });
    doc.text("C.P. 07320 Ciudad de México, CDMX", 105, 70, { align: "center" });
    doc.text("Tel. 1-800-555-1234", 105, 80, { align: "center" });
    doc.text("----------------------------------------", 105, 90, {
      align: "center",
    });
    doc.text("Fecha y hora de compra", 105, 100, { align: "center" });
    doc.text("----------------------------------------", 105, 110, {
      align: "center",
    });
    doc.text(formattedDate, 105, 120, { align: "center" });

    const startY = 130;
    let currentY = startY;

    cartItems.forEach((item) => {
      doc.text(
        `${item.title} (Cantidad: ${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`,
        105,
        currentY,
        { align: "center" }
      );
      currentY += 10;
    });

    const shippingCost = getShippingCost();
    const totalPrice = (parseFloat(getTotalPrice()) + shippingCost).toFixed(2);
    currentY += 10;
    doc.text(
      `Gastos de envío: ${shippingCost === 0 ? "GRATIS" : `$${shippingCost}`}`,
      105,
      currentY,
      { align: "center" }
    );
    currentY += 10;
    doc.text(`Total: $${totalPrice}`, 105, currentY, { align: "center" });

    currentY += 20;
    doc.text(`Num. Tarj. xxxxxx******xxxx`, 105, currentY, { align: "center" });
    currentY += 10;
    doc.text(`Núm. Seguimiento 72057-0-09342`, 105, currentY, {
      align: "center",
    });
    currentY += 10;
    doc.text(`Autorización 614751`, 105, currentY, { align: "center" });

    currentY += 10;
    doc.text("----------------------------------------", 105, currentY, {
      align: "center",
    });
    currentY += 10;
    doc.text(
      `Llegará el ${formattedArrivalDate} a la dirección:`,
      105,
      currentY,
      { align: "center" }
    );
    currentY += 10;
    doc.text(
      `${formRef.current.street.value} ${formRef.current.extNumber.value}.`,
      105,
      currentY,
      { align: "center" }
    );
    currentY += 10;
    doc.text(
      `${formRef.current.colony.value}, ${formRef.current.state.value}.`,
      105,
      currentY,
      { align: "center" }
    );
    currentY += 10;
    doc.text(`C.P. ${formRef.current.postalCode.value}`, 105, currentY, {
      align: "center",
    });

    currentY += 20;
    doc.text("----------------------------------------", 105, currentY, {
      align: "center",
    });
    currentY += 10;
    doc.text("No. de Folio: 0001122403088558", 105, currentY, {
      align: "center",
    });

    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(5);
    doc.rect(10, 10, 190, currentY + 10, "S");

    doc.save("recibo_compra.pdf");
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
                <strong>Correo electrónico: </strong>
                {user.correo}
              </p>
              <p className="card-text">
                <strong>Nombre: </strong>
                {user.nombre}
              </p>
              <p className="card-text">
                <strong>Apellido: </strong>
                {user.apellidos}
              </p>
              <p className="card-text">
                <strong>Saldo disponible: </strong>
                {user.saldo}
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
                <button
                  type="submit"
                  className="btn btn-dark w-100"
                  disabled={isSubmitting}
                >
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
                <span
                  className="float-right"
                  style={{ color: shippingCost === 0 ? "green" : "black" }}
                >
                  {shippingCost === 0 ? "GRATIS" : `$${shippingCost}`}
                </span>
              </p>
              <h5>
                Total <span className="float-right">${totalPrice}</span>
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
