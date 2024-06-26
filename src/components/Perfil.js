import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/perfil.css";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Perfil = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener el token JWT desde el almacenamiento local
    const token = localStorage.getItem("token");

    if (token) {
      try {
        // Decodificar el token JWT para obtener el correo del usuario
        const decoded = jwtDecode(token);
        console.log("Token decodificado:", decoded); // Verifica el contenido del token decodificado
        const userEmail = decoded.correo;

        fetch("https://localhost/backend/api/sesion.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: userEmail }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              setUser(data.user);
            } else {
              setError(
                "Error al obtener los datos del usuario: " + data.message
              );
            }
          })
          .catch((error) => {
            setError(
              "Error al obtener los datos del usuario: " + error.message
            );
          })
          .finally(() => {
            setLoading(false);
          });
      } catch (e) {
        setError("Token inválido.");
        setLoading(false);
      }
    } else {
      setLoading(false);
      navigate("/login");
    }
  }, []);

  const handleLogout = () => {
    // Lógica para cerrar sesión
    localStorage.removeItem("token");
    console.log("Cerrar sesión");
    navigate("/login");
  };

  const handleViewPurchases = () => {
    // Lógica para ver compras realizadas
    console.log("Ver compras realizadas");
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>No has iniciado sesión.</div>;
  }

  return (
    <div className="container mt-5 perfil-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Mi perfil</h1>
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
          <br></br>
          <p className="card-text">
            <strong>Correo electrónico: </strong>
            {user.correo}
          </p>
          <p className="card-text">
            <strong>Nombre: </strong>
            {user.nombre}
          </p>
          <p className="card-text">
            <strong>Apellido: </strong>
            {user.apellidos}
          </p>
          <p className="card-text">
            <strong>Fecha de nacimiento: </strong>
            {user.fechaNac}
          </p>
          <p className="card-text">
            <strong>Preferencia de compras: </strong>
            {user.preferencia}
          </p>
          <p className="card-text">
            <strong>Saldo: </strong>
            {user.saldo}
          </p>
        </div>
      </div>

      <div className=" mb-4">
        <div className="card-body">
          <h5 className="card-title">Dirección </h5>
          <p className="card-text">
            {user.calle} {user.numCalle}, {user.colonia}. {user.municipio},{" "}
            {user.estado}. C.P. {user.CP}
          </p>
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
        <button className="btn mt-5 btn-outline-dark" onClick={handleLogout}>
          Eliminar Cuenta
        </button>
      </div>
    </div>
  );
};

const App = () => <Perfil />;

export default App;
