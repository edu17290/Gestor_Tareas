import { useState, useEffect } from "react";
import { TaskService } from "../services/tasks.services";


export const useTask = (taskId, token) => {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const taskService = new TaskService(() => token);

    taskService.getTaskById(taskId)
      .then((data) => {
        setTask(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Error al cargar la tarea');
        setLoading(false);
        console.log(err)
      });
  }, [taskId, token]);

  return { task, loading, error };
};