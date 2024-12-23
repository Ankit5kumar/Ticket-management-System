import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
const EditModal = ({ task, onClose, fetchclose }) => {
  const baseurl = process.env.REACT_APP_BASE_URL
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Low", 
    status: "Pending", 
  });

  
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get("token");
    try {
      await axios.put(`${baseurl}/api/tasks/${task._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      onClose();
      fetchclose();
    } catch (error) {
      console.error("Error updating task:", error);
      // Handle error (e.g., show a message)
    }
  };

  return (
    <>
      <div className="bg-black/40 backdrop-blur-[3px] h-screen w-screen fixed top-0 left-0 ">
        <div className="bg-gray-400 w-1/3 rounded-md shadow-2xl  flex justify-center items-center p-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="modal w-full ">
            <form onSubmit={handleSubmit}>
              <h2>Edit Task</h2>
              <div>
                <label>Title</label>
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
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 p-2 w-full"
                />
              </div>
              <div>
                <label>Priority</label>
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
                <label>Status</label>
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
              <div className="flex items-center pt-4 gap-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Save
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

export default EditModal;
