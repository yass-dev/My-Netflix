import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService
{
	constructor (
					private usersService: UsersService,
					private jwtService: JwtService
				)
	{

	}

	async validateUser(email: string, password: string)
	{
		return await this.usersService.checkUser(email, password);
	}

	generate_token(user: User)
	{
		const payload = { email: user.email, sub: user.id };
		return this.jwtService.sign(payload);
	}
}
