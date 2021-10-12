import { IsDefined, IsEmail, IsNotEmpty } from "class-validator";

export class SignUpDto
{
	@IsDefined()
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsDefined()
	@IsNotEmpty()
	password: string;
}

export class SignInDto
{
	@IsDefined()
	@IsNotEmpty()
	username: string;

	@IsDefined()
	@IsNotEmpty()
	password: string;
}