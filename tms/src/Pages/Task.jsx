import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import EditModal from '../Component/Modal'
import { IoIosAdd } from "react-icons/io";
import TaskModal from "../Component/TaskModal";
import { GrFormView } from "react-icons/gr";
import TaskDetailsModal from "../Component/TaskDetailsModal";
const Task = () => {
  const baseurl = process.env.REACT_APP_BASE_URL
  const [tasks, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [currentTask, setCurrentTask] = useState(null);
  const [teamData, setTeamData] = useState([]);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const token = Cookies.get("token");
  const fetchtaskData = async () => {
    try {
      const response = await fetch(
        `${baseurl}/api/tasks/ManagerTask`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      
      setTask(data.tasks);
    } catch (err) {
      console.error("Error fetching team data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

 const team  = async ()=>{
  try {
    const token = Cookies.get("token");

    const response = await fetch(`${baseurl}/api/Team`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });   
    const data = await response.json();
    setTeamData(data.members);
  } catch (err) {
    console.error("Error fetching team data:", err);
    setError(err.message);
  }
}

useEffect(() => {
  team();
}, []);



  useEffect(() => {
    fetchtaskData();
  }, []);

  const handleEdit = (task)=>{
    setCurrentTask(task);
    setIsModalOpen(true);
  }

  const closemodal = ()=>{
    setIsModalOpen(false);
    setCurrentTask(null);
  }
  const closetaskCreationmodal = ()=>{
    setIsTaskModalOpen(false);
   
  }

  const taskDetail = ()=>{
    setIsDetailsModalOpen(true);
  }

const TaskCreationModal = ()=>{
 setIsTaskModalOpen(true)
}


 

  return (
    <>
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center bg-gray-400 p-4">
        <h1 className="text-2xl font-semibold text-white">Task</h1>
       <div className="rounded-full p-2 bg-blue-600" onClick={TaskCreationModal}>
       <IoIosAdd size={20} color="white" />
       </div>
      </div>
   
    
      {tasks && (
          <table className="min-w-full  border border-gray-300">
            <thead >
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">title</th>
                <th className="border border-gray-300 p-2">description</th>
                <th className="border border-gray-300 p-2">Priority</th>
                <th className="border border-gray-300 p-2">Status</th>
                <th className="border border-gray-300 p-2">AssingedTo</th>
                <th className="border border-gray-300 p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id} className="group hover:bg-gray-200 cursor-pointer" >
                  <td className=" border-t-2  border-b-2 p-2 ">{task.title}</td>
                  <td className="border-t-2 border-b-2 p-2">{task.description}</td>
                  <td className="border-t-2  border-b-2 p-2 text-center"> <span className="bg-red-200 px-3 py-1 rounded">{task.priority}</span></td> 
                  <td className=" border-t-2  border-b-2 p-2">{task.status}</td> 
                  <td className=" border-t-2  border-b-2 p-2">{task.username}</td> 
                  <td className="border-t-2  border-b-2 p-2">
                  
                  <div className="  space-x-2">
                  <button 
                      onClick={() => handleEdit(task)} 
                      className="bg-blue-500 text-white   rounded "
                    >
                      <CiEdit/>
                    </button>
                    
                    <button 
                      // onClick={() => handleDelete(member._id)} 
                      className="bg-red-500 text-white  rounded"
                    >
                      <MdDelete />
                    </button>
                    <button 
                      
                      className="bg-red-500 text-white  rounded"
                    >
                      <GrFormView onClick={taskDetail}  />
                    </button>
                  </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
    {isModalOpen && (
      <EditModal task={currentTask} onClose={closemodal} fetchclose={fetchtaskData} />
    )}
    {isTaskModalOpen && (
      <TaskModal  onClose={closetaskCreationmodal} AllTask = {fetchtaskData} teamData={teamData}  />
    )}
{
  isDetailsModalOpen && (
    <TaskDetailsModal onClose={isDetailsModalOpen}  />
  )}



    </div>

    </>
  );
};

export default Task;
