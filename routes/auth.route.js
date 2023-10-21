import express from "express";
import { login, register, getEmail } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/email/:email", getEmail );

export default router;
