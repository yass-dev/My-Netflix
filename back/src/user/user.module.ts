import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/user.entity";
import { ProfileModule } from "./profile/profile.module";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
	imports: [ProfileModule, TypeOrmModule.forFeature([User])],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService]
})
export class UserModule {}