import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { jwtDecode } from "jwt-decode";

const AdminProductos = () => {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [productoActual, setProductoActual] = useState(null);
  const [modoAgregar, setModoAgregar] = useState(false);
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
    // Fetch products from API or backend
    axios.get("http://localhost/backend/api/products.php").then((response) => {
      setProductos(response.data);
    });
  }, []);

  const handleBusquedaChange = (e) => {
    setBusqueda(e.target.value);
  };

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
    if (!producto.title || !producto.category || !producto.price) {
      alert("Todos los campos son obligatorios");
      return;
    }

    if (modoAgregar) {
      axios
        .post("http://localhost/backend/api/products.php", producto)
        .then((response) => {
          setProductos([...productos, response.data]);
        })
        .catch((error) => {
          console.error("Error adding product:", error);
        });
    } else {
      axios
        .put(`http://localhost/backend/api/products.php?id=${producto.id}`, producto)
        .then((response) => {
          setProductos(
            productos.map((p) => (p.id === producto.id ? producto : p))
          );
        })
        .catch((error) => {
          console.error("Error updating product:", error);
        });
    }
    setProductoActual(null);
    setModoAgregar(false);
  };

  const handleAdminNavigation = () => {
    navigate("/admin");
  };

  const productosFiltrados = productos.filter(
    (producto) => producto.title && producto.title.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <div className="header d-flex justify-content-between align-items-center py-3 mb-4">
        <h1 className="fs-1">Admin Productos</h1>
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
            onClick={handleEliminarProducto}
          >
            Eliminar Productos Seleccionado
          </button>
          <button className="btn btn-dark mb-3" onClick={handleAgregarProducto}>
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
                      className="btn btn-outline-dark"
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
            required
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
            required
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
            required
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
        <button type="submit" className="btn btn-outline-dark">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default AdminProductos;