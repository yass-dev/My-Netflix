import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user.entity";

@Entity()
export class Profile extends BaseEntity
{
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	image: string;

	@ManyToOne(() => User, u => u.profiles, {onDelete: 'CASCADE'})
	user: User;
}