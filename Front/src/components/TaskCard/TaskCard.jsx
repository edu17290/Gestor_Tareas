import { useEffect, useState } from "react";
import { formatDate } from "../../utils/formate_date";
import { PrivateRoutes } from "../../routes/router";
import { Link} from "react-router-dom";

const TaskCard = ({ task }) => {
  const [priority, setPriority] = useState("media");
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setPriority(task.priority);
  }, [task.priority]);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  return (
    <>
      <div className="form-check border border-secondary-subtle m-2 mb-4 rounded-3 position-relative shadow">
        <input
          className="form-check-input m-2 border border-primary"
          type="checkbox"
          value=""
          id="checkDefault"
          checked={checked}
          onChange={handleCheckboxChange}
        />
        <label className="form-check-label d-flex flex-column fs-5">
          <p className="fs-4 fw-bolder">{task.title}</p>
          <p
            className="fs-4 text-center rounded-4 pb-1"
            style={
              priority === "alta"
                ? { background: "#780505", width: "120px", color:"white"}
                : priority === "media"
                ? { background: "#fe844f", width: "120px", color:"white" }
                : { background: "#04c23d", width: "120px", color:"white" }
            }
          >
            {task.priority}
          </p>

          <p className="position-absolute top-0 end-0 m-2 fs-5">
            Vence: {formatDate(task.due_date)}
          </p>
        </label>

        <Link
          className="position-absolute bottom-0 end-0 m-2 text-primary cursor-pointer"
          to={`${PrivateRoutes.TASKDETAILS}/${task.id}`}
          style={{ fontSize: '16px', fontWeight: 'bold' }}
        >
          Ver Detalles
        </Link>
      </div>
    </>
  );
};

export default TaskCard;
