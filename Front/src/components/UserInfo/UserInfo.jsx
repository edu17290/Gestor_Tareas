import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import { UserService } from '../../services/user.service';

const UserInfo = () => {
  const { token } = useContext(AuthContext);  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userService = new UserService(() => token);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await userService.getCurrentUser();
        setUser(userData);
      } catch (err) {
        console.log(err)
        setError('Error al obtener los datos del usuario');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUser();
    } else {
      setError('No se ha encontrado el token de autenticación');
      setLoading(false);
    }
  }, [token]); 

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>No se encontró información del usuario.</div>;
  }

  return (
    <div className="container mt-4" style={{ width: "50%" }}>
      <h1>Información del Usuario</h1>
      <p><strong>Nombre Usuario:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
};

export default UserInfo;
