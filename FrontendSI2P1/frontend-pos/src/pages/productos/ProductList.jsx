// src/pages/productos/ProductList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/productos/');
        setProducts(response.data);
      } catch (err) {
        setError('Error al cargar los productos');
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl mb-4">Lista de Productos</h1>
      {error && <div className="bg-red-200 text-red-800 p-2 mb-4">{error}</div>}
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Nombre</th>
            <th className="px-4 py-2 border">Precio</th>
            <th className="px-4 py-2 border">Stock</th>
            <th className="px-4 py-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="px-4 py-2 border">{product.id}</td>
              <td className="px-4 py-2 border">{product.name}</td>
              <td className="px-4 py-2 border">{product.price}</td>
              <td className="px-4 py-2 border">{product.stock}</td>
              <td className="px-4 py-2 border">
                <Link to={`/productos/detail/${product.id}`} className="text-blue-600 hover:text-blue-800">Ver</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
