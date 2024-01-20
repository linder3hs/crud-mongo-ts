import { Router } from "express";
import * as Controller from "./controller";

const chatRouter = Router();

chatRouter.route("/:transmiterId/:receiverId").get(Controller.list);
chatRouter.route("/").get(Controller.store);

export default chatRouter;
