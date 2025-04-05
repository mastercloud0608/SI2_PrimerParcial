import { useState } from 'react';
import { login } from '../../api/auth';
import { useAuthContext } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const LoginForm = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const { loginUser } = useAuthContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(form);
      loginUser(data);
      navigate('/dashboard');
    } catch (err) {
      alert('Credenciales inválidas');
    }
  };

  return (
    <div className="section-login">
      <div className="container">
        <h1 className="left-self">Login 👋</h1>
        <span className="description my left-self">
          Bienvenido a Punto de Venta IA
        </span>

        <button className="btn">
          Iniciar con Google <i className="bi bi-google"></i>
        </button>

        <button className="btn">
          Iniciar con Facebook <i className="bi bi-facebook"></i>
        </button>

        <span className="description my">o usa tus credenciales</span>

        <form onSubmit={handleSubmit}>
          <input
            className="input-field"
            type="text"
            name="username"
            placeholder="Usuario"
            value={form.username}
            onChange={handleChange}
            required
          />
          <input
            className="input-field"
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn btn-login my">
            Iniciar sesión
          </button>
        </form>

        <span className="description my">
          ¿No tienes cuenta? <a href="#">Regístrate</a>
        </span>
      </div>
      <img src="/bg.jpg" alt="fondo login" className="hero-img" />
    </div>
  );
};

export default LoginForm;
