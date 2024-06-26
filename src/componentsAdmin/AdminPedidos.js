import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const AdminPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [pedidosSeleccionados, setPedidosSeleccionados] = useState([]);
  const [pedidoActual, setPedidoActual] = useState(null);
  const [modoAgregar, setModoAgregar] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   axios.get("http://localhost/backend/api/orders.php").then((response) => {
  //     setPedidos(response.data.orders);
  //   });
  // }, []);

  const handleBusquedaChange = (e) => {
    setBusqueda(e.target.value);
  };

  const handleCheckboxChange = (e, pedidoId) => {
    if (e.target.checked) {
      setPedidosSeleccionados([...pedidosSeleccionados, pedidoId]);
    } else {
      setPedidosSeleccionados(
        pedidosSeleccionados.filter((id) => id !== pedidoId)
      );
    }
  };

  const handleEditarPedido = (pedido) => {
    setPedidoActual(pedido);
    setModoAgregar(false);
  };

  const handleEliminarPedidos = () => {
    setPedidos(
      pedidos.filter((pedido) => !pedidosSeleccionados.includes(pedido.id))
    );
    setPedidosSeleccionados([]);
  };

  const handleAgregarPedido = () => {
    setPedidoActual(null);
    setModoAgregar(true);
  };

  const handleGuardarPedido = (pedido) => {
    if (modoAgregar) {
      setPedidos([...pedidos, pedido]);
    } else {
      setPedidos(pedidos.map((p) => (p.id === pedido.id ? pedido : p)));
    }
    setPedidoActual(null);
    setModoAgregar(false);
  };

  const pedidosFiltrados = pedidos.filter((pedido) =>
    pedido.producto.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h1 className="text-center mb-5">Gráficas</h1>
        <button className="btn btn-dark" onClick={() => navigate("/admin")}>
          <FontAwesomeIcon icon={faArrowLeft} className="me-2" /> Volver
        </button>
      </div>
      <h1>Admin Pedidos</h1>
      <div className="row">
        <div className="col-md-4">
          <h3>Acciones</h3>
          <button
            className="btn btn-secondary mb-3"
            onClick={handleEliminarPedidos}
          >
            Eliminar Pedidos Seleccionados
          </button>
          <button
            className="btn btn-primary mb-3"
            onClick={handleAgregarPedido}
          >
            Agregar Pedido
          </button>

          {(pedidoActual || modoAgregar) && (
            <EditarAgregarPedido
              pedido={pedidoActual}
              onGuardar={handleGuardarPedido}
            />
          )}
        </div>
        <div className="col-md-8">
          <h3>Lista de Pedidos</h3>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Buscar pedidos..."
            value={busqueda}
            onChange={handleBusquedaChange}
          />
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Seleccionar</th>
                <th scope="col">Producto</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pedidosFiltrados.map((pedido) => (
                <tr key={pedido.id}>
                  <td>
                    <input
                      type="checkbox"
                      onChange={(e) => handleCheckboxChange(e, pedido.id)}
                    />
                  </td>
                  <td>{pedido.producto}</td>
                  <td>{pedido.cantidad}</td>
                  <td>
                    <button
                      className="btn btn-info"
                      onClick={() => handleEditarPedido(pedido)}
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

const EditarAgregarPedido = ({ pedido, onGuardar }) => {
  const [pedidoEditado, setPedidoEditado] = useState(
    pedido || {
      id: Math.random().toString(36).substr(2, 9),
      producto: "",
      cantidad: "",
    }
  );

  const handleChange = (e) => {
    setPedidoEditado({
      ...pedidoEditado,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar(pedidoEditado);
  };

  return (
    <div>
      <h3>{pedido ? "Editar Pedido" : "Agregar Pedido"}</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="producto" className="form-label">
            Producto
          </label>
          <input
            type="text"
            className="form-control"
            id="producto"
            name="producto"
            value={pedidoEditado.producto}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cantidad" className="form-label">
            Cantidad
          </label>
          <input
            type="number"
            className="form-control"
            id="cantidad"
            name="cantidad"
            value={pedidoEditado.cantidad}
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

export default AdminPedidos;
