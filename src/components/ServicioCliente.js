import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "../css/ServicioCliente.css";

const API_KEY = "AIzaSyCiKobTx4HWZZI_ldoxP0PTUmVIl8akgcw";
const genAI = new GoogleGenerativeAI(API_KEY);

const ServicioCliente = () => {
  const [inputText, setInputText] = useState("");
  const [responseText, setResponseText] = useState("");

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleGenerateClick = async () => {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro-latest",
    });
    const prompt = inputText;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      setResponseText(await response.text());
    } catch (error) {
      console.error("Error no jala :", error);
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      <div className=" p-4 shadow">
        <div className="logo mb-4 text-center">
          <img src="./img/logo.png" alt="Xclusive Store" className="logo" />
        </div>
        <h2 className="text-center">Soporte Técnico</h2>
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
            Generar
          </Button>
        </Form>
        {responseText && (
          <p id="responseText" className="mt-4 p-3 bg-light border rounded">
            {responseText}
          </p>
        )}
      </div>
    </div>
  );
};

export default ServicioCliente;
