// src/pages/ventas/VentaDetail.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function VentaDetail() {
  const { ventaId } = useParams();
  const [venta, setVenta] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVentaDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/ventas/${ventaId}/`);
        setVenta(response.data);
      } catch (err) {
        setError('Error al cargar la venta');
        console.error(err);
      }
    };

    fetchVentaDetail();
  }, [ventaId]);

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl mb-4">Detalle de Venta</h1>
      {error && <div className="bg-red-200 text-red-800 p-2 mb-4">{error}</div>}
      {venta && (
        <div>
          <p><strong>Total:</strong> ${venta.total}</p>
          <p><strong>Estado:</strong> {venta.status}</p>
          <p><strong>Fecha de Creación:</strong> {new Date(venta.created_at).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}

export default VentaDetail;
