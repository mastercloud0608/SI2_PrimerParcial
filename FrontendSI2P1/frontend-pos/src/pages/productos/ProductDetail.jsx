// src/pages/productos/ProductDetail.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [reduceAmount, setReduceAmount] = useState(0);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/productos/${productId}/`);
        setProduct(response.data);
      } catch (err) {
        setError('Error al cargar el producto');
        console.error(err);
      }
    };

    fetchProductDetail();
  }, [productId]);

  const handleReduceStock = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/api/products/${productId}/reduce_stock/`, { amount: reduceAmount });
      setMessage(response.data.detail);
    } catch (err) {
      setError('Error al reducir el stock');
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl mb-4">Detalle del Producto</h1>
      {error && <div className="bg-red-200 text-red-800 p-2 mb-4">{error}</div>}
      {message && <div className="bg-green-200 text-green-800 p-2 mb-4">{message}</div>}
      {product && (
        <div>
          <p><strong>Nombre:</strong> {product.name}</p>
          <p><strong>Descripción:</strong> {product.description}</p>
          <p><strong>Precio:</strong> ${product.price}</p>
          <p><strong>Stock:</strong> {product.stock}</p>
          <div className="mt-4">
            <label htmlFor="reduceAmount" className="block text-sm">Cantidad a reducir del stock</label>
            <input
              type="number"
              id="reduceAmount"
              value={reduceAmount}
              onChange={(e) => setReduceAmount(e.target.value)}
              className="p-2 border rounded-md"
            />
            <button
              onClick={handleReduceStock}
              className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-500"
            >
              Reducir Stock
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
