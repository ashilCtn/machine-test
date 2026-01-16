import { Router } from "express";
import readDataFromDb from "../controllers/read_from_local.controller.js";

const dbRouter = Router();

dbRouter.get('/', readDataFromDb);

export default dbRouter;