import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PriorityEnum } from "../../utils/priorityEnum";
import { TaskService } from "../../services/tasks.services";
import { AuthContext } from '../../context/auth.context';
import { PrivateRoutes } from "../../routes/router";

const TaskForm = () => {
  const { token } = useContext(AuthContext); 
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const taskService = new TaskService(() => token); 

  const onSubmit = async (data) => {
    try {
      await taskService.createTask(data); 
      navigate(PrivateRoutes.HOME); 
    } catch (error) {
      setErrorMessage(error.message || "Error al crear la tarea. Inténtalo nuevamente.");
    }
  };

  return (
    <div className="container mt-5 bg-light rounded-3 shadow-lg" style={{ width: "50%" }}>
      <h2>Crear Nueva Tarea</h2>

      {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}

      <form onSubmit={handleSubmit(onSubmit)}>
      
        <div className="mb-3">
          <label htmlFor="inputTitle" className="form-label">Título</label>
          <input
            type="text"
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
            id="inputTitle"
            placeholder="Título de la tarea"
            {...register("title", { required: "El título es obligatorio" })}
          />
          {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="inputDescription" className="form-label">Descripción</label>
          <textarea
            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
            id="inputDescription"
            placeholder="Descripción de la tarea"
            rows="3"
            {...register("description")}
          />
          {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="inputDueDate" className="form-label">Fecha de Vencimiento</label>
          <input
            type="datetime-local"
            className={`form-control ${errors.due_date ? 'is-invalid' : ''}`}
            id="inputDueDate"
            {...register("due_date", { required: "La fecha de vencimiento es obligatoria" })}
          />
          {errors.due_date && <div className="invalid-feedback">{errors.due_date.message}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="inputPriority" className="form-label">Prioridad</label>
          <select
            className={`form-control ${errors.priority ? 'is-invalid' : ''}`}
            id="inputPriority"
            {...register("priority", { required: "La prioridad es obligatoria" })}
          >
            <option value="">Seleccionar prioridad</option>
            {Object.values(PriorityEnum).map((priority) => (
              <option key={priority} value={priority}>{priority}</option>
            ))}
          </select>
          {errors.priority && <div className="invalid-feedback">{errors.priority.message}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="inputCategory" className="form-label">Categoría</label>
          <input
            type="text"
            className={`form-control ${errors.category ? 'is-invalid' : ''}`}
            id="inputCategory"
            placeholder="Categoría de la tarea"
            {...register("category")}
          />
          {errors.category && <div className="invalid-feedback">{errors.category.message}</div>}
        </div>

        <button type="submit" className="btn btn-primary w-100 mb-2">Crear tarea</button>
      </form>
    </div>
  );
}
export default TaskForm