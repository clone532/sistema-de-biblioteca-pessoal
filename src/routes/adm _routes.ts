import { Router } from "express";
import { show_adm } from "../controllers/adm_controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const admRoutes = Router();

admRoutes.get('/adm', authMiddleware, show_adm);

export {
    admRoutes
}