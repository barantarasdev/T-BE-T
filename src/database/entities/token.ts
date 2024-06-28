import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToOne,
} from "typeorm";
import { User } from "./user";

@Entity()
@Index(["user"], { unique: false })
export class Token {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  refreshToken: string;

  @ManyToOne(() => User, (user) => user.tokens)
  user: User;
}
