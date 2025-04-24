import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { formatDate, formatDateDetail } from "../../utils/formate_date";  
import { TaskService } from "../../services/tasks.services";
import { AuthContext } from "../../context/auth.context";

const TaskDetail = () => {
  const { taskId } = useParams(); 
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);

  const taskService = new TaskService(() => token); 
  
  useEffect(() => {
    taskService.getTaskById(taskId)
      .then(data => {
        setTask(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Error al cargar la tarea');
        setLoading(false);
      });
  }, [taskId, taskService]); 

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mt-4" style={{ width: "50%" }}>
      {task ? (
        <div className="task-detail border border-secondary-subtle p-4 rounded-3 shadow bg-light">
          <h2 className="fs-3 fw-bolder mb-4 text-center">{task.title}</h2>

          <div className="mb-3">
            <strong>Descripción:</strong>
            <p className="fs-5">{task.description || "No hay descripción disponible"}</p>
          </div>

          <div className="mb-3">
            <strong>Prioridad:</strong>
            <p
              className="fs-5 fw-bolder"
              style={
                task.priority === "alta"
                  ? { width: "120px", color: "#780505" }
                  : task.priority === "media"
                  ? { width: "120px", color: "#fe844f" }
                  : {  width: "120px", color: "#04c23d" }
              }
            >
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1).toLowerCase()}
            </p>
          </div>

          <div className="mb-3">
            <strong className="d-flex">
              Fecha de vencimiento:
            </strong>
            <p className="fs-5 d-flex">
              {formatDateDetail(task.due_date)}
              {formatDate(task.due_date) === "Vencida" && <p className="text-danger mx-2 fs-5 mb-0">(Vencida)</p>}
            </p>
          </div>

          {/* <div className="mb-3">
            <strong>Estado:</strong>
            <p 
            className="fw-bolder fs-5"
            style={task.completed ?{color:"green"}: {color:"red"}}
            >
              {task.completed ? "Completada" : "Pendiente"}
            </p>
          </div> */}

          <div className="mb-3">
            <strong>Categoría:</strong>
            <p className="fs-5">{task.category || "No definida"}</p>
          </div>

          <div className="mb-3">
            <strong>Fecha de creación:</strong>
            <p className="fs-5">{formatDateDetail(task.created_at)}</p>
          </div>

          <div className="mb-3">
            <strong>Última actualización:</strong>
            <p className="fs-5">{formatDateDetail(task.updated_at)}</p>
          </div>
        </div>
      ) : (
        <div>No se encontró la tarea.</div>
      )}
    </div>
  );
};

export default TaskDetail;