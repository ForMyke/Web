import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Col, Row } from "react-bootstrap";
import swal from "sweetalert";
import JustValidate from "just-validate";
import { useNavigate } from "react-router-dom";
import "../css/registro.css";

const Registro = () => {
  localStorage.removeItem("token");
  const navigate = useNavigate();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const email = params.get("email") || "";

  const [sessionChecked, setSessionChecked] = useState(false);

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: email,
    contrasena: "",
    preferencia: "",
    nacimiento: "",
    codigoPostal: "",
    estado: "",
    municipio: "",
    colonia: "",
    calle: "",
    numero: "",
    terminos: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  useEffect(() => {
    const validator = new JustValidate("#registroForm");

    validator
      .addField("#nombre", [
        {
          rule: "required",
          errorMessage: "Este campo es obligatorio",
        },
        {
          rule: "minLength",
          value: 2,
          errorMessage: "Nombre inválido",
        },
        {
          rule: "customRegexp",
          value: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/,
          errorMessage: "Nombre inválido",
        },
      ])
      .addField("#apellido", [
        {
          rule: "required",
          errorMessage: "Este campo es obligatorio",
        },
        {
          rule: "minLength",
          value: 2,
          errorMessage: "Apellido inválido",
        },
        {
          rule: "customRegexp",
          value: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/,
          errorMessage: "Apellido inválido",
        },
      ])
      .addField("#email", [
        {
          rule: "required",
          errorMessage: "Este campo es obligatorio",
        },
        {
          rule: "email",
          errorMessage: "Ingrese un correo electrónico válido",
        },
      ])
      .addField("#contrasena", [
        {
          rule: "required",
          errorMessage: "Este campo es obligatorio",
        },
        {
          rule: "password",
          errorMessage: "Ingrese una contraseña válida",
        },
      ])
      .addField("#preferencia", [
        {
          rule: "required",
          errorMessage: "Por favor seleccione una opción",
        },
        {
          validator: (value) => value !== "",
          errorMessage: "Por favor seleccione una opción válida",
        },
      ])
      .addField("#nacimiento", [
        {
          rule: "required",
          errorMessage: "Por favor ingrese su fecha de nacimiento",
        },
        {
          validator: (value) => {
            const today = new Date();
            const birthDate = new Date(value);
            const age = today.getFullYear() - birthDate.getFullYear();
            const monthDifference = today.getMonth() - birthDate.getMonth();
            if (
              monthDifference < 0 ||
              (monthDifference === 0 && today.getDate() < birthDate.getDate())
            ) {
              age--;
            }
            return birthDate <= today;
          },
          errorMessage: "Por favor ingrese una fecha de nacimiento valida",
        },
      ])
      .addField("#codigoPostal", [
        {
          rule: "required",
          errorMessage: "Este campo es obligatorio",
        },
      ])
      .addField("#estado", [
        {
          rule: "required",
          errorMessage: "Este campo es obligatorio",
        },
      ])
      .addField("#municipio", [
        {
          rule: "required",
          errorMessage: "Este campo es obligatorio",
        },
      ])
      .addField("#colonia", [
        {
          rule: "required",
          errorMessage: "Este campo es obligatorio",
        },
      ])
      .addField("#calle", [
        {
          rule: "required",
          errorMessage: "Este campo es obligatorio",
        },
      ])
      .addField("#numero", [
        {
          rule: "required",
          errorMessage: "Este campo es obligatorio",
        },
      ])
      .addField("#terminos", [
        {
          rule: "required",
          errorMessage: "Debe aceptar los Términos y Condiciones",
        },
      ]);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Las validaciones se manejan automáticamente con JustValidate
    const validationErrors = document.querySelector(
      ".just-validate-error-label"
    );
    if (!validationErrors) {
      fetch("https://localhost/backend/api/registro.php", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.error) {
            swal({
              text: result.error,
              icon: "error",
              button: {
                text: "Aceptar",
                className: "btn btn-dark",
              },
            });
          } else if (result.success) {
            swal({
              text: result.success,
              icon: "success",
              button: {
                text: "Aceptar",
                className: "btn btn-dark",
              },
            });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          swal({
            text: "Hubo un error al procesar tu solicitud",
            icon: "error",
            button: {
              text: "Aceptar",
              className: "btn btn-dark",
            },
          });
        });
    }
  };

  return (
    <div className="container mt-5 mb-4">
      <h2 className="text-center">Vamos a hacerte un Xclusive member.</h2>
      <br />
      <Form id="registroForm" onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Nombre*</Form.Label>
            <Form.Control
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Nombre"
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Apellidos*</Form.Label>
            <Form.Control
              type="text"
              id="apellido"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              placeholder="Apellidos"
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Correo*</Form.Label>
          <Form.Control
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Correo"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contraseña*</Form.Label>
          <Form.Control
            id="contrasena"
            type="password"
            name="contrasena"
            value={formData.password}
            onChange={handleChange}
            placeholder="Contraseña"
          />
          <Form.Text className="text-muted">
            <ul>
              <li>8 caracteres como mínimo</li>
              <li>Letras mayúsculas, minúsculas y un número</li>
            </ul>
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Preferencia de compra*</Form.Label>
          <Form.Select
            id="preferencia"
            name="preferencia"
            value={formData.preferencia}
            onChange={handleChange}
          >
            <option value="">Elige una opción</option>
            <option value="Ropa">Ropa</option>
            <option value="Calzado">Calzado</option>
            <option value="Accesorios">Accesorios</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Fecha de nacimiento*</Form.Label>
          <Form.Control
            type="date"
            id="nacimiento"
            name="nacimiento"
            value={formData.nacimiento}
            onChange={handleChange}
          />
          <Form.Text className="text-muted">
            Consigue una recompensa de Xclusive Member por tu cumpleaños.
          </Form.Text>
        </Form.Group>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Codigo Postal</Form.Label>
            <Form.Control
              type="number"
              name="codigoPostal"
              id="codigoPostal"
              value={formData.codigoPostal}
              onChange={handleChange}
              placeholder="Codigo Postal"
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Estado</Form.Label>
            <Form.Control
              type="text"
              name="estado"
              id="estado"
              value={formData.estado}
              onChange={handleChange}
              placeholder="Estado"
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Municipio o Alcaldia</Form.Label>
            <Form.Control
              type="text"
              name="municipio"
              id="municipio"
              value={formData.municipio}
              onChange={handleChange}
              placeholder="Municipio"
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Colonia</Form.Label>
            <Form.Control
              type="text"
              name="colonia"
              id="colonia"
              value={formData.colonia}
              onChange={handleChange}
              placeholder="Colonia"
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Calle</Form.Label>
            <Form.Control
              type="text"
              name="calle"
              id="calle"
              value={formData.calle}
              onChange={handleChange}
              placeholder="Calle"
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Numero</Form.Label>
            <Form.Control
              type="number"
              name="numero"
              id="numero"
              value={formData.numero}
              onChange={handleChange}
              placeholder="Numero"
            />
          </Form.Group>
        </Row>
        <Form.Group className="mb-3" controlId="formBasicCheckbox1">
          <Form.Check
            type="checkbox"
            name="recibirCorreos"
            checked={formData.recibirCorreos}
            onChange={handleChange}
            label="Regístrate para recibir correos electrónicos y no perderte las actualizaciones de productos, ofertas y ventajas para Members."
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox2">
          <Form.Check
            type="checkbox"
            name="terminos"
            id="terminos"
            checked={formData.terminos}
            onChange={handleChange}
            label="Acepto la Política de privacidad y los Términos de uso de Xclusive Store."
          />
        </Form.Group>

        <Button variant="dark" type="submit" className="w-100">
          Crear una cuenta
        </Button>
      </Form>
    </div>
  );
};

export default Registro;
