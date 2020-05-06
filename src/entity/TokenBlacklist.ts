import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class TokenBlacklist {
  @PrimaryColumn()
  token!: string;

  @Column("integer")
  expirationDate!: Date;
}
