import React from "react";
import "../css/seguridad.css";

const Seguridad = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center">SEGURIDAD EN XCLUSIVE STORE</h1>
      <p>
        En Xclusive Store, tu seguridad es nuestra prioridad. Nos comprometemos
        a proteger tus datos personales y a proporcionar una experiencia de
        compra segura. A continuación, te explicamos cómo mantenemos tu
        información segura y qué medidas puedes tomar para protegerte mientras
        navegas y compras en nuestra plataforma.
      </p>
      <ul>
        <li>
          <a href="#proteccion-datos">Protección de Datos Personales</a>
        </li>
        <li>
          <a href="#transacciones-seguras">Transacciones Seguras</a>
        </li>
        <li>
          <a href="#prevencion-fraude">Prevención del Fraude</a>
        </li>
        <li>
          <a href="#consejos-seguridad">
            Consejos de Seguridad para los Usuarios
          </a>
        </li>
        <li>
          <a href="#contacto">Contacto para Consultas de Seguridad</a>
        </li>
      </ul>
      <h2 id="proteccion-datos">Protección de Datos Personales</h2>
      <p>
        Implementamos medidas de seguridad técnicas y organizativas para
        proteger tus datos personales contra el acceso no autorizado, la
        alteración, la divulgación o la destrucción. Utilizamos cifrado y otras
        tecnologías para mantener tus datos seguros.
      </p>
      <h2 id="transacciones-seguras">Transacciones Seguras</h2>
      <p>
        Todas las transacciones en nuestro sitio son seguras y están cifradas.
        Trabajamos con proveedores de pago confiables para asegurar que tus
        datos financieros estén protegidos. Siempre verifica que estás en
        nuestro sitio oficial antes de realizar una compra.
      </p>
      <h2 id="prevencion-fraude">Prevención del Fraude</h2>
      <p>
        Monitoreamos continuamente nuestra plataforma para detectar actividades
        fraudulentas. Si identificamos alguna actividad sospechosa, tomamos
        medidas inmediatas para proteger a nuestros usuarios y sus datos.
      </p>
      <h2 id="consejos-seguridad">Consejos de Seguridad para los Usuarios</h2>
      <p>
        Te recomendamos seguir estos consejos para mantenerte seguro en línea:
      </p>
      <ul>
        <li>Usa contraseñas seguras y cámbialas regularmente.</li>
        <li>No compartas tu información de inicio de sesión con nadie.</li>
        <li>
          Verifica siempre que estás en el sitio web oficial de Xclusive Store
          antes de ingresar información personal.
        </li>
        <li>Mantén tu software de seguridad y navegador actualizados.</li>
      </ul>
      <h2 id="contacto">Contacto para Consultas de Seguridad</h2>
      <p>
        Si tienes alguna pregunta o inquietud sobre la seguridad en Xclusive
        Store, no dudes en ponerte en contacto con nosotros. Estamos aquí para
        ayudarte y asegurarnos de que tu experiencia de compra sea segura y
        agradable.
      </p>
    </div>
  );
};

export default Seguridad;
