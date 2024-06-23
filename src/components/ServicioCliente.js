import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "../css/ServicioCliente.css";

const API_KEY = "AIzaSyCiKobTx4HWZZI_ldoxP0PTUmVIl8akgcw";
const genAI = new GoogleGenerativeAI(API_KEY);

const permittedQuestions = {
  Hola: "¡Hola! ¿En qué puedo ayudarte?",
  "Que es Xclusive Store":
    "Xclusive Store es una tienda en la cual lo más importante eres tú.",
  Ubicacion:
    "Estamos ubicados en Juan de Dios Batiz 711, 07700 Gustavo A. Madero, Mexico City.",
  "¿Cuál es el estado de mi pedido?":
    "Para conocer el estado de tu pedido, por favor ingresa a tu cuenta y revisa la sección de 'Mis Pedidos'.",
  "¿Cómo puedo devolver un producto?":
    "Para devolver un producto, por favor visita nuestra sección de 'Devoluciones' y sigue las instrucciones.",
  "¿Cuál es la política de garantía?":
    "Nuestra política de garantía cubre defectos de fábrica por un periodo de un año desde la fecha de compra.",
  "¿Cómo puedo cambiar mi dirección de envío?":
    "Puedes cambiar tu dirección de envío desde la sección 'Mi Cuenta' en nuestro sitio web.",
  "¿Cómo puedo contactar al soporte técnico?":
    "Puedes contactar al soporte técnico enviando un correo a soporte@xclusivestore.com o llamando al 555-1234.",
};

const ServicioCliente = () => {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const chatBoxRef = useRef(null);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleGenerateClick = async () => {
    const question = inputText.toLowerCase();

    // Agregar mensaje del usuario a los mensajes
    setMessages((prevMessages) => [
      { sender: "user", text: inputText },
      ...prevMessages,
    ]);

    // Buscar respuesta predefinida
    const predefinedResponse = Object.keys(permittedQuestions).find((key) =>
      question.includes(key.toLowerCase())
    );

    if (predefinedResponse) {
      setMessages((prevMessages) => [
        { sender: "bot", text: permittedQuestions[predefinedResponse] },
        ...prevMessages,
      ]);
      setInputText("");
      return;
    }

    // Si no es una pregunta permitida, agregar mensaje de fase beta
    setMessages((prevMessages) => [
      {
        sender: "bot",
        text: "Lo siento, no puedo responder a esa pregunta en este momento. El servicio está en fase beta.",
      },
      ...prevMessages,
    ]);

    setInputText("");
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      <div className="card w-100 p-4 shadow chat-container">
        <div className="logo mb-4 text-center">
          <img src="./img/logo.png" alt="Xclusive Store" className="logo" />
        </div>
        <h2 className="text-center">Soporte Técnico</h2>
        <div className="chat-box mb-3 p-3 border rounded" ref={chatBoxRef}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${
                message.sender === "user" ? "user-message" : "bot-message"
              } mb-2`}
            >
              {message.text}
            </div>
          ))}
        </div>
        <Form onSubmit={(e) => e.preventDefault()} className="w-100">
          <Form.Group controlId="inputText" className="mb-3">
            <Form.Label>Escribe tu consulta</Form.Label>
            <Form.Control
              type="text"
              placeholder="Escribe algo aquí..."
              value={inputText}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Button
            variant="dark"
            id="generateButton"
            className="w-100"
            onClick={handleGenerateClick}
          >
            Enviar
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ServicioCliente;
