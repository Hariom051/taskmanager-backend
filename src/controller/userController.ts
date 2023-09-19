import { userGoogleModel, userModel } from "../db/userModels/usermodel.js";
import { hashing } from "../services/hashing.js";
import { tokengenerate } from "../services/tokenService.js";
import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
export const userController = {
  async register(req: Request, res: Response) {
    try {
      const isExist = await userModel.findOne({ email: req.body.email }).exec();
      if (isExist && isExist._id)
        return res.status(401).json({ error: "Already Exists" });
      const user = await userModel.create({
        ...req.body,
        password: hashing.hashedPassword(req.body.password),
        id: uuidv4(),
      });
      if (user && user._id)
        return res.status(201).json({ msg: "Register Successfully!!!" });
    } catch (e) {
      res.status(500).json({ error: "internal server error" });
    }
  },
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userModel.findOne({ email: req.body.email }).exec();
      if (!user)
        return res.status(401).json({ error: "invalid username and password" });
      else {
        if (hashing.comparePassword(req.body.password, user.password)) {
          // res.status(201).json({msg:"login successfully",user:{email:user.email,name:user.name}})

          const token = tokengenerate({
            name: user.name,
            email: user.email,
            id: user.id,
          });
          // res
          //   .cookie("accessToken", token, {
          //     httpOnly: true, // Ensures the cookie is only accessible via HTTP(S)
          //     secure: true, // Ensures the cookie is only sent over HTTPS
          //     maxAge: 24 * 60 * 60 * 1000, // One day
          //     sameSite: "none",
          //     path: "/",
          //     domain: "localhost", // Adjust the domain as needed
          //   })
            res.status(200).json({ msg: "login success", user: { ...user,token:token } });
        } else {
          res.status(401).json({ error: "invalid username and password" });
        }
      }
    } catch (e) {
      res.status(500).json({ error: "internal server error" });
    }
  },
  async profile(req: Request, res: Response) {},

  async logout(req: any, res: any) {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      domain: "localhost", // Adjust the domain as needed
    });

    // Send a response indicating successful logout
    res.status(200).json({ msg: "Logout successful" });
  },
  async userGoogle(req: Request, res: Response) {
    const user = await userGoogleModel
      .findOne({ email: req.body.email })
      .exec();
    let createdUser;
    if (!user) {
      createdUser = await userGoogleModel.create({ ...req.body, id: uuidv4() });
    }
    const token = tokengenerate({
      name: user ? user.name : createdUser.name,
      email: user ? user.email : createdUser.email,
      id: user ? user.id : createdUser.id,
    });
    // res
    //   .cookie("accessToken", token, {
    //     httpOnly: true, // Ensures the cookie is only accessible via HTTP(S)
    //     secure: true, // Ensures the cookie is only sent over HTTPS
    //     maxAge: 24 * 60 * 60 * 1000, // One day
    //     sameSite: "none",
    //     path: "/",
    //     domain: "localhost", // Adjust the domain as needed
    //   })
    res.status(200).json({ msg: "login success",token:token });
  },
};
