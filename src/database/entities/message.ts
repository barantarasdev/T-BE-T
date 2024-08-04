import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./user";

@Entity("message")
export class Message {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  text: string;

  @Column({ type: "timestamptz" })
  created_at: Date;

  @Column()
  sender_id: string;

  @Column()
  receiver_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "sender_id" })
  sender: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: "receiver_id" })
  receiver: User;
}
