import React, { useState,useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoCalendarNumberOutline } from "react-icons/io5";
import Cookies from "js-cookie";
import axios from "axios";
const TaskModal = ({ onClose  ,teamData , AllTask}) => {
  const baseurl = process.env.REACT_APP_BASE_URL
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Low",
    status: "Pending",
    dueDate: new Date(),
    assignedTo:""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 
  
  const handleDateChange = (date) => {
    setFormData({ ...formData, dueDate: date });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get("token");
  
    try {
       await axios.post(`${baseurl}/api/tasks/create`,formData,
        {
          headers:{
            Authorization:`Bearer ${token}`,
            "Content-Type":"application/json"
          }
        }
      )
  
      onClose();
      AllTask();
    } catch (error) {
      console.log("errorr",error)
    }
  };

  return (
    <>
      <div className="bg-black/40 h-screen w-screen top-0 left-0 fixed backdrop-blur-[3px]">
        <div className="bg-gray-400 w-1/3 rounded-md shadow-2xl flex justify-center absolute items-center p-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="modal w-full p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">Create New Task</h2>
              <div>
                <label className="block mb-1 text-white">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 p-2 w-full"
                />
              </div>
              <div>
                <label className="block mb-1 text-white">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 p-2 w-full"
                />
              </div>
              <div>
                <label className="block mb-1 text-white">Priority</label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 w-full"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 text-white">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 w-full"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 text-white">Due Date</label>
                <div className="flex">
                <DatePicker
                  selected={formData.dueDate}
                  onChange={handleDateChange}
                  dateFormat="YYYY/MM/DD" 
                  className="border border-gray-300 p-2 w-full"
                />
                {/* <IoCalendarNumberOutline size={20} /> */}
                </div>
              </div>

              <div>
                <label className="block mb-1 text-white">AssignedTo</label>
                <select
                className="border border-gray-300 p-2 w-full"
                required
                name="assignedTo"
                onChange={handleChange}
                value={formData.assignedTo}
                >
                  <option value="">
select the member
                  </option>
               {teamData.map((mem)=>(
                <option key={mem._id} value={mem._id}>{mem.username}</option>
               ))}

                </select>
              </div>
      
              <div className="flex gap-4" >
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Create
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskModal;
