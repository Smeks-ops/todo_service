import { Module } from '@nestjs/common';
import { ToDoService } from './to-do.service';
import { ToDoController } from './to-do.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDo } from './entities/to-do.entity';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([ToDo]), AuthModule, UsersModule],
  controllers: [ToDoController],
  providers: [ToDoService],
})
export class ToDoModule {}
