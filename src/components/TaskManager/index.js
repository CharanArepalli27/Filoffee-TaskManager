import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./index.css";
import Tasks from "../Tasks";

const TaskManager = () => {
  //!To store inputs
  const [tasks, setTasks] = useState([]);
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Date, setDate] = useState("");
  const [Status, setStatus] = useState("Pending");
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  //!To Add New Task
  const onSubmitForm = async (event) => {
    event.preventDefault();
    if (Title && Description && Date && Status) {
      const newTask = {
        id: uuidv4(),
        Title: Title,
        Description: Description,
        Date: Date,
        Status: Status,
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setTitle("");
      setDescription("");
      setDate("");
      setStatus("Pending");
    } else {
      alert("Please fill all the fields");
    }
  };

  //!To update the Task
  const onUpdate = (event) => {
    event.preventDefault();
    if (Title && Description && Date && Status) {
      const updatedTasks = tasks.map((task) =>
        task.id === currentTaskId
          ? { ...task, Title, Description, Date, Status }
          : task
      );
      setTasks(updatedTasks);
      setTitle("");
      setDescription("");
      setDate("");
      setStatus("Pending");
      setIsUpdate(false);
      setCurrentTaskId(null);
    } else {
      alert("Please fill all the fields");
    }
  };

  //!To Delete the task
  const onDeleteTask = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (isConfirmed) {
      const updatedTasksAfterDelete = tasks.filter(
        (eachTask) => eachTask.id !== id
      );
      setTasks(updatedTasksAfterDelete);
      localStorage.setItem("tasks", JSON.stringify(updatedTasksAfterDelete));
    }
  };

  //!Event Handlers
  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };
  const onChangeDescription = (event) => {
    setDescription(event.target.value);
  };
  const onChangeDate = (event) => {
    setDate(event.target.value);
  };
  const onChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const onChangeEdit = (data) => {
    setCurrentTaskId(data.id);
    setTitle(data.Title);
    setDescription(data.Description);
    setDate(data.Date);
    setStatus(data.Status);
    setIsUpdate(true);
  };

  return (
    <div className="main-container">
      <div className="Task-manager">
        <h1 className="heading">Task Manager</h1>
        <form
          className="form-container"
          onSubmit={isUpdate ? onUpdate : onSubmitForm}
        >
          <h2 className="add-a-task">
            {isUpdate ? "Edit Your Task" : "Add a Task"}
          </h2>
          <div className="input-container">
            <label htmlFor="title-input" className="label">
              Title
            </label>
            <input
              className="input"
              id="title-input"
              type="text"
              placeholder="Add your Title"
              value={Title}
              onChange={onChangeTitle}
            />
          </div>
          <div className="input-container">
            <label htmlFor="title-input" className="label">
              Description
            </label>
            <textarea
              className="textarea-input"
              id="title-input"
              placeholder="Add your Description"
              value={Description}
              onChange={onChangeDescription}
            ></textarea>
          </div>
          <div className="input-container">
            <label htmlFor="title-input" className="label">
              Due Date
            </label>
            <input
              className="input"
              id="title-input"
              type="date"
              placeholder="Add your Title"
              value={Date}
              onChange={onChangeDate}
            />
          </div>
          <div className="input-container">
            <label htmlFor="title-input" className="label">
              Status
            </label>
            <select
              className="input"
              id="title-input"
              placeholder="Add your Title"
              value={Status}
              onChange={onChangeStatus}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <button className="submit-button" type="submit">
            {isUpdate ? "Update" : "Submit"}
          </button>
        </form>
      </div>
      <ul className="task-list">
        {tasks.length > 0 ? (
          tasks.map((eachTask) => (
            <Tasks
              task={eachTask}
              key={eachTask.id}
              onChangeEdit={onChangeEdit}
              onDeleteTask={onDeleteTask}
            />
          ))
        ) : (
          <h1>No Tasks</h1>
        )}
      </ul>
    </div>
  );
};
export default TaskManager;
