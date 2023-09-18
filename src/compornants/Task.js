import Tasks from "./Tasks";
const Task = ({ tasks, onDelete, onTagglr }) => {
  return (
    <div>
      {tasks.map((task, index) => (
        <Tasks
          key={index}
          tasks={task}
          onDelete={onDelete}
          onTagglr={onTagglr}
        />
      ))}
    </div>
  );
};

export default Task;
