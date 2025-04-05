import React, { useState } from 'react'
import axios from '../../api/axiosConfig'
import { useNavigate } from 'react-router-dom'

function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/register/', {
        username,
        password,
        email, // si el backend lo acepta
        role_id: 2 // ejemplo: cliente (puedes adaptarlo según tu lógica)
      })
      alert('Usuario registrado con éxito')
      navigate('/')
    } catch (err) {
      alert('Error al registrar usuario')
    }
  }

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="email" placeholder="Correo (opcional)" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  )
}

export default Register
