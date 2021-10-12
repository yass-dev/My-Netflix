import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProfilesModule } from './profiles/profiles.module';
import { AccountModule } from './account/account.module';
import DatabaseModule from './database/database.module';

@Module({
  imports: [DatabaseModule, AuthModule, ProfilesModule, AccountModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
