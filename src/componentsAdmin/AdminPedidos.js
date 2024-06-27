import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { jwtDecode } from "jwt-decode";

const AdminPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
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
    axios
      .get("http://localhost/backend/api/pedidos.php")
      .then((response) => {
        setPedidos(response.data.pedidos);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  const handleBusquedaChange = (e) => {
    setBusqueda(e.target.value);
  };

  const pedidosFiltrados = pedidos.filter((pedido) =>
    pedido.email.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Agrupar pedidos por venta_id
  const pedidosAgrupados = pedidosFiltrados.reduce((acc, pedido) => {
    if (!acc[pedido.venta_id]) {
      acc[pedido.venta_id] = [];
    }
    acc[pedido.venta_id].push(pedido);
    return acc;
  }, {});

  return (
    <div className="container mt-5">
      <h1>Administrar Pedidos</h1>
      <div className="row">
        <div className="col-md-12">
          <h3>Lista de Pedidos</h3>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Buscar por email de usuario..."
            value={busqueda}
            onChange={handleBusquedaChange}
          />
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Email del Usuario</th>
                <th scope="col">Fecha del Pedido</th>
                <th scope="col">Dirección de Entrega</th>
                <th scope="col">Título del Producto</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Precio</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(pedidosAgrupados).map((venta_id) => {
                const grupoPedidos = pedidosAgrupados[venta_id];
                return (
                  <React.Fragment key={venta_id}>
                    {grupoPedidos.map((pedido, index) => (
                      <tr key={pedido.id}>
                        {index === 0 && (
                          <>
                            <td rowSpan={grupoPedidos.length}>
                              {pedido.email}
                            </td>
                            <td rowSpan={grupoPedidos.length}>
                              {pedido.fecha}
                            </td>
                            <td rowSpan={grupoPedidos.length}>
                              {`${pedido.calle} ${pedido.numero}, ${pedido.colonia}, ${pedido.estado}. C.P. ${pedido.CP}`}
                            </td>
                          </>
                        )}
                        <td>{pedido.productTitle}</td>
                        <td>{pedido.quantity}</td>
                        <td>{pedido.price}</td>
                        {index === 0 && (
                          <td rowSpan={grupoPedidos.length}>{pedido.total}</td>
                        )}
                      </tr>
                    ))}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPedidos;
