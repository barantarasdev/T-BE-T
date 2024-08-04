import { getMessage } from "../../constants/messages";
import {
  createMessage,
  deleteMessage,
  getMessagesByUserId,
  updateMessage,
} from "../../database/services/message";
import { BadRequestError } from "../../error";
import { CreateMessageDto } from "./dto/createMessage.dto";
import { UpdateMessageDto } from "./dto/updateMessage.dto";

class MessageService {
  async getMessagesByUserId(senderId: string) {
    return await getMessagesByUserId(senderId);
  }

  async createMessage(senderId: string, dto: CreateMessageDto) {
    return await createMessage(senderId, dto);
  }

  async updateMessage(id: string, dto: UpdateMessageDto) {
    return await updateMessage(id, dto);
  }

  async deleteMessage(id: string) {
    return await deleteMessage(id);
  }
}

export default MessageService;
