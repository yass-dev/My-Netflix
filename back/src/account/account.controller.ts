import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { UsersService } from 'src/users/users.service';

@UseGuards(JwtAuthGuard)
@Controller('account')
export class AccountController
{
	constructor(private usersService: UsersService)
	{

	}

	@Get()
	async getAccount(@Request() req)
	{
		return (await this.usersService.findOne(req.userId));
	}

	@Get("/profiles")
	async getProfiles(@Request() req)
	{
		let profiles = (await this.usersService.getProfiles(req.userId)).profiles;
		return profiles;
	}
}
