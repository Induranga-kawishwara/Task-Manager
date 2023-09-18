import { FaTimes } from "react-icons/fa";
const Tasks = ({ tasks, onDelete, onTagglr }) => {
  return (
    <div
      className={`task ${tasks.reminder ? "reminder" : ""}`}
      onClick={() => onTagglr(tasks.id)}
    >
      <h3>
        {tasks.text}
        {""}
        <FaTimes
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => onDelete(tasks.id)}
        />
      </h3>
      <p>{tasks.day}</p>
    </div>
  );
};

export default Tasks;
