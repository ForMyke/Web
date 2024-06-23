import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/footer.css";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-light text-dark py-4 mt-auto w-100">
      <div className="container-fluid px-5">
        <div className="row justify-content-center">
          <div className="col-md-3 mb-3">
            <h5 className="font-weight-bold">Tienda Xclusive</h5>
            <p>Descubre ofertas exclusivas todos los días</p>
            <button
              className="btn btn-dark"
              onClick={() => navigate("/productos")}
            >
              COMPRAR AHORA
            </button>
          </div>
          <div className="col-12 col-md-2 mb-3">
            <h6 className="font-weight-bold">Compañía</h6>
            <ul className="list-unstyled">
              <li>
                <NavLink to="/acerca-de" className="text-dark nav-link">
                  Acerca de
                </NavLink>
              </li>
              <li>
                <NavLink to="/servicioCliente" className="text-dark nav-link">
                  Servicio al Cliente
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="col-12 col-md-2 mb-3">
            <h6 className="font-weight-bold">Legal</h6>
            <ul className="list-unstyled">
              <li>
                <NavLink to="/privacidad" className="text-dark nav-link">
                  Privacidad
                </NavLink>
              </li>
              <li>
                <NavLink to="/seguridad" className="text-dark nav-link">
                  Seguridad
                </NavLink>
              </li>
              <li>
                <NavLink to="/letra-chica" className="text-dark nav-link">
                  Letra chica
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="col-12 col-md-2 mb-3">
            <h6 className="font-weight-bold">Ayuda</h6>
            <ul className="list-unstyled">
              <li>
                <NavLink
                  to="/preguntas-frecuentes"
                  className="text-dark nav-link"
                >
                  Preguntas más frecuentes
                </NavLink>
              </li>
              <li>
                <NavLink to="/contacto" className="text-dark nav-link">
                  Contacto
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="col-12 col-md-3 mb-3">
            <h6 className="font-weight-bold">Contact us</h6>
            <p>support@xclusivestore.com</p>
            <p>1-800-555-1234</p>
            <div>
              <a href="https://instagram.com" className="text-dark me-2">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://twitter.com" className="text-dark me-2">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://facebook.com" className="text-dark me-2">
                <i className="fab fa-facebook"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="text-center mt-3">
          <p>© 2024 Xclusive Store, ¡amamos a nuestros usuarios!</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
