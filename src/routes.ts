import { Router } from "express";
import AuthMiddleware from "./middlewares/AuthMiddlewares";
import AuthController from "./controllers/AuthController";
import UserController from "./controllers/UserController";


const routes = Router();

routes.post("/users", UserController.store)
routes.post("/auth", AuthController.authenticate)
routes.get("/users", AuthMiddleware, UserController.index)



export {routes}