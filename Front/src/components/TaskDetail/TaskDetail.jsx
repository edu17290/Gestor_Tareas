import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TaskService } from "../../services/tasks.services";
import { AuthContext } from "../../context/auth.context";
import { PrivateRoutes } from "../../routes/router";
import { useTask } from "../../hooks/useTask";
import TaskDetailInfo from "./TaskDetailInfo";
import TaskActions from "./TaskActions";

const TaskDetail = () => {
  const { taskId } = useParams(); 
  const { token } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const { task, loading, error } = useTask(taskId, token);

  const deleteTask = (taskId) => {
    const taskService = new TaskService(() => token);
    taskService.deleteTask(taskId)
      .then(() => navigate(PrivateRoutes.HOME))
      .catch((err) => console.error(err));

    setIsModalOpen(false);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-4" style={{ width: "50%" }}>
      {task ? (
        <>
          <TaskDetailInfo task={task} openModal={openModal}/>
          <TaskActions  taskId={taskId} deleteTask={deleteTask} isModalOpen={isModalOpen} closeModal={closeModal} />
        </>
      ) : (
        <div>No se encontró la tarea.</div>
      )}
    </div>
  );
};

export default TaskDetail;