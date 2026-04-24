import express from "express";
import mongoose from "mongoose";
//import { Jwt } from "jsonwebtoken";
import { z } from "zod";

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

const app = express();
const port = 3000;

app.post("/api/v1/signup", (req, res) => {
    
});

app.post("/api/v1/signin", (req, res) => {});

app.post("/api/v1/content", (req, res) => {});

app.get("/api/v1/content", (req, res) => {});

app.delete("/api/v1/content", (req, res) => {});

app.post("/api/v1/brain/share", (req, res) => {});

app.get("/api/v1/brain/:shareLink", (req, res) => {});

app.listen(port);
