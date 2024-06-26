import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const AdminProductos = () => {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [productoActual, setProductoActual] = useState(null);
  const [modoAgregar, setModoAgregar] = useState(false);

  useEffect(() => {
    // Fetch products from API or backend
    axios.get("http://localhost/backend/api/products.php").then((response) => {
      setProductos(response.data);
    });
  }, []);

  const handleBusquedaChange = (e) => {
    setBusqueda(e.target.value);
  };

  const navigate = useNavigate();

  const handleCheckboxChange = (e, productoId) => {
    if (e.target.checked) {
      setProductosSeleccionados([...productosSeleccionados, productoId]);
    } else {
      setProductosSeleccionados(
        productosSeleccionados.filter((id) => id !== productoId)
      );
    }
  };

  const handleEditarProducto = (producto) => {
    setProductoActual(producto);
    setModoAgregar(false);
  };

  const handleEliminarProducto = () => {
    // Logic to delete selected products
    setProductos(
      productos.filter(
        (producto) => !productosSeleccionados.includes(producto.id)
      )
    );
    setProductosSeleccionados([]);
  };

  const handleAgregarProducto = () => {
    setProductoActual(null);
    setModoAgregar(true);
  };

  const handleGuardarProducto = (producto) => {
    if (modoAgregar) {
      setProductos([...productos, producto]);
    } else {
      setProductos(productos.map((p) => (p.id === producto.id ? producto : p)));
    }
    setProductoActual(null);
    setModoAgregar(false);
  };

  const productosFiltrados = productos.filter((producto) =>
    producto.title.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h1 className="text-center mb-5">Productos</h1>
        <button className="btn btn-dark" onClick={() => navigate("/admin")}>
          <FontAwesomeIcon icon={faArrowLeft} className="me-2" /> Volver
        </button>
      </div>
      <h1>Admin Productos</h1>
      <div>
        <div className="d-flex flex-column w-100">
          <button
            className="btn btn-primary  mb-3"
            onClick={handleEliminarProducto}
          >
            Eliminar Productos Seleccionado
          </button>
          <button
            className="btn btn-secondary mb-3"
            onClick={handleAgregarProducto}
          >
            Agregar Producto
          </button>

          {(productoActual || modoAgregar) && (
            <EditarAgregarProducto
              producto={productoActual}
              onGuardar={handleGuardarProducto}
            />
          )}
        </div>
        <div className="col-md-12">
          <h3>Lista de Productos</h3>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Buscar productos..."
            value={busqueda}
            onChange={handleBusquedaChange}
          />
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Seleccionar</th>
                <th scope="col">Producto</th>
                <th scope="col">Categoría</th>
                <th scope="col">Precio</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productosFiltrados.map((producto) => (
                <tr key={producto.id}>
                  <td>
                    <input
                      type="checkbox"
                      onChange={(e) => handleCheckboxChange(e, producto.id)}
                    />
                  </td>
                  <td>{producto.title}</td>
                  <td>{producto.category}</td>
                  <td>${producto.price}</td>
                  <td>
                    <button
                      className="btn btn-info"
                      onClick={() => handleEditarProducto(producto)}
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

const EditarAgregarProducto = ({ producto, onGuardar }) => {
  const [productoEditado, setProductoEditado] = useState(
    producto || {
      id: Math.random().toString(36).substr(2, 9),
      title: "",
      category: "",
      price: "",
      description: "",
      thumbnail: "",
    }
  );

  const handleChange = (e) => {
    setProductoEditado({
      ...productoEditado,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar(productoEditado);
  };

  return (
    <div>
      <h3>{producto ? "Editar Producto" : "Agregar Producto"}</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Título
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={productoEditado.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Categoría
          </label>
          <input
            type="text"
            className="form-control"
            id="category"
            name="category"
            value={productoEditado.category}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Precio
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={productoEditado.price}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Descripción
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={productoEditado.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="thumbnail" className="form-label">
            URL de la Imagen
          </label>
          <input
            type="text"
            className="form-control"
            id="thumbnail"
            name="thumbnail"
            value={productoEditado.thumbnail}
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

export default AdminProductos;
