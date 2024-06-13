import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const Productos = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost/backend/api/products.php")
      .then((response) => {
        console.log(response.data)
        
        setProducts(response.data)
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

  return (
    <div className="container-fluid my-4 flex-grow-1">
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
          <div className="col-12 col-md-6 col-lg-4" key={product.id}>
            <div className="card h-100">
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
