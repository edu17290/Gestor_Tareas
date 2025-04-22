import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/auth.context';
import { TaskService } from '../../services/tasks.services';
import TaskCard from '../TaskCard/TaskCard';
import { useNavigate } from 'react-router-dom';
import { PrivateRoutes } from '../../routes/router';


const TaskList = () => {
  const { token } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate()

  const taskService = new TaskService(() => token);

  const handleAddTask = () => {
    navigate(PrivateRoutes.NEWTASK)
  }

  useEffect(() => {
    taskService.getAllTasks()
      .then(data => setTasks(data))
      .catch(err => {
        console.error(err);
        setError('Error al obtener las tareas');
      });
  }, []);

  return (
    <div className='border border-dark border-3 border-opacity-25 rounded-bottom-4 container'>

      <button 
        className='btn btn-primary m-2 border rounded-4 fs-5' 
        onClick={handleAddTask}
      > 
      + Nueva Tarea
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {tasks.map(task => (
        <TaskCard task={task} key={task.id}/>
      ))}

    </div>
  );
};

export default TaskList;
