import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Profile } from "./profile.entity";
import { ProfileService } from "./profile.service";

@Module({
	imports: [TypeOrmModule.forFeature([Profile])],
	controllers: [],
	providers: [ProfileService],
	exports: [ProfileService]
})
export class ProfileModule {}