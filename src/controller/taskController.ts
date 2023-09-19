
import { taskModel } from "../db/taskModels/taskModel.js";
export const taskController = {
  async taskadd(req: any, res: any) {
    try {
      const { id, title, description, duedate, priority } = req.body;

      // Create a new task object
      const newTask = {
        id,
        title,
        description,
        duedate,
        priority,

        status: "pending", // Default status is "pending"
      };

      // Find the task list by its ID or create it if it doesn't exist
      let taskList = await taskModel.findOne({ id: req.decoded.data.id });
      if (!taskList) {
        taskList = await taskModel.create({
          id: req.decoded.data.id,
          tasks: [],
        });
      }
      // Add the new task to the task list
      taskList.tasks.push(newTask);
      await taskList.save();

      res.status(201).json({ msg: "Task added successfully", task: newTask });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async taskremove(req: any, res: any) {
    try {
      const taskId = req.params.id;

      // Find the task list by its ID
      const taskList = await taskModel.findOne({ id: req.decoded.data.id });

      if (!taskList) {
        return res.status(404).json({ error: "Task list not found" });
      }

      // Find and remove the task by its ID
      const removedTask = taskList.tasks.find(
        (task: any) => task.id === taskId
      );
      if (!removedTask) {
        return res.status(404).json({ error: "Task not found" });
      }

      taskList.tasks.pull({ id: taskId }); // Remove the task
      await taskList.save();

      res
        .status(200)
        .json({ msg: "Task removed successfully", task: removedTask });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async taskupdate(req: any, res: any) {
    try {
      const taskId = req.params.id;
      const updatedTaskData = req.body;

      // Find the task list by its ID
      const taskList = await taskModel.findOne({ id: req.decoded.data.id });

      if (!taskList) {
        return res.status(404).json({ error: "Task list not found" });
      }

      // Find and update the task by its ID
      const updatedTask = taskList.tasks.find(
        (task: any) => task.id === taskId
      );
      if (!updatedTask) {
        return res.status(404).json({ error: "Task not found" });
      }

      // Update task properties
      Object.assign(updatedTask, updatedTaskData);
      await taskList.save();

      res
        .status(200)
        .json({ msg: "Task updated successfully", task: updatedTask });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async taskget(req: any, res: any) {
    try {
      // Find the task list by its ID
      const taskList = await taskModel.findOne({ id: req.decoded.data.id });

      if (!taskList) {
        return res.status(404).json({ error: "Task list not found" });
      }

      res.status(200).json({ tasks: taskList.tasks });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async taskgetbyid(req:any,res:any){
    try {
      const taskId = req.params.id; // Assuming you pass taskId as a parameter
  
      // Find the task list by its ID
      const taskList = await taskModel.findOne({ id: req.decoded.data.id });
  
      if (!taskList) {
        return res.status(404).json({ error: "Task list not found" });
      }
  
      // Find the specific task by taskId
      const task = taskList.tasks.find((task:any) => task.id === taskId);
  
      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }
  
      res.status(200).json({ task });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
}
}
