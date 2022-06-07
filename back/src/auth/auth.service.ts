import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService
{
	constructor (
					private user_service: UserService,
					private jwtService: JwtService
				)
	{

	}

	async validateUser(email: string, password: string)
	{
		return await this.user_service.getUser(email, password);
	}

	generate_token(user: User)
	{
		const payload = { email: user.email, sub: user.id };
		return this.jwtService.sign(payload);
	}
}
