import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { formatDateDetail } from "../../utils/formate_date";

const TaskEditForm = ({ task, onSave, toggleEdit }) => {
  const { control, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      title: task.title,
      description: task.description || "",
      priority: task.priority,
      due_date: task.due_date.split("T")[0],  
      category: task.category || "",
    }
  });

  
  useEffect(() => {
    setValue("title", task.title);
    setValue("description", task.description || "");
    setValue("priority", task.priority);
    setValue("due_date", task.due_date.split("T")[0]);
    setValue("category", task.category || "");
  }, [task, setValue]);

  const onSubmit = (data) => {
    onSave(data);  
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="task-detail border border-secondary-subtle p-4 rounded-3 shadow bg-light mb-3">
      <h2 className="fs-3 fw-bolder mb-4 text-center">{task.title}</h2>

      <div className="mb-3">
        <strong>Descripción:</strong>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <textarea
              className={`fs-5 form-control ${errors.description ? "is-invalid" : ""}`}
              placeholder="Descripción de la tarea"
              {...field}
            />
          )}
        />
        {errors.description && <div className="invalid-feedback">Este campo es obligatorio.</div>}
      </div>

      <div className="mb-3">
        <strong>Prioridad:</strong>
        <Controller
          name="priority"
          control={control}
          render={({ field }) => (
            <select
              className={`fs-5 form-select ${errors.priority ? "is-invalid" : ""}`}
              {...field}
            >
              <option value="alta">Alta</option>
              <option value="media">Media</option>
              <option value="baja">Baja</option>
            </select>
          )}
        />
        {errors.priority && <div className="invalid-feedback">Este campo es obligatorio.</div>}
      </div>

      <div className="mb-3">
        <strong>Fecha de vencimiento:</strong>
        <Controller
          name="due_date"
          control={control}
          render={({ field }) => (
            <input
              type="date"
              className={`fs-5 form-control ${errors.due_date ? "is-invalid" : ""}`}
              {...field}
            />
          )}
        />
        {errors.due_date && <div className="invalid-feedback">Este campo es obligatorio.</div>}
      </div>

      <div className="mb-3">
        <strong>Categoría:</strong>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <input
              type="text"
              className={`fs-5 form-control ${errors.category ? "is-invalid" : ""}`}
              placeholder="Categoría de la tarea"
              {...field}
            />
          )}
        />
        {errors.category && <div className="invalid-feedback">Este campo es obligatorio.</div>}
      </div>

      <div className="mb-3">
        <strong>Fecha de creación:</strong>
        <p className="fs-5">{formatDateDetail(task.created_at)}</p>
      </div>

      <div className="mb-3">
        <strong>Última actualización:</strong>
        <p className="fs-5">{formatDateDetail(task.updated_at)}</p>
      </div>

      <div className="icon-container d-flex justify-content-end">
        <button className="btn btn-danger me-3" onClick={toggleEdit}>Cancelar</button>
        <button type="submit" className="btn btn-success me-3">Guardar Cambios</button>
      </div>
    </form>
  );
};

export default TaskEditForm;
