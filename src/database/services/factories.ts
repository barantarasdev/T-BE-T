import { Factory } from "../entities/factory";
import { AppDataSource } from "../dataSource";
import { CreateFactoryDto } from "../../routes/factories/dto/createFactory.dto";

export async function createFactory({ name }: CreateFactoryDto) {
  return await AppDataSource.getRepository(Factory).save({
    name,
  });
}
