"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../src/store/store";
import { setTasks } from "../../src/slices/taskSlice";
import { getTasks } from "../../api";

export default function Tasks() {
  const { tasks } = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTasks = async () => {
        try {
            const res = await getTasks();
            dispatch(setTasks(res.data));
        } catch (error) {
          console.log(error)
            console.error("Error fetching tasks:", error);
        }
    };
    fetchTasks();
}, [dispatch, token]);

   const getTasks = async () => {
  const token = localStorage.getItem("token");
  
  return api.get("/tasks", {
      headers: {
          Authorization: `Bearer ${token}`,
      },
  });
};

  return (
  <>
    <div>
      <h1 className="bold text-4xl" >My Tasks</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>

    <div className="space-y-4">
    <div className="flex justify-between">
      <h1 className="text-2xl font-bold">Task Manager ✅</h1>
   
    </div>
    {/* <TaskForm addTask={addTask} />
    <TaskList tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} /> */}
    </div>
  </>
  );
}
