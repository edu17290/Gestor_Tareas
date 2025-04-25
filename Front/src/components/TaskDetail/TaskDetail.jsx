import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TaskService } from "../../services/tasks.services";
import { AuthContext } from "../../context/auth.context";
import { PrivateRoutes } from "../../routes/router";
import { useTask } from "../../hooks/useTask";
import TaskDetailInfo from "./TaskDetailInfo";
import TaskActions from "./TaskActions";
import TaskEditForm from "../TaskEdit/TaskEditForm";

const TaskDetail = () => {
  const { taskId } = useParams(); 
  const { token } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const { task, loading, error } = useTask(taskId, token);

  const deleteTask = (taskId) => {
    const taskService = new TaskService(() => token);
    taskService.deleteTask(taskId)
      .then(() => navigate(PrivateRoutes.HOME))
      .catch((err) => console.error(err));

    setIsModalOpen(false);
  };

  const handleSave = (updatedTask) => {
    const taskService = new TaskService(() => token);
    taskService.updateTask(taskId, updatedTask)
      .then(() => {
        window.location.reload();
      })
      .catch((err) => console.error(err));
    setIsEditing(false);  
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const toggleEdit = () => setIsEditing(!isEditing);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-4" style={{ width: "50%" }}>
      {task ? (
        <>
          {isEditing ? (
            <TaskEditForm task={task} onSave={handleSave} toggleEdit={toggleEdit}/>  
          ) : (
            <TaskDetailInfo task={task} openModal={openModal} toggleEdit={toggleEdit} />  
          )}
          
          <TaskActions 
            openModal={openModal} 
            taskId={taskId} 
            deleteTask={deleteTask} 
            isModalOpen={isModalOpen} 
            closeModal={closeModal} 
            isEditing={isEditing}   
          />
        </>
      ) : (
        <div>No se encontró la tarea.</div>
      )}
    </div>
  );
};

export default TaskDetail;