import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/inicio.css";
import { Carousel, Alert } from "react-bootstrap";

const Inicio = () => {
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
    const startTime = new Date();
    const endTime = new Date(
      startTime.getTime() +
        7 * 24 * 60 * 60 * 1000 +
        7 * 60 * 60 * 1000 +
        30 * 60 * 1000
    );
    return endTime - startTime;
  });

  useEffect(() => {
    axios
      .get("https://api.npoint.io/3dcbf4a923f9995e08c1")
      .then((response) => {
        const techProducts = response.data.products.filter((product) =>
          product.category.toLowerCase().includes("smartphones")
        );
        setProducts(techProducts);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });

    const intervalId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1000);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const seconds = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = totalMinutes % 60;
    const totalHours = Math.floor(totalMinutes / 60);
    const hours = totalHours % 24;
    const days = Math.floor(totalHours / 24);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="inicio-container">
      <Alert variant="light" className="text-center mb-0">
        En Xclusive Store te garantizamos servicio y atencion, se parte de esta
        familia
      </Alert>
      <div className="flash-sale bg-dark text-white text-center py-2">
        <h2 className="mb-0">Flash Sale en Tech 15%</h2>
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
              <h3>Tecnología 2024</h3>
              <p>Apple Mac M3</p>
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
              <h3>A la vanguardia con las nuevas tecnologías</h3>
              <button className="btn btn-primary">Comprar ahora</button>
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
            <div className="product-card mx-2" key={product.id}>
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
        <div className="map-container" style={{ maxWidth: "600px" }}>
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
        <div className="store-info text-left">
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
