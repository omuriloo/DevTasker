import { Entity, PrimaryGeneratedColumn, Column, TableForeignKey, OneToMany, ManyToMany, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Tasks {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 100, nullable: false })
  title: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  description: string;

  @Column({ type: "varchar", length: 30, nullable: false })
  status: string;

  @Column({ type: "varchar", length: 50, nullable: false })
  deliverydate: string;

  @Column({ type: "int", length: 50, nullable: false })
  userid: number;

  @ManyToOne(() => User) //relação ManyToOne com a entidade User, o parametro ta dizendo qual a entidade q vai ser relacionada.
  @JoinColumn({ name: "userid"})  //isso aqui define qual coluna da tabela vai ser a chave estrangeira.
  user: User;

  constructor(title: string, description: string, status: string, deliverydate: string, userid: number){
    this.title = title;
    this.description = description;
    this.status = status;
    this.deliverydate = deliverydate;
    this.userid = userid;
  }
}
