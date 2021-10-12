import { Body, Controller, Get, Post, Req, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto/auth.dto';
import { JwtAuthGuard } from './jwt.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController
{
	constructor(
				private usersService: UsersService,
				private authService: AuthService)
	{

	}

	@Post("/sign_up")
	async sign_up(@Body() body: SignUpDto)
	{
		await this.usersService.createUser(body.email, body.password);
		return {message: "User created successfully"};
	}

	@UseGuards(LocalAuthGuard)
	@Post("/sign_in")
	async sign_in(@Request() req, @Body() body: SignInDto)
	{
		let token = this.authService.generate_token(req.user);
		return {
					message: "Signed in successfully",
					access_token: token
				};
	}
}
