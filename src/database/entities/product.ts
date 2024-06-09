import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
} from "typeorm";
import { User } from "./user";
import { Factory } from "./factory";

@Entity("product")
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @ManyToMany(() => User, (user) => user.products)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Factory, (factory) => factory.products)
  @JoinColumn({ name: "factory_id" })
  factory: Factory;
}
