import React from "react";
import { useForm } from "react-hook-form";
import { UserService } from "../../services/user.service";
import { useNavigate } from "react-router-dom";
import { PrivateRoutes } from "../../routes/router";

const CreateUserForm = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const navigate = useNavigate();

  const userService = new UserService(() => localStorage.getItem('token')); 

  const onSubmit = async (data) => {
    try {
      await userService.createUser({
        username: data.username,
        email: data.email,
        password: data.password,
      });
      navigate(PrivateRoutes.HOME, { replace: true });
    } catch (error) {
      console.error(error.message || "Error desconocido.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Crear Usuario</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Nombre de usuario</label>
          <input
            id="username"
            type="text"
            className={`form-control ${errors.username ? "is-invalid" : ""}`}
            {...register("username", { required: "El nombre de usuario es obligatorio." })}
          />
          {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo electrónico</label>
          <input
            id="email"
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            {...register("email", { required: "El correo electrónico es obligatorio." })}
          />
          {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            id="password"
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            {...register("password", {
              required: "La contraseña es obligatoria.",
              minLength: { value: 6, message: "La contraseña debe tener al menos 6 caracteres." }
            })}
          />
          {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirmar contraseña</label>
          <input
            id="confirmPassword"
            type="password"
            className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
            {...register("confirmPassword", {
              required: "Confirmar la contraseña es obligatorio.",
              validate: (value) => value === watch("password") || "Las contraseñas no coinciden"
            })}
          />
          {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword.message}</div>}
        </div>

        <button type="submit" className="btn btn-primary">Crear cuenta</button>
      </form>
    </div>
  );
};

export default CreateUserForm;
