import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Tab, Nav } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactImageMagnify from "react-image-magnify";
import "../css/paginaProducto.css"; // Asegúrate de crear y usar este archivo CSS

const ProductDetails = ({ addToCart, isDarkMode }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios
      .get(`http://localhost/backend/api/products.php?id=${productId}`)
      .then((response) => {
        if (response.data.length > 0) {
          const productData = response.data[0];
          setProduct(productData);
          setMainImage(productData.thumbnail);
        } else {
          setProduct(null);
        }
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, [productId]);

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
  };

  return (
    <div
      className={`product-details-container container ${isDarkMode ? "dark-mode" : ""}`}
    >
      <div className="row">
        <div className="col-md-6">
          <div className="product-images">
            <div className="main-image">
              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: product.title,
                    isFluidWidth: true,
                    src: mainImage,
                  },
                  largeImage: {
                    src: mainImage,
                    width: 1200,
                    height: 1800,
                  },
                  enlargedImageContainerStyle: {
                    background: "#fff",
                    zIndex: 9,
                  },
                }}
              />
            </div>
            <div className="thumbnail-images mt-3 d-flex flex-column">
              {product.images &&
                product.images.length > 0 &&
                product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className="img-thumbnail mb-2"
                    style={{ cursor: "pointer", width: "100px" }}
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
          <p>SKU: {product.sku}</p>
          <p>Peso: {product.weight}</p>
          <p>
            Dimensiones: {product.dimensions.width} x{" "}
            {product.dimensions.height} x {product.dimensions.depth}
          </p>
          <p>Información de garantía: {product.warrantyInformation}</p>
          <p>Información de envío: {product.shippingInformation}</p>
          <p>Estado de disponibilidad: {product.availabilityStatus}</p>
          <p>Política de devoluciones: {product.returnPolicy}</p>
          <p>Cantidad mínima de pedido: {product.minimumOrderQuantity}</p>
          <div className="product-rating">
            <span>Rating: {product.rating}</span>
            <span className="ms-2">Categoría: {product.category}</span>
          </div>
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
        <Tab.Container defaultActiveKey="characteristics">
          <Nav variant="tabs">
            <Nav.Item>
              <Nav.Link eventKey="characteristics">Características</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="reviews">Reseñas</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="shipping">Envío</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content className="mt-3">
            <Tab.Pane eventKey="characteristics">
              <h3>Características</h3>
              <ul>
                <li>Marca: {product.brand}</li>
                <li>Precio: ${product.price}</li>
                <li>Stock: {product.stock}</li>
                <li>Descuento: {product.discountPercentage}%</li>
                <li>Rating: {product.rating}</li>
                <li>Categoría: {product.category}</li>
              </ul>
            </Tab.Pane>
            <Tab.Pane eventKey="reviews">
              <h3>Reseñas</h3>
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
            </Tab.Pane>
            <Tab.Pane eventKey="shipping">
              <h3>Envío</h3>
              <p>{product.shippingInformation}</p>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    </div>
  );
};

export default ProductDetails;
