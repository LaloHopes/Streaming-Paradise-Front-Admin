import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box } from '@mui/material';
import axios from 'axios';
import { useUser } from '../../contexts/UserContext'; // Importa el contexto del usuario

const LoginComponent = ({ handleFooter }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { setUser } = useUser(); // Accede a la función setUser del contexto

  useEffect(() => {
    handleFooter(false);
    return () => {
      handleFooter(true);
    };
  }, [handleFooter]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/users/login', { email, password });
      
      // Verifica si la respuesta contiene rememberToken y el usuario
      if (response.data && response.data.rememberToken && response.data.user) {
        const { rememberToken, user } = response.data; // Obtiene el rememberToken y user de la respuesta
        console.log('Respuesta del servidor:', response.data);
        
        // Guardar el rememberToken y el usuario en localStorage
        localStorage.setItem('token', rememberToken); // Guarda el rememberToken
        localStorage.setItem('user', JSON.stringify(user));

        // Actualiza el usuario en el contexto
        setUser(user);
        console.log('Usuario autenticado:', user); // Muestra el usuario en la consola

        alert('Inicio de sesión exitoso');

        // Redirigir según el rol del usuario
        if (user.idrol === 1) {
          navigate('/admin'); // Redirigir a la ruta de administrador
        } else if (user.idrol === 2) {
          navigate('/home'); // Redirigir a la ruta de usuario estándar
        } else {
          console.error('Rol de usuario no reconocido');
          setError('Rol de usuario no reconocido');
        }
      } else {
        setError('Error en la respuesta del servidor');
        console.error('Error: Respuesta no válida del servidor', response.data);
      }
    } catch (err) {
      // Maneja errores como credenciales inválidas o problemas con el servidor
      setError('Credenciales inválidas o error en el servidor');
      console.error('Error al iniciar sesión:', err.response ? err.response.data : err.message);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <Box mb={2}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Box>
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Login
        </Button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <p className="text-black">¿No tienes cuenta? <a href="/registro">Regístrate aquí</a></p>
      </form>
    </Box>
  );
};

export default LoginComponent;
