import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';

@Injectable()
export class ProfilesService
{
	constructor(@InjectRepository(Profile) private profileRepository: Repository<Profile>)
	{

	}

	
}
