import express from "express";
import { taskController } from "../controller/taskController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
export const taskRoutes = express.Router();
taskRoutes.post("/task/add",isAuthenticated,taskController.taskadd);
taskRoutes.put("/task/update/:id",isAuthenticated,taskController.taskupdate);
taskRoutes.delete("/task/delete/:id",isAuthenticated,taskController.taskremove);
taskRoutes.get("/task/get",isAuthenticated,taskController.taskget);
taskRoutes.get("/task/get/:id",isAuthenticated,taskController.taskgetbyid)
