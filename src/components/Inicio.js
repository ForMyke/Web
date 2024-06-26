import React, { useEffect, useState } from "react";
import axios from "axios";
import { Carousel, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/inicio.css";

const Inicio = ({ isDarkMode }) => {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Juan Pérez",
      review: "Excelente servicio y productos de alta calidad.",
    },
    {
      id: 2,
      name: "Ana García",
      review: "Muy contenta con mi compra, definitivamente volveré a comprar.",
    },
    {
      id: 3,
      name: "Carlos López",
      review: "Rápido envío y atención al cliente impecable.",
    },
  ]);

  const [timeLeft, setTimeLeft] = useState(() => {
    const savedTime = localStorage.getItem("flashSaleTime");
    return savedTime ? parseInt(savedTime) : 7 * 24 * 60 * 60;
  });

  const navigate = useNavigate();

  useEffect(() => {
    const category = "laptops";
    axios
      .get(`http://localhost/backend/api/products.php?category=${category}`)
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 0) {
          clearInterval(countdownInterval);
          return 0;
        }
        const newTimeLeft = prevTimeLeft - 1;
        localStorage.setItem("flashSaleTime", newTimeLeft);
        return newTimeLeft;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  const formatTime = (seconds) => {
    const days = Math.floor(seconds / (24 * 3600));
    const hours = Math.floor((seconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${days.toString().padStart(2, "0")}:${hours
      .toString()
      .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleProductClick = (productId) => {
    navigate(`/productos/${productId}`);
  };

  return (
    <div className={`inicio-container ${isDarkMode ? "dark-mode" : ""}`}>
      <Alert
        variant={isDarkMode ? "dark" : "light"}
        className="text-center mb-0"
      >
        Unete y se parte de la familia Xclusive Store
      </Alert>
      <div
        className={`flash-sale ${isDarkMode ? "bg-light text-dark" : "bg-dark text-white"} text-center py-2`}
      >
        <h2 className="mb-0">Descuentos en todas nuestras áreas</h2>
        <p className="mb-0">¡No te lo pierdas! {formatTime(timeLeft)}</p>
      </div>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./img/img1.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <div className="caption-box">
              <h3>Tecnología unica</h3>
              <p>A la vanguardia con la tecnología</p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./img/img2.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
            <div className="caption-box">
              <h3>Tecnología 2024</h3>
              <button
                className="btn btn-dark"
                onClick={() => navigate("/productos")}
              >
                Comprar ahora
              </button>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./img/img3.jpg"
            alt="Third slide"
          />
          <Carousel.Caption>
            <div className="caption-box">
              <h3>Los mejores gadgets</h3>
              <p>Samsung Galaxy Watch</p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <div className="product-section text-center my-5">
        <h2>CLÁSICOS EN TENDENCIA</h2>
        <div className="product-carousel d-flex justify-content-center">
          {products.map((product) => (
            <div
              className="product-card mx-2"
              key={product.id}
              onClick={() => handleProductClick(product.id)}
              style={{ cursor: "pointer" }} // Estilo opcional para indicar que es clickeable
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="product-image"
              />
              <h5 className="product-title">{product.title}</h5>
            </div>
          ))}
        </div>
      </div>

      <div className="reviews-section text-center my-5">
        <h2>Opiniones de los clientes</h2>
        <div className="reviews-container">
          {reviews.map((review) => (
            <div className="review-card" key={review.id}>
              <h5 className="reviewer-name">{review.name}</h5>
              <p className="review-text">"{review.review}"</p>
            </div>
          ))}
        </div>
      </div>

      <div className="store-visit-section d-flex justify-content-around align-items-center py-5">
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3760.857272087078!2d-99.1487033!3d19.5047755!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f94c06d75fd7%3A0x3fe1567da2190ac9!2sESCOM%20-%20Escuela%20Superior%20de%20C%C3%B3mputo%20-%20IPN!5e0!3m2!1ses-419!2smx!4v1717204480754!5m2!1ses-419!2smx"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="store-info">
          <h2>Herramientas revolucionarias para mejorar tu rutina</h2>
          <p>
            Nuestra gama de productos tecnológicos tiene como objetivo agilizar
            sus tareas diarias y aumentar la productividad.
          </p>
          <h3>Tecnología que se adapta a tu estilo de vida</h3>
          <ul>
            <li>Haz que cada tarea sea más sencilla y rápida.</li>
            <li>Mantente a la vanguardia con la tecnología.</li>
            <li>Mejore su productividad hoy mismo.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
