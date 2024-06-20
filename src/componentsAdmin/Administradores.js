import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Administradores = () => {
  const [administradores, setAdministradores] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [administradoresSeleccionados, setAdministradoresSeleccionados] =
    useState([]);
  const [adminActual, setAdminActual] = useState(null);
  const [modoAgregar, setModoAgregar] = useState(false);
  /*
  useEffect(() => {
    axios.get("http://localhost/backend/api/admins.php").then((response) => {
      setAdministradores(response.data.admins);
    });
  }, []);
  */

  const handleBusquedaChange = (e) => {
    setBusqueda(e.target.value);
  };

  const handleCheckboxChange = (e, adminId) => {
    if (e.target.checked) {
      setAdministradoresSeleccionados([
        ...administradoresSeleccionados,
        adminId,
      ]);
    } else {
      setAdministradoresSeleccionados(
        administradoresSeleccionados.filter((id) => id !== adminId)
      );
    }
  };

  const handleEditarAdmin = (admin) => {
    setAdminActual(admin);
    setModoAgregar(false);
  };

  const handleEliminarAdmin = () => {
    // Lógica para eliminar los administradores seleccionados
    setAdministradores(
      administradores.filter(
        (admin) => !administradoresSeleccionados.includes(admin.id)
      )
    );
    setAdministradoresSeleccionados([]);
  };

  const handleAgregarAdmin = () => {
    setAdminActual(null);
    setModoAgregar(true);
  };

  const handleGuardarAdmin = (admin) => {
    if (modoAgregar) {
      setAdministradores([...administradores, admin]);
    } else {
      setAdministradores(
        administradores.map((a) => (a.id === admin.id ? admin : a))
      );
    }
    setAdminActual(null);
    setModoAgregar(false);
  };

  const administradoresFiltrados = administradores.filter((admin) =>
    admin.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h1>Página de Administradores</h1>
      <div className="row">
        <div className="col-md-4">
          <h3>Acciones</h3>
          <button
            className="btn btn-secondary mb-3"
            onClick={handleEliminarAdmin}
          >
            Eliminar Administradores Seleccionados
          </button>
          <button className="btn btn-primary mb-3" onClick={handleAgregarAdmin}>
            Agregar Administrador
          </button>

          {(adminActual || modoAgregar) && (
            <EditarAgregarAdmin
              admin={adminActual}
              onGuardar={handleGuardarAdmin}
            />
          )}
        </div>
        <div className="col-md-8">
          <h3>Lista de Administradores</h3>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Buscar administradores..."
            value={busqueda}
            onChange={handleBusquedaChange}
          />
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Seleccionar</th>
                <th scope="col">Nombre</th>
                <th scope="col">Email</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {administradoresFiltrados.map((admin) => (
                <tr key={admin.id}>
                  <td>
                    <input
                      type="checkbox"
                      onChange={(e) => handleCheckboxChange(e, admin.id)}
                    />
                  </td>
                  <td>{admin.name}</td>
                  <td>{admin.email}</td>
                  <td>
                    <button
                      className="btn btn-info"
                      onClick={() => handleEditarAdmin(admin)}
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const EditarAgregarAdmin = ({ admin, onGuardar }) => {
  const [adminEditado, setAdminEditado] = useState(
    admin || {
      id: Math.random().toString(36).substr(2, 9),
      name: "",
      email: "",
      password: "",
    }
  );

  const handleChange = (e) => {
    setAdminEditado({
      ...adminEditado,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar(adminEditado);
  };

  return (
    <div>
      <h3>{admin ? "Editar Administrador" : "Agregar Administrador"}</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={adminEditado.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={adminEditado.email}
            onChange={handleChange}
          />
        </div>
        {!admin && (
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={adminEditado.password}
              onChange={handleChange}
            />
          </div>
        )}
        <button type="submit" className="btn btn-success">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default Administradores;
