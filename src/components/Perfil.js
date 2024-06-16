import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/perfil.css";

const Perfil = ({ user }) => {
  const handleLogout = () => {
    // Lógica para cerrar sesión
    console.log("Cerrar sesión");
  };

  const handleViewPurchases = () => {
    // Lógica para ver compras realizadas
    console.log("Ver compras realizadas");
  };

  return (
    <div className="container mt-5 perfil-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Mi perfil</h2>
        <div>
          <button
            className="btn btn-outline-dark me-2"
            onClick={handleViewPurchases}
          >
            Ver Compras
          </button>
        </div>
      </div>

      <div className=" mb-4">
        <div className="card-body">
          <h5 className="card-title">Mi información </h5>
          <p className="card-text">
            <strong>Correo electrónico: </strong>
            {user.email}
          </p>
          <p className="card-text">
            <strong>Nombre: </strong>
            {user.firstName}
          </p>
          <p className="card-text">
            <strong>Apellido: </strong>
            {user.lastName}
          </p>
          <p className="card-text">
            <strong>Fecha de nacimiento: </strong>
            {user.birthDate}
          </p>
          <p className="card-text">
            <strong>Número de teléfono: </strong>
            {user.phoneNumber}
          </p>
          <p className="card-text">
            <strong>Género: </strong>
            {user.gender}
          </p>
          <p className="card-text">
            <strong>País: </strong>
            {user.country}
          </p>
          <p className="card-text">
            <strong>Staff Card: </strong>
            {user.staffCard}
          </p>
        </div>
      </div>

      <div className=" mb-4">
        <div className="card-body">
          <h5 className="card-title">Configuración de pago </h5>
          <p className="card-text">
            No hay ninguna tarjeta guardada actualmente. Puedes agregar nuevos
            métodos de pago durante el proceso de compra.
          </p>
        </div>
      </div>

      <div className=" mb-4">
        <div className="card-body">
          <h5 className="card-title">Dirección </h5>
          <p className="card-text">
            También puedes agregar y editar tus direcciones de entrega aquí
          </p>
          <p className="card-text">No se guardó tu domicilio.</p>
        </div>
      </div>

      <div className=" mb-4">
        <div className="card-body">
          <h5 className="card-title">Privacidad</h5>
          <p className="card-text">
            <a href="#">Cambiar contraseña</a>
          </p>
          <p className="card-text">
            <a href="#">Ir a Mi portal de privacidad</a>
          </p>
        </div>
        <button className="btn mt-5 btn-outline-dark" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

// Ejemplo de datos de usuario
const user = {
  email: "golomian16@hotmail.com",
  firstName: "Nombre",
  lastName: "Apellido",
  birthDate: "19/10/2003",
  phoneNumber: "Número de teléfono",
  gender: "Género",
  country: "México",
  staffCard: "Staff Card",
};

const App = () => <Perfil user={user} />;

export default App;
