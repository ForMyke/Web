import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";
import "../css/paginaProducto.css";

const ProductDetails = ({ products, addToCart }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const product = products?.find(
    (product) => product.id === parseInt(productId)
  );

  const [mainImage, setMainImage] = useState(product?.thumbnail || "");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      setMainImage(product.thumbnail);
    }
  }, [product]);

  if (!product) {
    return <div className="text-center mt-5">Producto no encontrado</div>;
  }

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  const handleQuantityChange = (value) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    const productToAdd = {
      ...product,
      quantity,
    };
    addToCart(productToAdd);
    navigate("/carrito");
  };

  return (
    <div className="product-details-container container">
      <div className="row">
        <div className="col-md-6">
          <div className="product-images">
            <Carousel>
              {product.images.map((image, index) => (
                <Carousel.Item key={index}>
                  <img
                    src={image}
                    className="d-block w-100"
                    alt={`${product.title} ${index + 1}`}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
            <div className="product-thumbnails mt-3 d-flex justify-content-around">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  className="img-thumbnail"
                  style={{ width: "20%", cursor: "pointer" }}
                  onClick={() => handleThumbnailClick(image)}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <h2>${product.price}</h2>
          <h4>Marca: {product.brand}</h4>
          <p>Stock: {product.stock}</p>
          <p>Descuento: {product.discountPercentage}%</p>
          <div className="product-rating">
            <span>Rating: {product.rating}</span>
            <span className="ms-2">Categoría: {product.category}</span>
          </div>
          <div className="product-options mt-3"></div>
          <div className="product-quantity mt-3">
            <label>Cantidad</label>
            <div className="quantity-control d-flex align-items-center">
              <button
                className="btn btn-outline-dark"
                onClick={() => handleQuantityChange(quantity - 1)}
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                min="1"
                className="form-control text-center mx-2"
                style={{ width: "60px" }}
                onChange={(e) => handleQuantityChange(Number(e.target.value))}
              />
              <button
                className="btn btn-outline-dark"
                onClick={() => handleQuantityChange(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>
          <button className="btn btn-dark mt-3" onClick={handleAddToCart}>
            Agregar al carrito
          </button>
        </div>
      </div>
      <div className="product-info-tabs mt-5">
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="characteristics-tab"
              data-bs-toggle="tab"
              data-bs-target="#characteristics"
              type="button"
              role="tab"
              aria-controls="characteristics"
              aria-selected="true"
            >
              Características
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="reviews-tab"
              data-bs-toggle="tab"
              data-bs-target="#reviews"
              type="button"
              role="tab"
              aria-controls="reviews"
              aria-selected="false"
            >
              Reseñas
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="shipping-tab"
              data-bs-toggle="tab"
              data-bs-target="#shipping"
              type="button"
              role="tab"
              aria-controls="shipping"
              aria-selected="false"
            >
              Envío
            </button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="characteristics"
            role="tabpanel"
            aria-labelledby="characteristics-tab"
          >
            <h3>Características</h3>
            <ul>
              <li>Marca: {product.brand}</li>
              <li>Precio: ${product.price}</li>
              <li>Stock: {product.stock}</li>
              <li>Descuento: {product.discountPercentage}%</li>
              <li>Rating: {product.rating}</li>
              <li>Categoría: {product.category}</li>
            </ul>
          </div>
          <div
            className="tab-pane fade"
            id="reviews"
            role="tabpanel"
            aria-labelledby="reviews-tab"
          >
            <h3>Reseñas</h3>
            {/* Aquí colocar las reseñas de usuarios */}
            {product.reviews.map((review, index) => (
              <div key={index} className="review-item">
                <p>
                  <strong>{review.reviewerName}</strong>: {review.comment}
                </p>
                <p>
                  Rating: {review.rating} - {review.date}
                </p>
              </div>
            ))}
          </div>
          <div
            className="tab-pane fade"
            id="shipping"
            role="tabpanel"
            aria-labelledby="shipping-tab"
          >
            <h3>Envío</h3>
            {/* Aquí colocar información de envío */}
            <p>{product.shippingInformation}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
