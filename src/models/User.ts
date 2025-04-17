import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 100, nullable: false})
  name: string;

  @Column()
  email: string;

  constructor(name : string, email: string){
    this.name = name;
    this.email = email
  }
}