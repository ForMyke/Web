import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import "../css/contraseña.css";
import { Link } from "react-router-dom";

const PasswordLogin = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email: "golomian16@hotmail.com",
      password: password,
    };

    try {
      const response = await axios.post("Server_Name", formData);

      if (response.data.success) {
        window.location.href = "/Admin";
      } else {
        alert("Error: " + response.data.message);
      }
    } catch (error) {
      alert("Hubo un problema al iniciar sesión. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="password-login-container d-flex flex-column align-items-center justify-content-center vh-100">
      <div className="logo mb-4">
        <img src="./img/logo.png" alt="Xclusive Store" className="logo me-2" />
      </div>
      <h2>¿Cuál es tu contraseña?</h2>
      <p className="mb-3">
        golomian16@hotmail.com <a href="#">Editar</a>
      </p>
      <Form onSubmit={handleSubmit} className="w-50">
        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <div className="password-input-container">
            <Form.Control
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <span className="password-toggle" onClick={toggleShowPassword}>
              <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
            </span>
          </div>
        </Form.Group>
        <Button variant="dark" type="submit" className="w-100 mb-3">
          Iniciar sesión
        </Button>
        <div className="text-center">
          <Link to="/forgot-password" className="text-dark">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default PasswordLogin;
