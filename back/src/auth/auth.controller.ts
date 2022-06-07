import { Body, Controller, Get, Post, Req, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto/auth.dto';
import { JwtAuthGuard } from './jwt.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController
{
	constructor(
				private user_service: UserService,
				private authService: AuthService)
	{

	}

	@Post("/sign_up")
	async sign_up(@Body() body: SignUpDto)
	{
		await this.user_service.createUser(body.email, body.password);
		return {message: "User created successfully"};
	}

	@UseGuards(LocalAuthGuard)
	@Post("/sign_in")
	async sign_in(@Request() req, @Body() body: SignInDto)
	{
		const token = this.authService.generate_token(req.user);
		const user = await this.user_service.getUserById(req.user.id);
		return {
				access_token: token,
				user: user
			};
	}
}
