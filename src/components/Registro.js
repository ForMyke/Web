import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Col, Row } from "react-bootstrap";
import "../css/registro.css";

const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    preferencia: "",
    nacimiento: "",
    terminos: false, // Cambiado a booleano
  });

  const [errors, setError] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value, // Maneja el checkbox correctamente
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    const validateRequiredField = (fieldName, errorMessage) => {
      if (!formData[fieldName]) {
        validationErrors[fieldName] = errorMessage;
      } else if (formData[fieldName].trim && !formData[fieldName].trim()) {
        validationErrors[fieldName] = errorMessage;
      }
    };

    validateRequiredField("nombre", "Este campo es obligatorio");
    if (
      formData.nombre.trim() &&
      (formData.nombre.length < 2 ||
        !/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/.test(formData.nombre))
    ) {
      validationErrors.nombre = "Nombre inválido";
    }

    validateRequiredField("apellido", "Este campo es obligatorio");
    if (
      formData.apellido.trim() &&
      (formData.apellido.length < 2 ||
        !/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/.test(formData.apellido))
    ) {
      validationErrors.apellido = "Apellido inválido";
    }

    validateRequiredField("email", "Este campo es obligatorio");
    if (
      formData.email.trim() &&
      !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
        formData.email
      )
    ) {
      validationErrors.email = "Ingrese un correo electrónico válido";
    }

    validateRequiredField("password", "Este campo es obligatorio");
    if (
      formData.password.trim() &&
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(formData.password)
    ) {
      validationErrors.password = "Ingrese una contraseña válida";
    }

    validateRequiredField("preferencia", "Por favor seleccione una opción");

    validateRequiredField(
      "nacimiento",
      "Por favor ingrese su fecha de nacimiento"
    );
    if (formData.nacimiento) {
      const today = new Date();
      const birthDate = new Date(formData.nacimiento);
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      if (birthDate > today) {
        validationErrors.nacimiento =
          "Por favor ingrese una fecha de nacimiento valida";
      }
    }

    if (!formData.terminos) {
      validationErrors.terminos = "Debe aceptar los Términos y Condiciones";
    }

    setError(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      alert("Formulario Enviado");
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <h2 className="text-center">Vamos a hacerte Nike Member.</h2>
      <p className="text-center">
        Hemos enviado un código a <strong>golomian72@hotmail.com</strong>{" "}
        <a href="#">Editar</a>
      </p>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Código*</Form.Label>
          <Form.Control type="text" placeholder="Código" />
          <Form.Text className="text-muted">
            Volver a enviar el código en 23 s
          </Form.Text>
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Nombre*</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="nombre"
              type="text"
              placeholder="Nombre"
            />
            {errors.nombre && (
              <span className="error-message">{errors.nombre}</span>
            )}
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Apellidos*</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="apellido"
              type="text"
              placeholder="Apellidos"
            />
            {errors.apellido && (
              <span className="error-message">{errors.apellido}</span>
            )}
          </Form.Group>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>Correo</Form.Label>
          <Form.Control
            onChange={handleChange}
            name="email"
            type="correo"
            placeholder="Correo"
          />
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Correo</Form.Label>
          <Form.Control type="correo" placeholder="Correo" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Contraseña*</Form.Label>
          <Form.Control
            onChange={handleChange}
            name="password"
            type="password"
            placeholder="Contraseña"
          />
          {errors.password && (
            <span className="error-message">{errors.password}</span>
          )}
          <Form.Text className="text-muted">
            <ul>
              <li>8 caracteres como mínimo</li>
              <li>Letras mayúsculas, minúsculas y un número</li>
            </ul>
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Preferencia de compra*</Form.Label>
          <Form.Select onChange={handleChange} name="preferencia">
            <option>Elige una opción</option>
            <option>Ropa</option>
            <option>Calzado</option>
            <option>Accesorios</option>
          </Form.Select>
          {errors.preferencia && (
            <span className="error-message">{errors.preferencia}</span>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Fecha de nacimiento*</Form.Label>
          <Form.Control onChange={handleChange} name="nacimiento" type="date" />
          <Form.Text className="text-muted">
            Consigue una recompensa de Nike Member por tu cumpleaños.
          </Form.Text>
          {errors.nacimiento && (
            <span className="error-message">{errors.nacimiento}</span>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox1">
          <Form.Check
            type="checkbox"
            label="Regístrate para recibir correos electrónicos y no perderte las actualizaciones de productos, ofertas y ventajas para Members."
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox2">
          <Form.Check
            type="checkbox"
            name="terminos"
            checked={formData.terminos}
            onChange={handleChange}
            label="Acepto la Política de privacidad y los Términos de uso"
          />
          {errors.terminos && (
            <span className="error-message">{errors.terminos}</span>
          )}
        </Form.Group>

        <Button variant="dark" type="submit" className="w-100">
          Crear una cuenta
        </Button>
      </Form>
    </div>
  );
};

export default Registro;
