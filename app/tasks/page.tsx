"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../src/store/store";
import { setTasks } from "../../src/slices/taskSlice";
import { getTasks } from "../../api";
import { deleteTask } from "../../api" ;
import { addTask } from "../../api";

export default function Tasks() {
  const { tasks } = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();

  const [newTask, setNewTask] = useState("");
  const [editText, setEditText ] = useState("");
  const [editDateText, seteditDateText ] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [status, setStatus] = useState('')


  const handleAddTask = async (e) => {
    e.preventDefault();
    if (newTask.trim() === "") return;
    try {
      const response = await addTask({ title: newTask, description: editText, status: "Pending" , due_date: editDateText });
      setTasks([...tasks, response.data]);
      setNewTask("")
      setEditText("")
      seteditDateText("")
      window.location.reload();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const updateTask = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, title: editText } : task)));
    setEditingTask(null);
  };

  const startEditing = (task) => {
    setEditingTask(task.id);
    setEditText(task.title);
  };

  const cancelEditing = () => {
    setEditingTask(null);
    setEditText("");
  };

  const saveStatus =() => {
    setEditingTask(task.id);
    setEditText(task.title);
  }


  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await getTasks();
        dispatch(setTasks(res.data));
      } catch (error) {
        console.log(error);
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <>
      <div className="max-w-[900px] mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl space-y-6">
        <h1 className="text-3xl text-black font-bold text-center">Task Manager ✅</h1>
        <form className="flex gap-2" onSubmit={handleAddTask}>
          <input 
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="w-full px-4 py-2 border text-slate-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter a new task title" 
          />
          <input 
            value={editText} 
            onChange={(e) => setEditText(e.target.value)}
            className="w-full px-4 py-2 border text-slate-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter task description" 
          />
          <input 
            type="date"
            value={editDateText}
            onChange={(e) => seteditDateText(e.target.value)} 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
            placeholder="Enter due date" 
          />
          <button 
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            <div className="" /> Add
          </button>
        </form>

        <ul className="space-y-4">
          {tasks.map((task) => (
            <div className="p-4 flex justify-between items-center border border-gray-200 rounded-lg shadow-sm" key={task.id}>
              {
                editingTask !== task.id ? (
                  <>    
                    <div>
                      <h1 className="text-xl font-bold text-gray-900">{task.title}</h1>
                      <p className=" items-start flex text-gray-400 text-sm w-[350px] ">{task.description}</p>
                      <p className=" items-start flex text-red-900 text-sm font-bold ">{task.due_date}</p>
                    </div>                
                    <span className={`inline-block px-3 py-1 mt-2 text-sm font-semibold rounded-full ${task.status === 'completed' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-gray-800'}`}>
                      {task.status}
                    </span>
                    <div className="flex space-x-2">
                      <button className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
                      onClick={() => startEditing(task)} 
                      >
                        Edit
                      </button>
                        <button 
                        onClick={() => handleDeleteTask(task.id)} 
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600">
                          Delete
                      </button>
                  </div>
                  </>
                ) : (
                  <>
                  <form className="flex gap-2">
                  <input value={status} placeholder="type 'completed' " className="w-full placeholder-slate-500 text-gray-900 px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" onChange={(e) => setStatus(e.target.value)} />
                  <button className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 ml-2"
                  onClick={saveStatus}
                  >
                    Save
                  </button>
                  <button onClick={cancelEditing} className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-gray-500 ml-2">
                  ✖
                  </button>
                  </form>
                  </>
                )
              }
          </div>
          ))}

        </ul>
      </div>
    </>
  );
}
