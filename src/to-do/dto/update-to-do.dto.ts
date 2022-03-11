import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { TodoStatus } from '../entities/to-do.entity';

export class UpdateToDoDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  status: TodoStatus;
}
