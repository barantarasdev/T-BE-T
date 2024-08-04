import request from "supertest";
import express from "express";
import messageRoutes from "../../../src/routes/message/message.route";
import MessageService from "../../../src/routes/message/message.service";
import { Message } from "../../../src/database/entities/message";
import { Chance } from "chance";

jest.mock("../../../src/routes/message/message.service");
jest.mock("../../../src/middleware/verifyAccessToken");

const mockMessageService =
  MessageService.prototype as jest.Mocked<MessageService>;

const app = express();
app.use(express.json());
app.use("/messages", messageRoutes);

const chance = new Chance();

describe("Message Routes", () => {
  it("should get messages by user id", async () => {
    const { message } = getMockedMessage();

    mockMessageService.getMessagesByUserId.mockResolvedValue([
      message as Message,
    ]);

    const response = await request(app)
      .get("/messages")
      .set("Authorization", "Bearer valid-token")
      .send();

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { ...message, created_at: message.created_at.toISOString() },
    ]);
  });

  it("should create a message", async () => {
    const { message } = getMockedMessage();

    mockMessageService.createMessage.mockResolvedValue(message as Message);

    const response = await request(app)
      .post("/messages")
      .set("Authorization", "Bearer valid-token")
      .send({ text: "text", receiverId: message.receiver_id });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      ...message,
      created_at: message.created_at.toISOString(),
    });
  });

  it("should update a message", async () => {
    const { message } = getMockedMessage();

    mockMessageService.updateMessage.mockResolvedValue({
      ...message,
      text: "new",
    } as Message);

    const response = await request(app)
      .put(`/messages/${message.id}`)
      .set("Authorization", "Bearer valid-token")
      .send({ text: "new", id: message.id });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      ...message,
      text: "new",
      created_at: message.created_at.toISOString(),
    });
  });

  it("should delete a message", async () => {
    const { message } = getMockedMessage();

    mockMessageService.deleteMessage.mockResolvedValue(message as Message);

    const response = await request(app)
      .delete(`/messages/${message.id}`)
      .set("Authorization", "Bearer valid-token")
      .send();

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      ...message,
      created_at: message.created_at.toISOString(),
    });
  });
});

export function getMockedMessage() {
  const message = {
    id: chance.guid(),
    text: chance.string(),
    sender_id: "user-id",
    receiver_id: chance.guid(),
    created_at: chance.date(),
  };

  return { message };
}
