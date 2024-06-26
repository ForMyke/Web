import React from "react";
import "../css/contacto.css";

const Contacto = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center">CONTACTO - XCLUSIVE STORE</h1>
      <p>
        Si tienes alguna pregunta, comentario o necesitas asistencia, no dudes
        en ponerte en contacto con nosotros. Estamos aquí para ayudarte.
      </p>
      <h2>Información de Contacto</h2>
      <p>
        <strong>Correo Electrónico:</strong> support@xclusivestore.com
        <br />
        <strong>Teléfono:</strong> 1-800-555-1234
        <br />
        <strong>Horario de Atención:</strong> Lunes a Viernes, de 9:00 AM a 6:00
        PM
      </p>
      <h2>Visítanos en Nuestra Sucursal</h2>
      <p>
        Si prefieres una atención personalizada, puedes visitarnos en nuestra
        sucursal:
      </p>
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
        Si necesitas más información, no dudes en visitarnos en nuestra sucursal
        o contactarnos a través de los medios mencionados anteriormente. Estamos
        aquí para ayudarte.
      </p>
    </div>
  );
};

export default Contacto;
