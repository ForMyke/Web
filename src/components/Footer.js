import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer className="bg-light text-dark py-4 mt-auto">
      <div className="container">
        <div className="row">
          <div className="col-md-3 mb-3">
            <h5 className="font-weight-bold">Tienda Xclusive</h5>
            <p>Descubre ofertas exclusivas todos los días</p>
            <button className="btn btn-dark">COMPRAR AHORA</button>
          </div>
          <div className="col-md-2 mb-3">
            <h6 className="font-weight-bold">Compañía</h6>
            <ul className="list-unstyled">
              <li>
                <a href="/acerca-de" className="text-dark">
                  Acerca de
                </a>
              </li>
              <li>
                <a href="/blog" className="text-dark">
                  Blog
                </a>
              </li>
              <li>
                <a href="/equipo" className="text-dark">
                  Equipo
                </a>
              </li>
              <li>
                <a href="/carreras" className="text-dark">
                  Carreras
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-2 mb-3">
            <h6 className="font-weight-bold">Legal</h6>
            <ul className="list-unstyled">
              <li>
                <a href="/privacidad" className="text-dark">
                  Privacidad
                </a>
              </li>
              <li>
                <a href="/galletas" className="text-dark">
                  Galletas
                </a>
              </li>
              <li>
                <a href="/seguridad" className="text-dark">
                  Seguridad
                </a>
              </li>
              <li>
                <a href="/letra-chica" className="text-dark">
                  Letra chica
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-2 mb-3">
            <h6 className="font-weight-bold">Ayuda</h6>
            <ul className="list-unstyled">
              <li>
                <a href="/preguntas-frecuentes" className="text-dark">
                  Preguntas más frecuentes
                </a>
              </li>
              <li>
                <a href="/naviero" className="text-dark">
                  Naviero
                </a>
              </li>
              <li>
                <a href="/contacto" className="text-dark">
                  Contacto
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-3 mb-3">
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
