import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { profile } from 'console';
import e from 'express';
import { Profile } from 'src/profiles/profile.entity';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService
{
	constructor (
					@InjectRepository(User) private repository: Repository<User>,
					@InjectRepository(Profile) private profileRepository: Repository<Profile>
				)
	{

	}

	async createUser(email: string, password: string): Promise<User>
	{
		let user = new User;
		user.email = email;
		user.password = password;

		let profile1 = new Profile;
		profile1.name = 'Fabricio';
		profile1.img = '/img/profiles/0/0.png';
		await this.profileRepository.save(profile1);

		let profile2 = new Profile;
		profile2.name = 'Jean';
		profile2.img = '/img/profiles/0/1.png';
		await this.profileRepository.save(profile2);

		let profile3 = new Profile;
		profile3.name = 'Anthony';
		profile3.img = '/img/profiles/0/2.png';
		await this.profileRepository.save(profile3);

		let profile4 = new Profile;
		profile4.name = 'Maxime';
		profile4.img = '/img/profiles/0/3.png';
		await this.profileRepository.save(profile4);

		user.profiles = [profile1, profile2, profile3, profile4];

		try
		{
			user = await this.repository.save(user);
		}
		catch(e)
		{
			if (e.code == "ER_DUP_ENTRY")
				throw new ConflictException("An account with this email already exists");
			console.log(e);
		}
		return user;
	}

	async checkUser(email: string, password: string): Promise<User>
	{
		let user = await this.repository.createQueryBuilder("user")
			.select("user")
			.where("user.email = :email")
			.andWhere("user.password = :password")
			.setParameters({email: email, password: password})
			.getOne();
		return (user ? user : null);
	}

	async findOne(id: number)
	{
		return await this.repository.findOne(id,
		{
			relations: ["profiles"]
		});
	}

	async getProfiles(id: number): Promise<User>
	{
		return await this.repository.createQueryBuilder("user")
			.innerJoinAndSelect("user.profiles", "profiles")
			.getOne();
	}
}