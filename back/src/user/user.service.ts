import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Profile } from "src/user/profile/profile.entity";
import { User } from "src/user/user.entity";
import { Repository } from "typeorm";
import { ProfileService } from "./profile/profile.service";

@Injectable()
export class UserService
{
	constructor(@InjectRepository(User) private repository: Repository<User>,
				private profile_service: ProfileService) {}

	async createUser(email: string, password: string): Promise<User>
	{
		let user = new User;
		user.email = email;
		user.password = password;

		const profile1 = await this.profile_service.create('Fabricio', '/img/profiles/0/0.png');
		const profile2 = await this.profile_service.create('Jean', '/img/profiles/0/1.png');
		const profile3 = await this.profile_service.create('Anthony', '/img/profiles/0/2.png');
		const profile4 = await this.profile_service.create('Maxime', '/img/profiles/0/3.png');

		user.profiles = [profile1, profile2, profile3, profile4];

		try
		{
			user = await this.repository.save(user);
		}
		catch(e)
		{
			if (e.code == "ER_DUP_ENTRY")
				throw new ConflictException("An account with this email already exists");
			else
			{
				console.error(e);
				throw new InternalServerErrorException();
			}
		}
		return user;
	}

	async getUser(email: string, password: string): Promise<User >
	{
		let user = await this.repository.createQueryBuilder("user")
			.where("user.email = :email", {email})
			.andWhere("user.password = :password", {password})
			.getOne();
		return user;
	}

	async getUserById(user_id: number)
	{
		let user = await this.repository.createQueryBuilder("user")
			.leftJoinAndSelect("user.profiles", "profiles")
			.where("user.id = :user_id", {user_id})
			.getOne();
		return user;
	}
}