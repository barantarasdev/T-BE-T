import express from "express";
import {
  CustomRequest,
  verifyAccessToken,
} from "../../middleware/verifyAccessToken";
import MessageService from "./message.service";

const messageRoutes = express.Router();
const messageService = new MessageService();

messageRoutes.use(verifyAccessToken);

messageRoutes.get("/", async (req: CustomRequest, res) => {
  return res
    .status(200)
    .send(await messageService.getMessagesBySenderId(req.user?.userId || ""));
});

messageRoutes.post("/", async (req: CustomRequest, res) => {
  res
    .status(201)
    .send(await messageService.createMessage(req.user?.userId || "", req.body));
});

messageRoutes.put("/", async (req: CustomRequest, res) => {
  return res.status(200).send(await messageService.updateMessage(req.body));
});

messageRoutes.delete("/", async (req: CustomRequest, res) => {
  return res
    .status(200)
    .send(await messageService.deleteMessage(req.user?.userId || ""));
});

export default messageRoutes;
