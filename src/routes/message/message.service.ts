import {
  createMessage,
  deleteMessage,
  getMessagesByUserId,
  updateMessage,
} from "../../database/services/message";
import { CreateMessageDto } from "./dto/createMessage.dto";
import { UpdateMessageDto } from "./dto/updateMessage.dto";

class MessageService {
  async getMessagesBySenderId(senderId: string) {
    return await getMessagesByUserId(senderId);
  }

  async createMessage(senderId: string, dto: CreateMessageDto) {
    return await createMessage(senderId, dto);
  }

  async updateMessage(dto: UpdateMessageDto) {
    return await updateMessage(dto);
  }

  async deleteMessage(senderId: string) {
    return await deleteMessage(senderId);
  }
}

export default MessageService;
