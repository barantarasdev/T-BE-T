import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from "typeorm";
import { Product } from "./product";
import { Factory } from "./factory";

@Entity()
export class Product_factory {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  product_id: string;

  @Column()
  factory_id: string;

  @ManyToOne(() => Product, (product) => product.factory)
  @JoinColumn({ name: "product_id" })
  product: Product;

  @ManyToOne(() => Factory, (factory) => factory.products)
  @JoinColumn({ name: "factory_id" })
  factory: Factory;
}
