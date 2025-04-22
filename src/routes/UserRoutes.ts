import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

const middleware = new AuthMiddleware()

const router = Router();

router.post('/register', UserController.register.bind);
router.post('/login', UserController.login.bind);
router.get('/users/', middleware.validaToken, UserController.getAll);

export default router;