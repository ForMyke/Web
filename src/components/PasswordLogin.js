import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import "../css/contraseña.css";

const PasswordLogin = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="password-login-container d-flex flex-column align-items-center justify-content-center vh-100">
      <div className="logo-container mb-4">
        <img src="./img/nike-logo.png" alt="Nike Logo" className="logo me-2" />
        <img src="./img/jordan-logo.png" alt="Jordan Logo" className="logo" />
      </div>
      <h2>¿Cuál es tu contraseña?</h2>
      <p className="mb-3">
        golomian16@hotmail.com <a href="#">Editar</a>
      </p>
      <Form className="w-50">
        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Contraseña*</Form.Label>
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
        <Form.Text className="mb-3">
          <a href="#">¿Has olvidado la contraseña?</a>
        </Form.Text>
        <Button variant="dark" type="submit" className="w-100">
          Iniciar sesión
        </Button>
      </Form>
    </div>
  );
};

export default PasswordLogin;
