import { Controller, ForbiddenException, Get, Param, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { UserService } from './user.service';

@Controller("users")
export class UserController
{
	constructor(private user_service: UserService) {}

	@Get(":id")
	@UseGuards(JwtAuthGuard)
	async getUser(@Req() req, @Param("id") id: number)
	{
		if (id != req.user.id)
			throw new ForbiddenException(`${req.user.id}`);
		const user = await this.user_service.getUserById(id);
		if (!user)
			throw new UnauthorizedException("You must be logged in to ");
		return user;
	}
}