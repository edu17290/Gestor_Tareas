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
      .then(data => {
        if (data && Array.isArray(data) && data.length === 0) {
          setTasks([]);
        } else {
          const filteredTasks = data.filter(task => new Date(task.due_date) >= new Date());
          const sortedTasks = filteredTasks.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
          setTasks(sortedTasks); 
        }
      })
      .catch(err => {
        console.error(err);
        setError('Error al obtener las tareas');
      });
  }, []);

  return (
    <div className='border border-dark border-3 border-opacity-25 rounded-bottom-4 container bg-light'>

      <button 
        className='btn btn-primary m-2 border rounded-4 fs-5' 
        onClick={handleAddTask}
      > 
      + Nueva Tarea
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {tasks.length === 0 ? (
        <h2 className="text-center mt-4">Crea tu primera tarea!</h2>
      ) : (
        tasks.map(task => (
          <TaskCard task={task} key={task.id} />
        ))
      )}

    </div>
  );
};

export default TaskList;
