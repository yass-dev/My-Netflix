import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Profile } from "./profile.entity";

@Injectable()
export class ProfileService
{
	constructor(@InjectRepository(Profile) private repository: Repository<Profile>) {}

	async create(name: string, image: string)
	{
		let profile = new Profile;
		profile.name = name;
		profile.image = image;
		return await this.repository.save(profile);
	}
}
