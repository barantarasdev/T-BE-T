import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../../database/services/users";
import { CreateUserDto } from "./dto/createUser.dto";
import * as bcrypt from "bcrypt";
import { UpdateUserDto } from "./dto/updateUser.dto";

class UsersService {
  async getUsers() {
    return await getUsers();
  }

  async getUserById(userId: string) {
    return await getUserById(userId);
  }

  async createUser(dto: CreateUserDto) {
    const { name, email, password } = dto;
    const hashedPassword: string = await bcrypt.hash(password, 10);

    return await createUser({ email, name, password: hashedPassword });
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

  async deleteUser(userId: string) {
    return await deleteUser(userId);
  }
}

export default UsersService;
