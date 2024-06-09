import { CreateProductFactoryDto } from "../../routes/productFactories/dto/createProductFactory.dto";
import { AppDataSource } from "../dataSource";
import { Product_factory } from "../entities/productFactory";

export async function createProductFactory({
  productId,
  factoryId,
}: CreateProductFactoryDto) {
  const productFactoryRepository = AppDataSource.getRepository(Product_factory);
  const newProductFactory = productFactoryRepository.create({
    product_id: productId,
    factory_id: factoryId,
  });

  return await productFactoryRepository.save(newProductFactory);
}
