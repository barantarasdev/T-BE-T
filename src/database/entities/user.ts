import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
} from "typeorm";
import { Product } from "./product";
import { Token } from "./token";

@Entity("user_")
@Unique(["email"])
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Product, (product) => product.user)
  products?: Product[];

  @OneToMany(() => Token, (token) => token.user)
  tokens: Token[];
}
