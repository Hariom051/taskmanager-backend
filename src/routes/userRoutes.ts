import express from "express";
import { userController } from "../controller/userController.js";
export const userRoutes = express.Router();
userRoutes.post("/register",userController.register);
userRoutes.post("/login",userController.login);
// userRoutes.get("/logout",userController.logout)
userRoutes.post("/user/google",userController.userGoogle)
