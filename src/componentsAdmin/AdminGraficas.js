import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import{jwtDecode} from "jwt-decode";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

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
      const categorias = await axios.get('https://localhost/backend/api/comprasPorCategoria.php');
      const totales = await axios.get('https://localhost/backend/api/comprasTotales.php');
      const stock = await axios.get('https://localhost/backend/api/stockPorProducto.php');

      setDataCategorias({
        labels: categorias.data.labels,
        datasets: [
          {
            label: 'Compras por Categoría',
            data: categorias.data.data,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      });

      setDataTotales({
        labels: totales.data.labels,
        datasets: [
          {
            label: 'Ventas por Producto',
            data: totales.data.data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1,
          },
        ],
      });

      setDataStock({
        labels: stock.data.labels,
        datasets: [
          {
            label: 'Stock',
            data: stock.data.data,
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1,
          },
        ],
      });
    };

    fetchData();
  }, []);

  if (!dataCategorias || !dataTotales || !dataStock) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5">Gráficas</h1>
      <div className="row">
        <div className="col-12 mb-5">
          <h2 className="text-center">Compras por Categoría de Productos</h2>
          <div className="chart-container">
            <Bar data={dataCategorias} options={{ responsive: true }} />
          </div>
        </div>
        <div className="col-12 mb-5">
          <h2 className="text-center">5 Productos más Vendidos</h2>
          <div className="chart-container">
            <Pie data={dataTotales} options={{ responsive: true }} />
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
