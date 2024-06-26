import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [usuariosSeleccionados, setUsuariosSeleccionados] = useState([]);
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [modoAgregar, setModoAgregar] = useState(false);

  useEffect(() => {
    fetch("http://localhost/backend/api/usuarios.php")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setUsuarios(data.users);
        } else {
          console.error("Error fetching users:", data.message);
        }
      })
      .catch((error) => console.error("Error:", error));
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
    setUsuarioActual(usuario);
    setModoAgregar(false);
  };

  const handleEliminarUsuario = () => {
    setUsuarios(
      usuarios.filter((usuario) => !usuariosSeleccionados.includes(usuario.id))
    );
    setUsuariosSeleccionados([]);
  };

  const handleAgregarUsuario = () => {
    setUsuarioActual(null);
    setModoAgregar(true);
  };

  const handleGuardarUsuario = (usuario) => {
    if (modoAgregar) {
      setUsuarios([...usuarios, usuario]);
    } else {
      setUsuarios(usuarios.map((u) => (u.id === usuario.id ? usuario : u)));
    }
    setUsuarioActual(null);
    setModoAgregar(false);
  };

  const usuariosFiltrados = usuarios.filter((usuario) =>
    usuario.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h1>Admin Usuarios</h1>
      <div className="row">
        <div className="col-md-4">
          <h3>Acciones</h3>
          <button
            className="btn btn-secondary mb-3"
            onClick={handleEliminarUsuario}
          >
            Eliminar Usuarios Seleccionados
          </button>
          <button
            className="btn btn-primary mb-3"
            onClick={handleAgregarUsuario}
          >
            Agregar Usuario
          </button>

          {(usuarioActual || modoAgregar) && (
            <EditarAgregarUsuario
              usuario={usuarioActual}
              onGuardar={handleGuardarUsuario}
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
          <div className="table-responsive">
            <table className="table table-bordered w-100">
              <thead>
                <tr>
                  <th scope="col">Seleccionar</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Apellidos</th>
                  <th scope="col">Correo</th>
                  <th scope="col">Tipo</th>
                  <th scope="col">Estado</th>
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
                    <td>{usuario.type}</td>
                    <td>{usuario.state}</td>
                    <td>
                      <button
                        className="btn btn-info"
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
    </div>
  );
};

const EditarAgregarUsuario = ({ usuario, onGuardar }) => {
  const [usuarioEditado, setUsuarioEditado] = useState(
    usuario || {
      id: Math.random().toString(36).substr(2, 9),
      type: "0",
      name: "",
      surname: "",
      email: "",
      password: "",
      birthDate: "",
      state: "",
      municipality: "",
      colony: "",
      street: "",
      streetNumber: ""
    }
  );

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
      <h3>{usuario ? "Editar Usuario" : "Agregar Usuario"}</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="type" className="form-label">
            Tipo
          </label>
          <select
            className="form-control"
            id="type"
            name="type"
            value={usuarioEditado.type}
            onChange={handleChange}
          >
            <option value="0">0</option>
            <option value="1">1</option>
          </select>
        </div>
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
        {!usuario && (
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
        <button type="submit" className="btn btn-success">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default AdminUsuarios;
