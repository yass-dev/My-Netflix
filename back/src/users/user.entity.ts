import { Exclude } from "class-transformer";
import { profile } from "console";
import { Profile } from "src/profiles/profile.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(["email"])
export class User extends BaseEntity
{
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	email: string;

	@Column()
	@Exclude()
	password: string;

	@OneToMany(() => Profile, profile => profile.user)
	profiles: Profile[];
}