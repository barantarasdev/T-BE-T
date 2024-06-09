import { Product } from "../entities/product";
import { AppDataSource } from "../dataSource";
import { SearchProductsDto } from "../../routes/products/dto/searchProducts.dto";
import { CreateProductDto } from "../../routes/products/dto/createProduct.dto";
import { Product_factory } from "../entities/productFactory";

export async function getAllProducts() {
  return await AppDataSource.getRepository(Product)
    .createQueryBuilder("product")
    .select([
      "product.id",
      "product.name",
      "product.quantity",
      "product_factory.factory_id AS factoryId",
      "COUNT(product_factory) AS duplicatedProducts",
    ])
    .leftJoin(
      "product_factory",
      "product_factory",
      "product_factory.product_id = product.id",
    )
    .leftJoin("factory", "factory", "factory.id = product_factory.factory_id")
    .groupBy("product.id")
    .addGroupBy("product.name")
    .addGroupBy("product.quantity")
    .addGroupBy("product_factory.factory_id")
    .getRawMany();
}

export async function searchProducts({
  partOfProductName,
  lastId,
  limit,
}: SearchProductsDto) {
  return await AppDataSource.getRepository(Product)
    .createQueryBuilder("product")
    .where("product.id < :lastId", { lastId })
    .andWhere("product.name LIKE :name", { name: `%${partOfProductName}%` })
    .orderBy("product.id")
    .limit(limit)
    .getMany();
}

export async function createProduct({
  name,
  quantity,
  factoryId,
  price,
}: CreateProductDto) {
  const productRepository = AppDataSource.getRepository(Product);
  const newProduct = productRepository.create({
    name,
    quantity,
    price,
    factory: { id: factoryId },
  });

  return await productRepository.save(newProduct);
}
