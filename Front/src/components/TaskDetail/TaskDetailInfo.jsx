import { formatDate, formatDateDetail } from "../../utils/formate_date";
import { MdDeleteOutline } from "react-icons/md";
import { TfiWrite } from "react-icons/tfi";

const TaskDetailInfo = ({ task, openModal,toggleEdit  }) => (
  <div className="task-detail border border-secondary-subtle p-4 rounded-3 shadow bg-light">
    <h2 className="fs-3 fw-bolder mb-4 text-center">{task.title}</h2>

    <div className="mb-3">
      <strong>Descripción:</strong>
      <p className="fs-5">{task.description || "No hay descripción disponible"}</p>
    </div>

    <div className="mb-3">
      <strong>Prioridad:</strong>
      <p className="fs-5 fw-bolder" style={{ color: task.priority === 'alta' ? "#780505" : task.priority === 'media' ? "#fe844f" : "#04c23d" }}>
        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1).toLowerCase()}
      </p>
    </div>

    <div className="mb-3">
      <strong className="d-flex">Fecha de vencimiento:</strong>
      <p className="fs-5 d-flex">
        {formatDateDetail(task.due_date)}
        {formatDate(task.due_date) === "Vencida" && <p className="text-danger mx-2 fs-5 mb-0">(Vencida)</p>}
      </p>
    </div>

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

    <div className="icon-container d-flex justify-content-end">
      <TfiWrite size={25} color="green" className="me-3" style={{cursor: "pointer"}} onClick={toggleEdit}/>
      <MdDeleteOutline 
        size={25} 
        color="red" 
        className="me-2" 
        style={{cursor: "pointer"}} 
        onClick={openModal} 
      />
    </div>
  </div>
);

export default TaskDetailInfo;