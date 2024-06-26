import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { jwtDecode } from "jwt-decode";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Registrar las escalas
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AdminGraficas = () => {
  const [dataCategorias, setDataCategorias] = useState(null);
  const [dataTotales, setDataTotales] = useState(null);
  const [dataStock, setDataStock] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const tipo = decoded.tipo;

      if (tipo !== 1) {
        navigate("../");
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      const categorias = await axios.get(
        "https://localhost/backend/api/comprasPorCategoria.php"
      );
      const totales = await axios.get(
        "https://localhost/backend/api/comprasTotales.php"
      );
      const stock = await axios.get(
        "https://localhost/backend/api/stockPorProducto.php"
      );

      setDataTotales({
        labels: totales.data.labels,
        datasets: [
          {
            label: "Ventas por Producto",
            data: totales.data.data,
            backgroundColor: [
              "rgba(0, 0, 0, 0)",
              "rgba(0, 0, 0, 1)",
              "rgba(0, 0, 0, 0.6)",
              "rgba(0, 0, 0, 0.8)",
              "rgba(0, 0, 0, 1)",
            ],
            borderColor: [
              "rgba(0, 0, 0, 0.5)",
              "rgba(0, 0, 0, 0.5)",
              "rgba(0, 0, 0, 0.5)",
              "rgba(0, 0, 0, 0.5)",
              "rgba(0, 0, 0, 0.5)",
            ],
            borderWidth: 4,
          },
        ],
      });
      setDataCategorias({
        labels: categorias.data.labels,
        datasets: [
          {
            label: "Compras por Categoría",
            data: categorias.data.data,
            backgroundColor: [
              "rgba(0, 0, 0, 0)",
              "rgba(0, 0, 0, 1)",
              "rgba(0, 0, 0, 0.6)",
              "rgba(0, 0, 0, 0.8)",
              "rgba(0, 0, 0, 1)",
            ],
            borderColor: "rgba(0, 0, 0, 1)",
            borderWidth: 4,
          },
        ],
      });

      setDataStock({
        labels: stock.data.labels,
        datasets: [
          {
            label: "Stock",
            data: stock.data.data,
            backgroundColor: [
              "rgba(0, 0, 0, 0)",
              "rgba(0, 0, 0, 1)",
              "rgba(0, 0, 0, 0.6)",
              "rgba(0, 0, 0, 0.8)",
              "rgba(0, 0, 0, 1)",
            ],
            borderColor: "rgba(0, 0, 0, 1)",
            borderWidth: 2.5,
          },
        ],
      });
    };

    fetchData();
  }, []);

  if (!dataCategorias || !dataTotales || !dataStock) {
    return <div>Cargando...</div>;
  }

  const handleAdminNavigation = () => {
    navigate("/admin");
  };

  return (
    <div className="container mt-5">
      <div className="header d-flex justify-content-between align-items-center py-3 mb-5">
        <h1 className="fs-1">Gráficas</h1>
        <div>
          <button
            className="btn btn-dark btn-lg"
            onClick={handleAdminNavigation}
          >
            <FontAwesomeIcon icon={faUser} className="me-2" />
            Admin
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-12 mb-5">
          <h2 className="text-center">5 Productos más Vendidos</h2>
          <div className="chart-container">
            <Pie data={dataTotales} options={{ responsive: true }} />
          </div>
        </div>
        <div className="col-12 mb-5">
          <h2 className="text-center">Compras por Categoría de Productos</h2>
          <div className="chart-container">
            <Bar data={dataCategorias} options={{ responsive: true }} />
          </div>
        </div>

        <div className="col-12">
          <h2 className="text-center">10 Productos con Menos Stock</h2>
          <div className="chart-container">
            <Bar data={dataStock} options={{ responsive: true }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminGraficas;
