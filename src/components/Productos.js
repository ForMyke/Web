import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const Productos = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    axios
      .get("http://localhost/backend/api/products.php")
      .then((response) => {
        const sortedProducts = response.data.sort((a, b) => {
          if (a.category === "laptops" && b.category !== "laptops") {
            return -1;
          }
          if (a.category !== "laptops" && b.category === "laptops") {
            return 1;
          }
          return 0;
        });
        setProducts(sortedProducts);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProductClick = (event) => {
    const productCard = event.target.closest(".product-card");
    if (productCard) {
      const productId = productCard.getAttribute("data-id");
      navigate(`/productos/${productId}`);
    }
  };

  return (
    <div className="productos-container">
      <h1 className="text-center mb-4">Xclusive Store</h1>
      <div className="mb-4 d-flex justify-content-center">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="row">
        {filteredProducts.map((product) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-4" key={product.id}>
            <div
              className="card h-100 product-card"
              data-id={product.id}
              onClick={handleProductClick}
              style={{ cursor: "pointer" }}
            >
              <img
                src={product.thumbnail}
                className="card-img-top"
                alt={product.title}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <p className="mt-auto">
                  <span className="badge bg-dark">${product.price}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productos;
