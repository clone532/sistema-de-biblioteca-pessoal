import { Router } from "express";
import { login, register, show_login } from "../controllers/user_controller";

const userRoutes = Router();

userRoutes.get('/user/login', show_login);
userRoutes.post('/user/register', register);
userRoutes.post('/user/login', login)

export {
    userRoutes
}