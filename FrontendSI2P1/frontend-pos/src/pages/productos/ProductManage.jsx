// src/pages/productos/ProductManage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ProductManage() {
  const { productId } = useParams(); // Se usará si estamos editando un producto
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (productId) {
        // Si productId está presente, actualizamos el producto
        const response = await axios.put(`http://localhost:8000/api/productos/${productId}/`, {
          name,
          description,
          price,
          stock,
        });
        setMessage('Producto actualizado correctamente');
      } else {
        // Si no hay productId, creamos un nuevo producto
        const response = await axios.post('http://localhost:8000/api/products/', {
          name,
          description,
          price,
          stock,
        });
        setMessage('Producto creado correctamente');
      }
    } catch (err) {
      setError('Error al crear o actualizar el producto');
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl mb-4">{productId ? 'Actualizar Producto' : 'Crear Producto'}</h1>
      {error && <div className="bg-red-200 text-red-800 p-2 mb-4">{error}</div>}
      {message && <div className="bg-green-200 text-green-800 p-2 mb-4">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm">Nombre</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm">Descripción</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-3 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm">Precio</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full p-3 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="stock" className="block text-sm">Stock</label>
          <input
            type="number"
            id="stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
            className="w-full p-3 border rounded-md"
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md">{productId ? 'Actualizar' : 'Crear'} Producto</button>
      </form>
    </div>
  );
}

export default ProductManage;
