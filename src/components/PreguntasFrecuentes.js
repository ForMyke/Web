import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/preguntasfrecuentes.css";

const PreguntasFrecuentes = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <h1 className="text-center">PREGUNTAS FRECUENTES - XCLUSIVE STORE</h1>
      <p>
        En esta sección encontrarás respuestas a las preguntas más frecuentes de
        nuestros clientes. Si tienes alguna otra pregunta, no dudes en
        contactarnos.
      </p>
      <ul>
        <li>
          <a href="#envios">¿Cuánto tiempo tarda el envío?</a>
        </li>
        <li>
          <a href="#devoluciones">¿Cómo puedo realizar una devolución?</a>
        </li>
        <li>
          <a href="#pagos">¿Qué métodos de pago aceptan?</a>
        </li>
        <li>
          <a href="#cuentas">¿Necesito crear una cuenta para comprar?</a>
        </li>
        <li>
          <a href="#soporte">¿Cómo puedo contactar al soporte al cliente?</a>
        </li>
        <li>
          <a href="#sucursal">¿Dónde se encuentra su sucursal?</a>
        </li>
      </ul>
      <h2 id="envios">¿Cuánto tiempo tarda el envío?</h2>
      <p>
        El tiempo de envío varía según tu ubicación y el método de envío
        seleccionado. Generalmente, los envíos locales tardan de 3 a 5 días
        hábiles, mientras que los envíos internacionales pueden tardar de 7 a 15
        días hábiles.
      </p>
      <h2 id="devoluciones">¿Cómo puedo realizar una devolución?</h2>
      <p>
        Si no estás satisfecho con tu compra, puedes devolver los productos
        dentro del plazo especificado para recibir un reembolso completo. Por
        favor, consulta nuestra política de devoluciones para más detalles.
      </p>
      <h2 id="pagos">¿Qué métodos de pago aceptan?</h2>
      <p>
        Aceptamos varios métodos de pago seguros, incluyendo tarjetas de
        crédito, débito, PayPal y transferencias bancarias.
      </p>
      <h2 id="cuentas">¿Necesito crear una cuenta para comprar?</h2>
      <p>
        No es necesario crear una cuenta para realizar una compra. Sin embargo,
        tener una cuenta te permite realizar un seguimiento de tus pedidos y
        guardar tu información de envío para futuras compras.
      </p>
      <h2 id="soporte">¿Cómo puedo contactar al soporte al cliente?</h2>
      <p>
        Puedes contactar a nuestro equipo de soporte al cliente a través de
        nuestra página de contacto o llamando al 1-800-555-1234. Estamos aquí
        para ayudarte con cualquier consulta que puedas tener.
      </p>
      <h2 id="sucursal">¿Dónde se encuentra su sucursal?</h2>
      <p>Nuestra sucursal se encuentra en la siguiente dirección:</p>
      <p>
        <strong>Escuela Superior de Cómputo - IPN</strong>
        <br />
        Av. Juan de Dios Bátiz, Esq. Miguel Othón de Mendizábal, Col.
        Lindavista,
        <br />
        Gustavo A. Madero, Ciudad de México, CP 07738
      </p>
      <div className="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3760.857272087078!2d-99.1487033!3d19.5047755!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f94c06d75fd7%3A0x3fe1567da2190ac9!2sESCOM%20-%20Escuela%20Superior%20de%20C%C3%B3mputo%20-%20IPN!5e0!3m2!1ses-419!2smx!4v1717204480754!5m2!1ses-419!2smx"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <p className="mt-4">
        Si tienes más dudas, puedes visitar nuestro módulo de{" "}
        <a href="#" onClick={() => navigate("/servicioCliente")}>
          Servicio al Cliente
        </a>
        . Estaremos encantados de ayudarte.
      </p>
    </div>
  );
};

export default PreguntasFrecuentes;
