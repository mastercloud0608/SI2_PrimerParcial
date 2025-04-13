// src/components/layout/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <div className="text-2xl font-semibold mb-6">
        <Link to="/" className="text-white hover:text-gray-300">SmartPOS</Link>
      </div>
      <ul className="space-y-4">
        <li><Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link></li>


        {/* Enlace a Usuarios */}
        <li>
          <Link to="/usuarios" className="hover:text-gray-300">Usuarios</Link>
          <ul className="pl-4 space-y-2">
            <li><Link to="/usuarios/list" className="hover:text-gray-300">Lista de Usuarios</Link></li>
            <li><Link to="/usuarios/create" className="hover:text-gray-300">Crear Usuario</Link></li>
            <li><Link to="/usuarios/detail" className="hover:text-gray-300">Detalle del Usuario</Link></li>
            <li><Link to="/usuarios/manage" className="hover:text-gray-300">Gestión de Roles</Link></li>
          </ul>
        </li>

        {/* Enlace a Productos */}
        <li>
          <Link to="/productos" className="hover:text-gray-300">Productos</Link>
          <ul className="pl-4 space-y-2">
            <li><Link to="/productos/list" className="hover:text-gray-300">Lista de Productos</Link></li>
            <li><Link to="/productos/detail" className="hover:text-gray-300">Detalle del Producto</Link></li>
            <li><Link to="/productos/manage" className="hover:text-gray-300">Gestión de Productos</Link></li>
          </ul>
        </li>

       {/* Enlace a Ventas */}
       <li>
          <Link to="/ventas" className="hover:text-gray-300">Ventas</Link>
          <ul className="pl-4 space-y-2">
            <li><Link to="/ventas/list" className="hover:text-gray-300">Lista de Ventas</Link></li>
            <li><Link to="/ventas/create" className="hover:text-gray-300">Crear Venta</Link></li>
          </ul>
        </li>


        {/* Enlace a Reportes */}
        <li>
          <Link to="/reportes" className="hover:text-gray-300">Reportes</Link>
          <ul className="pl-4 space-y-2">
            <li><Link to="/reportes/list" className="hover:text-gray-300">Lista de Reportes</Link></li>
            <li><Link to="/reportes/create" className="hover:text-gray-300">Crear Reporte</Link></li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
