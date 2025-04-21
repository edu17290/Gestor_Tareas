import { Navigate, useNavigate } from "react-router-dom";
import { PrivateRoutes } from "../../routes/router.js";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context.jsx";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const { login, isAuthenticated, fetchError } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    const { username, password } = data;
    await login({ username, password });
    navigate(PrivateRoutes.HOME, { replace: true });
  };

  return (
    <>
      {isAuthenticated ? (
        <Navigate replace to={PrivateRoutes.HOME} />
      ) : (
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="mb-3">
            <label htmlFor="inputUsername" className="form-label text-light">
              Nombre de usuario
            </label>
            <input
              type="text"
              className="form-control input-color"
              id="inputUsername"
              placeholder="Nombre de usuario"
              {...register("username")}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="inputPassword" className="form-label text-light">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control input-color"
              id="inputPassword"
              placeholder="Contraseña"
              {...register("password")}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Iniciar Sesión
          </button>

          {fetchError && <div className="text-danger mb-3">{fetchError}</div>}
        </form>
      )}
    </>
  );
};

export default LoginForm;
