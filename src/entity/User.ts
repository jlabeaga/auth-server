import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  enabled!: boolean;

  @Column()
  role!: string;
}
