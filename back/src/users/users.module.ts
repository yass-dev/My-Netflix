import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from 'src/profiles/profile.entity';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile])],
  providers: [UsersService],
  exports: [UsersService],
  controllers: []
})
export class UsersModule {}