import "reflect-metadata";
import { User } from "../entities/user";
import { Factory } from "../entities/factory";
import { Product } from "../entities/product";
import { Product_factory } from "../entities/productFactory";
import { AppDataSource } from "../dataSource";
import { Token } from "../entities/token";
import { Message } from "../entities/message";

AppDataSource.initialize().then(async () => {
  //user1
  const user = new User();
  user.name = "John Doe";
  user.email = "john@example.com";
  user.password = "password123";
  await AppDataSource.getRepository(User).save(user);

  //user2
  const user2 = new User();
  user.name = "John Doe2";
  user.email = "john@example2.com";
  user.password = "password1232";
  await AppDataSource.getRepository(User).save(user2);

  // token
  const token = new Token();
  token.user = user;
  token.refreshToken = "jkfsd423jifiwjf213lk";
  await AppDataSource.getRepository(Token).save(token);

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

  //message
  const message = new Message();
  message.receiver_id = user.id;
  message.sender_id = user2.id;
  message.created_at = new Date();
  message.text = "Hello";
  await AppDataSource.getRepository(Message).save(productFactory);

  await AppDataSource.destroy();
});
