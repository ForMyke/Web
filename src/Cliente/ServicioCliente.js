import React, { useState } from "react";
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
    <div className="chat-container">
      <div className="chat-header">
        <h1>Soporte Técnico</h1>
      </div>
      <div className="chat-body">
        <input
          type="text"
          id="inputText"
          placeholder="Escribe algo aquí..."
          className="chat-input"
          value={inputText}
          onChange={handleInputChange}
        />
        <button
          id="generateButton"
          className="chat-button"
          onClick={handleGenerateClick}
        >
          Generar
        </button>
        <p id="responseText" className="chat-response">
          {responseText}
        </p>
      </div>
    </div>
  );
};

export default ServicioCliente;
