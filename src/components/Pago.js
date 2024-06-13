import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/pago.css";

const Pago = () => {
  return (
    <div className="container mt-5 mb-5">
      <h2 className="text-center mb-4">Proceso de compra</h2>
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Mi información</h4>
              <p>Correo electrónico: golomian712@hotmail.com</p>
              <form>
                <div className="form-group mb-3">
                  <label>Contraseña *</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Contraseña"
                    required
                  />
                  <small>8 caracteres 1 minúscula 1 mayúscula 1 número</small>
                </div>
                <div className="form-row mb-3">
                  <div className="form-group col-md-6">
                    <label>Nombre *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nombre"
                      required
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Apellido *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Apellido"
                      required
                    />
                  </div>
                </div>
                <div className="form-group mb-3">
                  <label>Fecha de nacimiento *</label>
                  <input type="date" className="form-control" required />
                </div>
                <div className="form-group mb-3">
                  <label>
                    <input type="checkbox" /> Agregar número de teléfono
                    (opcional)
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Número de teléfono"
                  />
                </div>
                <div className="form-group mb-3">
                  <label>País</label>
                  <p>México</p>
                </div>
                <div className="form-group mb-3">
                  <label>
                    <input type="checkbox" /> Sí, me gustaría suscribirme al
                    Fashion News.
                  </label>
                </div>
                <div className="form-group mb-3">
                  <label>
                    <input type="checkbox" required /> Al continuar, aceptas los{" "}
                    <a href="#">Términos y Condiciones Generales</a> y el{" "}
                    <a href="#">Aviso de Privacidad</a>.
                  </label>
                </div>
                <button type="submit" className="btn btn-dark w-100">
                  Guardar
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Resumen</h4>
              <p>
                Valor del pedido <span className="float-right">$499.00</span>
              </p>
              <p>
                Envío <span className="float-right">$90.00</span>
              </p>
              <h5>
                Total <span className="float-right">$589.00</span>
              </h5>
              <button className="btn btn-secondary w-100 mt-3 mb-2">
                Ya casi ha terminado
              </button>
              <p>
                Atención al cliente ¿Necesitas ayuda? Contacto:{" "}
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
