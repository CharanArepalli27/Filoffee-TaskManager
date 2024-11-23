import "./index.css";

import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Task = (props) => {
  const { task, onChangeEdit, onDeleteTask } = props;
  const { id, Title, Description, Date, Status } = task;

  const onEdit = () => {
    onChangeEdit(task);
  };
  const onDelete = () => {
    onDeleteTask(id);
  };
  let statusClassname = null;
  if (Status === "Pending") {
    statusClassname = "red";
  } else if (Status === "In Progress") {
    statusClassname = "blue";
  } else {
    statusClassname = "green";
  }
  return (
    <li className="list-item">
      <p className="task-details">
        <span className="span">Title :</span> {Title}
      </p>
      <p className="task-details">
        <span className="span">Description :</span> {Description}
      </p>
      <p className="task-details">
        <span className="span">Due Date :</span> {Date}
      </p>
      <p className={statusClassname}>
        <span className="span">Status :</span> {Status}
      </p>
      <div className="buttons-container">
        <FaRegEdit size={20} onClick={onEdit} />
        <MdDelete size={20} onClick={onDelete} />
      </div>
    </li>
  );
};
export default Task;
