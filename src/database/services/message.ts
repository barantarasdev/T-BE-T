import { getMessage } from "../../constants/messages";
import { NotFoundError } from "../../error";
import { CreateMessageDto } from "../../routes/message/dto/createMessage.dto";
import { UpdateMessageDto } from "../../routes/message/dto/updateMessage.dto";
import { AppDataSource } from "../dataSource";
import { Message } from "../entities/message";

export async function getMessagesByUserId(userId: string) {
  return await AppDataSource.getRepository(Message).find({
    where: { sender_id: userId },
  });
}

export async function createMessage(
  senderId: string,
  { text, receiverId }: CreateMessageDto,
) {
  return await AppDataSource.getRepository(Message).save({
    text,
    sender_id: senderId,
    receiver_id: receiverId,
    created_at: new Date(),
  });
}

export async function updateMessage(id: string, { text }: UpdateMessageDto) {
  const messageRepository = AppDataSource.getRepository(Message);
  const message = await messageRepository.findOneBy({
    id,
  });

  if (!message) {
    throw new NotFoundError(getMessage("message").NOT_FOUND);
  }

  message.text = text;

  return await messageRepository.save(message);
}

export async function deleteMessage(id: string) {
  const messageRepository = AppDataSource.getRepository(Message);
  const message = await messageRepository.findOneBy({ id });

  if (!message) {
    throw new NotFoundError(getMessage("message").NOT_FOUND);
  }

  return await messageRepository.remove(message);
}
