const mongoose = require("mongoose");
const Task = require("../models/Task");
const Team = require("../models/Team");
const User = require("../models/User");

const createTask = async (req, res) => {
  const {
    title,
    description,
    dueDate,
    priority,
    status,
    assignedTo,
    // managerId,
  } = req.body;
  const missingField = !title
    ? "title"
    : !description
    ? "description"
    : !dueDate
    ? "dueDate"
    : null;

  if (missingField) {
    return res.status(400).json({ msg: `${missingField} not provided` });
  }

  const { id, roles } = req.user;

  if (roles[0] === "Manager") {
    const managerTeam = await Team.findOne({ manager: id });

    if (!managerTeam)
      return res
        .status(404)
        .json({ msg: "This manager does not have the Team" });
    const assigneeExist = managerTeam.members;

    if (!assigneeExist.includes(assignedTo)) {
      return res
        .status(404)
        .json({
          msg: "This assignee is not part of your Team. you can only create Task only for your Team member",
        });
    }
  }
console.log("dueDate",dueDate)
  // const dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4})$/;

  // if (!dateRegex.test(dueDate)) {
  //   return res
  //     .status(400)
  //     .json({ msg: "Invalid dueDate format. Please use DD-MM-YYYY." });
  // }

  const [day,month,year] = dueDate.split("-");
  
  console.log("day, month, year",day, month, year)
  // T00:00:00Z
  // const formattedDueDate = new Date(`${year}-${month}-${day}`);

  // if (isNaN(formattedDueDate.getTime())) {
  //   return res.status(400).json({ msg: "Invalid date provided." });
  // }

  try {
    const userToAssign = await User.findById(assignedTo);
    if (!userToAssign) return res.status(404).json({ msg: "User not found" });

    let effectiveManagerId = null;
    const roles = req.user.roles;

    if (roles.includes("Admin")) {
      effectiveManagerId = managerId;
      if (!effectiveManagerId) {
        return res
          .status(400)
          .json({ msg: "Manager ID must be provided for Admins." });
      }
    } else if (roles.includes("Manager")) {
      effectiveManagerId = req.user.id;
    }

    // const managerTeamId = req.user.team;
    // const isUserInSameTeam = userToAssign.team.equals(managerTeamId);

    // if (!isUserInSameTeam) {
    //     return res.status(403).json({ message: 'You can only assign tasks to users in your team' });
    // }

    // Create the task with optional priority and status
    const taskData = {
      title,
      description,
      dueDate: dueDate,
      priority: priority || "Low",
      status: status || "Pending",
      CreatedBy: req.user.id,
      managerId: effectiveManagerId,
      assignedTo: assignedTo || null,
    };

    const task = await Task.create(taskData);

    return res.status(201).json({ msg: "Task Created", task });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error", error });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user.id }).populate(
      "assignedTo"
    );
    return res.json({ msg: "Assigned tasks", tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something broke" });
  }
};
const TaskbyManager = async (req, res) => {
  try {
    const tasks = await Task.find({ managerId: req.user.id })
    if(!tasks) return res.status(200).json({msg:"No task found"})
    return res.json({ msg: "CreatedByManager", tasks });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something broke" });
  }
};
const getAllTask = async (req, res) => {
  try {
    const Alltasks = await Task.find();
    return res.json({ msg: "Assigned tasks", Alltasks });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something broke" });
  }
};

const update = async (req, res) => {
  const { task_id } = req.params; // Get task_id from request params
  const { description, dueDate, priority, status, assignedTo , title } = req.body;

  try {
      // const { id, roles } = req.user;
      // const managerId = new mongoose.Types.ObjectId(`${id}`); 

      // Find the task by task_id instead of managerId
      const task = await Task.findById({ _id: task_id}); 
      
      if (!task) return res.status(404).json({ msg: "Task not found" });

      // Update fields only if they are provided
      if (title) task.title = title;
      if (description) task.description = description;
      if (dueDate) task.dueDate = dueDate;
      if (priority) task.priority = priority;
      if (status) task.status = status;
      if (assignedTo) task.assignedTo = assignedTo;
console.log("updated",task)
      await task.save(); // Save updated task
      return res.status(200).json({ msg: "Task updated successfully" });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error", error });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // if (task.assignedTo.toString() !== req.user.id && !req.user.roles.includes('Admin')) {
    //     return res.status(403).json({ message: 'Forbidden' });
    // }

    await Task.findByIdAndDelete(id);

    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createTask,
  getTasks,
  update,
  deleteTask,
  getAllTask,
  TaskbyManager
};
