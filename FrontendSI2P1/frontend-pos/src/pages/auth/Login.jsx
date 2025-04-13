import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Crea la instancia de navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/auth/login/', {
        username,
        password,
      });
      setMessage('Usuario autenticado correctamente');
      console.log(response.data);
      
      // Redirigir al dashboard después de un login exitoso
      navigate('/dashboard'); // Aquí es donde se realiza la redirección
    } catch (err) {
      setError('Credenciales inválidas');
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl mb-4">Iniciar Sesión</h2>
      {error && <div className="bg-red-200 text-red-800 p-2 mb-4">{error}</div>}
      {message && <div className="bg-green-200 text-green-800 p-2 mb-4">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm">Nombre de Usuario</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-3 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border rounded-md"
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md">Iniciar Sesión</button>
      </form>
    </div>
  );
}

export default Login;
