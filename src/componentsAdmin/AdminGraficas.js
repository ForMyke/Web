import React from "react";
import { Bar } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css";

const dataCategorias = {
  labels: ["Categoría 1", "Categoría 2", "Categoría 3"],
  datasets: [
    {
      label: "Compras por Categoría",
      data: [12, 19, 3],
      backgroundColor: ["rgba(75, 192, 192, 0.2)"],
      borderColor: ["rgba(75, 192, 192, 1)"],
      borderWidth: 1,
    },
  ],
};

const dataTotales = {
  labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
  datasets: [
    {
      label: "Compras Totales",
      data: [65, 59, 80, 81, 56, 55],
      backgroundColor: ["rgba(153, 102, 255, 0.2)"],
      borderColor: ["rgba(153, 102, 255, 1)"],
      borderWidth: 1,
    },
  ],
};

const AdminGraficas = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5">Graficas</h1>
      <div className="row">
        <div className="col-12 mb-5">
          <h2 className="text-center">Compras por Categoría de Productos</h2>
          <div className="chart-container">
            {/* <Bar data={dataCategorias} options={{ responsive: true }} /> */}
          </div>
        </div>
        <div className="col-12">
          <h2 className="text-center">Compras Totales</h2>
          <div className="chart-container">
            {/* <Bar data={dataTotales} options={{ responsive: true }} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminGraficas;
