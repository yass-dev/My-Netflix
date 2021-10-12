import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { User } from "src/users/user.entity"

@Module(
{
	imports: [TypeOrmModule.forRoot(
	{
		type: 'mysql',
		host: 'localhost',
		port: 3306,
		username: 'root',
		password: '',
		database: 'netflix',
		entities: [User],
		synchronize: true,
		autoLoadEntities: true
	})]
})


export default class DatabaseModule {};