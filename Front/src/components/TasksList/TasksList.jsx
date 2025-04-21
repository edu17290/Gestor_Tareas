import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/auth.context';
import { TaskService } from '../../services/tasks.services';


const TaskList = () => {
  const { token } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  
  const taskService = new TaskService(() => token);

  useEffect(() => {
    taskService.getAllTasks()
      .then(data => setTasks(data))
      .catch(err => {
        console.error(err);
        setError('Error al obtener las tareas');
      });
  }, []);

  return (
    <div>
      <h2>Mis Tareas</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
