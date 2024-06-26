import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/contraseña.css";

const ForgotPassword = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Inicializar useNavigate

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar la nueva contraseña al servidor
    console.log("Nueva contraseña establecida:", password);

    // Simular una solicitud exitosa y redirigir al Login
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <div className="password-reset-container d-flex flex-column align-items-center justify-content-center vh-100">
      <div className="logo mb-4">
        <img src="./img/logo.png" alt="Xclusive Store" className="logo me-2" />
      </div>
      <h2>Restablecer tu contraseña</h2>
      <p className="mb-3">Introduce tu Nueva Contraseña</p>
      <Form onSubmit={handleSubmit} className="w-50">
        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Nueva Contraseña</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </Form.Group>
        <Button variant="dark" type="submit" className="w-100">
          Restablecer Contraseña
        </Button>
      </Form>
    </div>
  );
};

export default ForgotPassword;
