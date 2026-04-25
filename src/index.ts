import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { z } from "zod";
import bcrypt from "bcrypt";
import db from './db.js'
const { userModel, contentModel, tagsModel, linkModel } = db
import dotenv from "dotenv"
dotenv.config()

const app = express();
const port = Number(process.env.PORT) || 3000;
const JWT_SECRET = process.env.JWT_SECRET as string;
const MONGO_URL = process.env.MONGO_URL as string;

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .max(20, "Password cannot exceed 20 characters")
  .regex(/[a-z]/, "Must contain at least one lowercase letter")
  .regex(/[A-Z]/, "Must contain at least one uppercase letter")
  .regex(/[0-9]/, "Must contain at least one number")
  .regex(/[^a-zA-Z0-9]/, "Must contain at least one special character");

const userSchema = z
  .string()
  .min(3, "Username must be at least 8 characters long")
  .max(10, "Username cannot exceed 20 characters");

app.post("/api/v1/signup", async (req, res) => {
  try{
    const username = userSchema.parse(req.body.username);
    const password = passwordSchema.parse(req.body.password);
    const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.create({
      username,
      password: hashedPassword,
    })
    res.status(200).json({
      message:"you are signed up"
    })
  }catch (e: any){
    if(e.code === 11000){
      res.status(403).json({
        message:"User already exists"
      })
    }else if(e?.name == "ZodError"){
      res.status(411).json({
        message:"Error in inputs"
      })
    }else{
      res.status(500).json({
        message:"Server Error"
      })
    }
  }

});

app.post("/api/v1/signin", async(req, res) => {
  try{
    const username = req.body.username;
    const password = req.body.password;

    const response = await userModel.findOne({
      username: username
    });

    if(response){
      const passwordMatch = await bcrypt.compare(password, response.password);
      if(passwordMatch){
        const token = jwt.sign({
          id: response._id
        }, JWT_SECRET);

        res.status(200).json({
          token,
          message:"you are signed in"
        })
      }else{
        res.status(403).json({
          message:"incorrect password"
        })
        return;
      }
    }else{
      res.status(403).json({
        message:"username not found"
      })
      return
    }
  }catch(e){
    res.status(500).json({
      message:"Server Error"
    })
  }
  
});

app.post("/api/v1/content", async(req, res) => {

});

app.get("/api/v1/content", async(req, res) => {});

app.delete("/api/v1/content", async(req, res) => {});

app.post("/api/v1/brain/share", async(req, res) => {});

app.get("/api/v1/brain/:shareLink", async(req, res) => {});

async () =>{
  await mongoose.connect(MONGO_URL);
  app.listen(port);
  console.log("Listening on port "+port);
}


