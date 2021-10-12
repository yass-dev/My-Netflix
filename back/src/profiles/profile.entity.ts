import { User } from "src/users/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Profile extends BaseEntity
{
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	img: string;

	@ManyToOne(() => User, user => user.profiles)
	user: User;
}