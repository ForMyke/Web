import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/pago.css";

const Pago = () => {
  return (
    <div className="container mt-5 mb-5">
      <h2 className="text-center mb-4">Proceso de compra</h2>
      <div className="row">
        <div className="col-md-8">
          <div className="card mb-3">
            <div className="card-body">
              <h4 className="card-title">1 Identificación</h4>
              <p>
                Solicitamos únicamente la información esencial para la
                finalización de la compra.
              </p>
              <form>
                <div className="form-group mb-3">
                  <label>Correo *</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Correo"
                    required
                  />
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
                  <label>Teléfono / Móvil *</label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Teléfono / Móvil"
                    required
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="card mb-3">
            <div className="card-body">
              <h4 className="card-title">2 Envío</h4>
              <form>
                <div className="form-group mb-3">
                  <label>Código postal *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Código postal"
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Dirección *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Dirección"
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Número exterior *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Número exterior"
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Número interior</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Número interior"
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Colonia *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Colonia"
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Destinatario *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Destinatario"
                    required
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">3 Pago</h4>
              <form>
                <div className="form-group mb-3">
                  <label>Número de tarjeta *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Número de tarjeta"
                    required
                  />
                </div>
                <div className="form-row mb-3">
                  <div className="form-group col-md-6">
                    <label>Nombre del titular *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nombre del titular"
                      required
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Apellidos *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Apellidos"
                      required
                    />
                  </div>
                </div>
                <div className="form-row mb-3">
                  <div className="form-group col-md-6">
                    <label>Vence el *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="MM/AA"
                      required
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>CSC *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="3 dígitos"
                      required
                    />
                  </div>
                </div>
                <div className="form-group mb-3">
                  <label>
                    <input type="checkbox" /> Deseo recibir información
                    importante, ofertas especiales y descuentos de PayPal.
                  </label>
                </div>
                <div className="form-group mb-3">
                  <label>
                    <input type="checkbox" /> Guardar mi número de tarjeta para
                    la próxima compra en este sitio web.
                  </label>
                </div>
                <div className="form-group mb-3">
                  <label>
                    <input type="checkbox" required /> He leído y acepto la
                    Política de Privacidad de PayPal.
                  </label>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Resumen de la compra</h4>
              <p>
                Producto 1 <span className="float-right">$2,079.20</span>
              </p>
              <hr />
              <p>
                Subtotal <span className="float-right">$2,599.00</span>
              </p>
              <p>
                Descuentos <span className="float-right">-$519.80</span>
              </p>
              <p>
                Gastos del envío <span className="float-right">Gratis</span>
              </p>
              <h5>
                Total <span className="float-right">$2,079.20</span>
              </h5>
              <form className="mt-3">
                <div className="form-group mb-3">
                  <label>Código</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Código"
                  />
                  <button className="btn btn-dark w-100 mt-2">Añadir</button>
                </div>
                <div className="form-group">
                  <label>
                    <input type="checkbox" required /> He leído el{" "}
                    <a href="#">Aviso de Privacidad</a>
                  </label>
                </div>
                <button type="submit" className="btn btn-dark w-100">
                  Comprar ahora
                </button>
              </form>
              <hr />
              <p>
                ¿Necesitas ayuda? Contacta con nuestro{" "}
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
