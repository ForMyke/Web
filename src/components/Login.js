import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/login.css";
import JustValidate from "just-validate";

const Login = () => {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  useEffect(() => {
    const validation = new JustValidate('#login-form');

    validation
      .addField('#email', [
        {
          rule: 'required',
          errorMessage: 'El correo electrónico es obligatorio',
        },
        {
          rule: 'email',
          errorMessage: 'El correo electrónico no es válido',
        },
      ])
      .addField('#terms', [
        {
          rule: 'required',
          errorMessage: 'Debe aceptar los términos y condiciones',
        },
      ])
      .onSuccess((event) => {
        event.preventDefault();
        const formData = new FormData(formRef.current);
        const email = formData.get('email');
        
        if (showPasswordInput) {
          const password = formData.get('password');
          console.log('Contraseña enviada:', password);
          fetch('https://localhost/backend/api/contrasena.php', {
            method: 'POST',
            body: JSON.stringify({ email, contrasena: password }),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(response => response.json())
          .then(data => {
            if (data.success) {
              window.location.href = "./registro?email=" + email;
            } else {
              alert('Contraseña incorrecta.');
            }
          })
          .catch(error => {
            console.error('Error:', error);
          });
        } else {
          fetch('https://localhost/backend/api/login.php', {
            method: 'POST',
            body: JSON.stringify({ email }),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(response => response.json())
          .then(data => {
            if (data.exists) {
              setShowPasswordInput(true);
            } else {
              window.location.href = "./registro?email=" + email;
            }
          })
          .catch(error => {
            console.error('Error:', error);
          });
        }
      });
  }, [navigate, showPasswordInput]);

  return (
    <div className="login-container d-flex flex-column justify-content-center align-items-center vh-100">
      <img
        src="./img/logo.png"
        alt="Xclusive Store Logo"
        className="logo mb-5"
      />
      <h2 className="text-center mt-5 mb-5">
        Introduce tu dirección de correo electrónico para unirte o iniciar
        sesión.
      </h2>
      <form ref={formRef} id="login-form" className="login-form w-50">
        <div className="form-group mt-4 mb-3">
          <label htmlFor="email" className="sr-only">
            Correo electrónico
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="email"
            placeholder="Correo electrónico"
            required
          />
        </div>
        {showPasswordInput && (
          <div className="form-group mt-4 mb-3">
            <label htmlFor="password" className="sr-only">
              Contraseña
            </label>
            <input
              //type="password"
              name="password"
              className="form-control"
              id="password"
              placeholder="Contraseña"
              required
            />
          </div>
        )}
        <div className="form-group form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="terms"
            required
          />
          <label className="form-check-label" htmlFor="terms">
            Al continuar, acepto la{" "}
            <a href="#" className="text-decoration-none">
              Política de privacidad
            </a>{" "}
            y los{" "}
            <a href="#" className="text-decoration-none">
              Términos de uso
            </a>{" "}
            de Xclusive Store.
          </label>
        </div>
        <button type="submit" className="btn btn-dark btn-block w-100">
          Continuar
        </button>
      </form>
    </div>
  );
};

export default Login;
