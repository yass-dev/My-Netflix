import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import AuthConfig from './auth.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy)
{
	constructor()
	{
		super(
		{
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: AuthConfig.JwtConfig.secret,
		});
	}

	async validate(payload: any)
	{
		return { id: payload.sub, email: payload.email };
	}
}