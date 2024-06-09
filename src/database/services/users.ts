import { getMessage } from "../../constants/messages";
import { CreateUserDto } from "../../routes/users/dto/createUser.dto";
import { UpdateUserDto } from "../../routes/users/dto/updateUser.dto";
import { AppDataSource } from "../dataSource";
import { User } from "../entities/user";

export async function getUsers() {
  return await AppDataSource.getRepository(User).find();
}

export async function getUserById(userId: string) {
  const user = await AppDataSource.getRepository(User).findOneBy({
    id: userId,
  });

  if (!user) {
    throw new Error(getMessage().NOT_FOUND);
  }

  return user;
}

export async function createUser({ name, email, password }: CreateUserDto) {
  return await AppDataSource.getRepository(User).save({
    name,
    email,
    password,
  });
}

export async function updateUser(
  userId: string,
  { name, email, password }: UpdateUserDto,
) {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id: userId });

  if (!user) {
    throw new Error(getMessage().NOT_FOUND);
  }

  user.name = name;
  user.email = email;
  user.password = password;

  return await userRepository.save(user);
}

export async function deleteUser(userId: string) {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id: userId });

  if (!user) {
    throw new Error(getMessage().NOT_FOUND);
  }

  return await userRepository.remove(user);
}
