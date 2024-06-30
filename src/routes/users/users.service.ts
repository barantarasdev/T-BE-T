import * as bcrypt from "bcrypt";
import { UpdateUserDto } from "./dto/updateUser.dto";
import {
  getUserById,
  getUsers,
  updateUser,
} from "../../database/services/auth";

class UsersService {
  async getUsers() {
    return await getUsers();
  }

  async getUserById(userId: string) {
    return await getUserById(userId);
  }

  async updateUser(userId: string, dto: UpdateUserDto) {
    const { name, email, password } = dto;
    const hashedPassword: string = await bcrypt.hash(password, 10);

    return await updateUser(userId, {
      email,
      name,
      password: hashedPassword,
    });
  }
}

export default UsersService;
