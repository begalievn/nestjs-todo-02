import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./entities/user.model";

@Module({
  imports: [MongooseModule.forFeature([
    {name: User.name, schema: UserSchema }
  ])],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
