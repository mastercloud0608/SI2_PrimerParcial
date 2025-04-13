import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function UserList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/usuarios/');
        setUsers(response.data);
      } catch (err) {
        setError('Error al cargar los usuarios');
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (username) => {
    try {
      await axios.delete(`http://localhost:8000/api/usuarios/delete/${username}/`);
      setUsers(users.filter((user) => user.username !== username));  // Filtramos por username
    } catch (err) {
      setError('Error al eliminar el usuario');
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Lista de Usuarios</h1>
      {error && <div className="bg-red-200 text-red-800 p-2 mb-4">{error}</div>}
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Nombre</th>
            <th className="px-4 py-2 border">Correo</th>
            <th className="px-4 py-2 border">Rol</th>
            <th className="px-4 py-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-4 py-2 border">{user.id}</td>
              <td className="px-4 py-2 border">{user.username}</td>
              <td className="px-4 py-2 border">{user.email}</td>
              <td className="px-4 py-2 border">{user.role ? user.role.name : 'Sin rol'}</td>
              <td className="px-4 py-2 border">
                <Link to={`/usuarios/edit/${user.id}`} className="text-blue-500 hover:text-blue-700">Editar</Link>
                <button
                  onClick={() => handleDelete(user.username)}  // Cambié 'user.id' por 'user.username'
                  className="text-red-500 hover:text-red-700 ml-4"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
