import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { jwtDecode } from "jwt-decode";

const AdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [usuariosSeleccionados, setUsuariosSeleccionados] = useState([]);
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [modoAgregar, setModoAgregar] = useState(false);
  const [modoEditar, setModoEditar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const tipo = decoded.tipo;

      if (tipo !== 1) {
        navigate("../");
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    axios.get("http://localhost/backend/api/usuarios.php").then((response) => {
      setUsuarios(response.data.users);
    });
  }, []);

  const handleBusquedaChange = (e) => {
    setBusqueda(e.target.value);
  };

  const handleCheckboxChange = (e, usuarioId) => {
    if (e.target.checked) {
      setUsuariosSeleccionados([...usuariosSeleccionados, usuarioId]);
    } else {
      setUsuariosSeleccionados(
        usuariosSeleccionados.filter((id) => id !== usuarioId)
      );
    }
  };

  const handleEditarUsuario = (usuario) => {
    axios
      .get(`http://localhost/backend/api/usuarios.php?id=${usuario.id}`)
      .then((response) => {
        setUsuarioActual(response.data.user);
        setModoAgregar(false);
        setModoEditar(true);
      });
  };

  const handleEliminarUsuario = () => {
    axios
      .delete("http://localhost/backend/api/usuarios.php", {
        data: { ids: usuariosSeleccionados },
      })
      .then(() => {
        setUsuarios(
          usuarios.filter(
            (usuario) => !usuariosSeleccionados.includes(usuario.id)
          )
        );
        setUsuariosSeleccionados([]);
      });
  };

  const handleAgregarUsuario = () => {
    setUsuarioActual(null);
    setModoAgregar(true);
    setModoEditar(false);
  };

  const handleGuardarUsuario = (usuario) => {
    console.log("Datos a guardar:", usuario);
    if (modoAgregar) {
      axios
        .post("http://localhost/backend/api/usuarios.php", usuario)
        .then((response) => {
          console.log("Respuesta del servidor (POST):", response.data);
          setUsuarios([...usuarios, { ...usuario, id: response.data.id }]);
        })
        .catch((error) => {
          console.error("Error al agregar usuario:", error);
        });
    } else if (modoEditar) {
      axios
        .put(
          `http://localhost/backend/api/usuarios.php?id=${usuario.id}`,
          usuario
        )
        .then((response) => {
          console.log("Respuesta del servidor (PUT):", response.data);
          setUsuarios(usuarios.map((u) => (u.id === usuario.id ? usuario : u)));
        })
        .catch((error) => {
          console.error("Error al editar usuario:", error);
        });
    }
    setUsuarioActual(null);
    setModoAgregar(false);
    setModoEditar(false);
  };

  const handleAdminNavigation = () => {
    navigate("/admin");
  };

  const usuariosFiltrados = usuarios.filter((usuario) =>
    usuario.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <div className="header d-flex justify-content-between align-items-center py-3 mb-4">
        <h1 className="fs-1">Administrar Usuarios</h1>
        <div>
          <button
            className="btn btn-dark btn-lg"
            onClick={handleAdminNavigation}
          >
            <FontAwesomeIcon icon={faUser} className="me-2" />
            Admin
          </button>
        </div>
      </div>
      <div>
        <div className="d-flex flex-column w-100">
          <button
            className="btn btn-secondary mb-3"
            onClick={handleEliminarUsuario}
          >
            Eliminar Usuarios Seleccionados
          </button>
          <button className="btn btn-dark mb-3" onClick={handleAgregarUsuario}>
            Agregar Usuario
          </button>

          {(usuarioActual || modoAgregar) && (
            <EditarAgregarUsuario
              usuario={usuarioActual}
              onGuardar={handleGuardarUsuario}
              modoAgregar={modoAgregar}
            />
          )}
        </div>
        <div className="col-md-12">
          <h3>Lista de Usuarios</h3>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Buscar usuarios..."
            value={busqueda}
            onChange={handleBusquedaChange}
          />
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Seleccionar</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellidos</th>
                <th scope="col">Correo</th>
                <th scope="col">Estado</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuariosFiltrados.map((usuario) => (
                <tr key={usuario.id}>
                  <td>
                    <input
                      type="checkbox"
                      onChange={(e) => handleCheckboxChange(e, usuario.id)}
                    />
                  </td>
                  <td>{usuario.name}</td>
                  <td>{usuario.surname}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.state}</td>
                  <td>
                    <button
                      className="btn btn-outline-dark"
                      onClick={() => handleEditarUsuario(usuario)}
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

const EditarAgregarUsuario = ({ usuario, onGuardar, modoAgregar }) => {
  const [usuarioEditado, setUsuarioEditado] = useState(
    usuario || {
      id: Math.random().toString(36).substr(2, 9),
      name: "",
      surname: "",
      email: "",
      password: "",
      birthDate: "",
      state: "",
      municipality: "",
      colony: "",
      street: "",
      streetNumber: "",
      postalCode: "",
      preferences: "",
      saldo: 10000,
    }
  );

  useEffect(() => {
    if (usuario) {
      setUsuarioEditado(usuario);
    }
  }, [usuario]);

  const handleChange = (e) => {
    setUsuarioEditado({
      ...usuarioEditado,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar(usuarioEditado);
  };

  return (
    <div>
      <h3>{modoAgregar ? "Agregar Usuario" : "Editar Usuario"}</h3>
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
            value={usuarioEditado.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="surname" className="form-label">
            Apellidos
          </label>
          <input
            type="text"
            className="form-control"
            id="surname"
            name="surname"
            value={usuarioEditado.surname}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Correo
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={usuarioEditado.email}
            onChange={handleChange}
          />
        </div>
        {modoAgregar && (
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={usuarioEditado.password}
              onChange={handleChange}
            />
          </div>
        )}
        {!modoAgregar && (
          <div className="mb-3">
            <label htmlFor="saldo" className="form-label">
              Saldo
            </label>
            <input
              type="number"
              className="form-control"
              id="saldo"
              name="saldo"
              value={usuarioEditado.saldo}
              onChange={handleChange}
            />
          </div>
        )}
        <div className="mb-3">
          <label htmlFor="birthDate" className="form-label">
            Fecha de Nacimiento
          </label>
          <input
            type="date"
            className="form-control"
            id="birthDate"
            name="birthDate"
            value={usuarioEditado.birthDate}
            onChange={handleChange}
          />
        </div>

        {modoAgregar && (
          <>
            <div className="mb-3">
              <label htmlFor="state" className="form-label">
                Estado
              </label>
              <input
                type="text"
                className="form-control"
                id="state"
                name="state"
                value={usuarioEditado.state}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="municipality" className="form-label">
                Municipio
              </label>
              <input
                type="text"
                className="form-control"
                id="municipality"
                name="municipality"
                value={usuarioEditado.municipality}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="colony" className="form-label">
                Colonia
              </label>
              <input
                type="text"
                className="form-control"
                id="colony"
                name="colony"
                value={usuarioEditado.colony}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="street" className="form-label">
                Calle
              </label>
              <input
                type="text"
                className="form-control"
                id="street"
                name="street"
                value={usuarioEditado.street}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="streetNumber" className="form-label">
                Num de Calle
              </label>
              <input
                type="text"
                className="form-control"
                id="streetNumber"
                name="streetNumber"
                value={usuarioEditado.streetNumber}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="postalCode" className="form-label">
                Código Postal
              </label>
              <input
                type="text"
                className="form-control"
                id="postalCode"
                name="postalCode"
                value={usuarioEditado.postalCode}
                onChange={handleChange}
              />
            </div>
          </>
        )}
        <div className="mb-3">
          <label htmlFor="preferences" className="form-label">
            Preferencias
          </label>
          <select
            className="form-control"
            id="preferences"
            name="preferences"
            value={usuarioEditado.preferences}
            onChange={handleChange}
          >
            <option value="">Seleccionar</option>
            <option value="calzado">Calzado</option>
            <option value="ropa">Ropa</option>
            <option value="accesorios">Accesorios</option>
          </select>
        </div>
        <button type="submit" className="btn btn-success">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default AdminUsuarios;
