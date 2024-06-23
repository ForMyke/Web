import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faInstagram,
  faTwitter,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const navigate = useNavigate();

  const handleNavLinkClick = (url) => {
    window.location.href = url;
  };

  return (
    <footer className="footer-container bg-light text-dark py-4 mt-auto w-100">
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
                <span
                  className="text-dark nav-link cursor-pointer"
                  onClick={() => handleNavLinkClick("/acerca-de")}
                >
                  Acerca de
                </span>
              </li>
              <li>
                <span
                  className="text-dark nav-link cursor-pointer"
                  onClick={() => handleNavLinkClick("/servicioCliente")}
                >
                  Servicio al Cliente
                </span>
              </li>
            </ul>
          </div>
          <div className="col-12 col-md-2 mb-3">
            <h6 className="font-weight-bold">Legal</h6>
            <ul className="list-unstyled">
              <li>
                <span
                  className="text-dark nav-link cursor-pointer"
                  onClick={() => handleNavLinkClick("/privacidad")}
                >
                  Privacidad
                </span>
              </li>
              <li>
                <span
                  className="text-dark nav-link cursor-pointer"
                  onClick={() => handleNavLinkClick("/seguridad")}
                >
                  Seguridad
                </span>
              </li>
              <li>
                <span
                  className="text-dark nav-link cursor-pointer"
                  onClick={() => handleNavLinkClick("/letra-chica")}
                >
                  Letra chica
                </span>
              </li>
            </ul>
          </div>
          <div className="col-12 col-md-2 mb-3">
            <h6 className="font-weight-bold">Ayuda</h6>
            <ul className="list-unstyled">
              <li>
                <span
                  className="text-dark nav-link cursor-pointer"
                  onClick={() => handleNavLinkClick("/preguntas-frecuentes")}
                >
                  Preguntas más frecuentes
                </span>
              </li>
              <li>
                <span
                  className="text-dark nav-link cursor-pointer"
                  onClick={() => handleNavLinkClick("/contacto")}
                >
                  Contacto
                </span>
              </li>
            </ul>
          </div>
          <div className="col-12 col-md-3 mb-3">
            <h6 className="font-weight-bold">Contact us</h6>
            <p>support@xclusivestore.com</p>
            <p>1-800-555-1234</p>
            <div>
              <a href="https://instagram.com" className="text-dark me-2">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="https://twitter.com" className="text-dark me-2">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="https://facebook.com" className="text-dark me-2">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a
                href="https://github.com/ForMyke/Web/tree/master"
                className="text-dark me-2"
              >
                <FontAwesomeIcon icon={faGithub} />
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
