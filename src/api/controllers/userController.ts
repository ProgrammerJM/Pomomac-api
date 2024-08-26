import { Request, Response } from "express";
import userServices from "../services/userServices";

async function createUser(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const user = await userServices.CreateUser(email, password);
    console.log("User created successfully!");
    res.status(201).json(user);
  } catch (err: any) {
    res.status(500).json({ error: err });
  }
}

async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await userServices.FindAllUsers();
    res.status(200).json(users);
  } catch (err: any) {
    res.status(500).json({ error: err });
  }
}

export default { createUser, getAllUsers };
