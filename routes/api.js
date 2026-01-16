import { Router } from "express";
import { fetchDataFromApi } from "../controllers/api_fetch.controller.js";

const apiRouter = Router();

apiRouter.get('/', fetchDataFromApi);

export default apiRouter;