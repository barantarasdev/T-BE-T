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
    .send(await messageService.getMessagesByUserId(req.user?.userId || ""));
});

messageRoutes.post("/", async (req: CustomRequest, res) => {
  res
    .status(201)
    .send(await messageService.createMessage(req.user?.userId || "", req.body));
});

messageRoutes.put("/:id", async ({ params, body }, res) => {
  return res
    .status(200)
    .send(await messageService.updateMessage(params.id, body));
});

messageRoutes.delete("/:id", async ({ params }, res) => {
  return res.status(200).send(await messageService.deleteMessage(params.id));
});

export default messageRoutes;
