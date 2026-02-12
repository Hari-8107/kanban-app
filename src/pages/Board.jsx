import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Board() {
  const navigate = useNavigate();
  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleAddTask = () => {
    if (taskInput.trim() === "") {
      toast.error("Please enter a task");
      return;
    }

    const newTask = {
      id: Date.now(),
      title: taskInput,
      status: "todo",
    };

    setTasks([...tasks, newTask]);
    setTaskInput("");
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const fakeApiCall = () => {
    return new Promise((resolve, reject) => {
      const delay = Math.floor(Math.random() * 2000) + 1000;

      setTimeout(() => {
        if (Math.random() < 0.2) {
          reject();
        } else {
          resolve();
        }
      }, delay);
    });
  };

  const handleMove = async (id, newStatus) => {
    const previousTasks = [...tasks];

    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status: newStatus } : task
    );

    setTasks(updatedTasks);

    try {
      await fakeApiCall();
      toast.success("Task moved successfully!");
    } catch {
      toast.error("Failed! Rolling back...");
      setTasks(previousTasks);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* Top Section */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">Kanban Board</h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Add Task Section */}
      <div className="flex justify-center gap-4 mb-10">
        <input
          type="text"
          placeholder="Enter new task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-lg w-72 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>

      {/* Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* To Do */}
        <div className="bg-white border-2 border-blue-400 rounded-xl p-5 shadow-lg">
          <h3 className="text-xl font-bold mb-5 text-blue-600 text-center">
            To Do
          </h3>

          {tasks
            .filter((task) => task.status === "todo")
            .map((task) => (
              <div
                key={task.id}
                className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-4"
              >
                <div className="mb-3 font-medium">{task.title}</div>

                <div className="flex justify-between">
                  <button
                    onClick={() => handleMove(task.id, "inprogress")}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600"
                  >
                    Move →
                  </button>

                  <button
                    onClick={() => handleDelete(task.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>

        {/* In Progress */}
        <div className="bg-white border-2 border-yellow-400 rounded-xl p-5 shadow-lg">
          <h3 className="text-xl font-bold mb-5 text-yellow-600 text-center">
            In Progress
          </h3>

          {tasks
            .filter((task) => task.status === "inprogress")
            .map((task) => (
              <div
                key={task.id}
                className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-4"
              >
                <div className="mb-3 font-medium">{task.title}</div>

                <div className="flex justify-between">
                  <button
                    onClick={() => handleMove(task.id, "done")}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md text-sm hover:bg-yellow-600"
                  >
                    Move →
                  </button>

                  <button
                    onClick={() => handleDelete(task.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>

        {/* Done */}
        <div className="bg-white border-2 border-green-400 rounded-xl p-5 shadow-lg">
          <h3 className="text-xl font-bold mb-5 text-green-600 text-center">
            Done
          </h3>

          {tasks
            .filter((task) => task.status === "done")
            .map((task) => (
              <div
                key={task.id}
                className="bg-green-50 border border-green-200 p-4 rounded-lg mb-4"
              >
                <div className="mb-3 font-medium">{task.title}</div>

                <button
                  onClick={() => handleDelete(task.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 w-full"
                >
                  Delete
                </button>
              </div>
            ))}
        </div>

      </div>
    </div>
  );
}

export default Board;
