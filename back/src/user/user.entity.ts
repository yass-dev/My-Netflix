import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./profile/profile.entity";

@Entity()
export class User extends BaseEntity
{
	@PrimaryGeneratedColumn()
	id: number;

	@Column({unique: true})
	email: string;

	@Column({select: false})
	password: string;

	@OneToMany(() => Profile, p => p.user)
	profiles: Profile[];
}