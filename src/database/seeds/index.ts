import "reflect-metadata";
import { User } from "../entities/user";
import { Factory } from "../entities/factory";
import { Product } from "../entities/product";
import { Product_factory } from "../entities/productFactory";
import { AppDataSource } from "../dataSource";

AppDataSource.initialize().then(async () => {
  //user
  const user = new User();
  user.name = "John Doe";
  user.email = "john@example.com";
  user.password = "password123";
  await AppDataSource.getRepository(User).save(user);

  //factory
  const factory = new Factory();
  factory.name = "Factory 1";
  await AppDataSource.getRepository(Factory).save(factory);

  //product
  const product = new Product();
  product.name = "Product 1";
  product.price = 100;
  product.quantity = 10;
  product.factory.id = factory.id;
  await AppDataSource.getRepository(Product).save(product);

  //productFactory
  const productFactory = new Product_factory();
  productFactory.factory_id = factory.id;
  productFactory.product_id = product.id;
  await AppDataSource.getRepository(Product_factory).save(productFactory);

  await AppDataSource.destroy();
});
