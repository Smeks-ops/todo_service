import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class CreateToDoDto {
  @ApiProperty()
  @IsString()
  @IsDefined()
  name: string;

  @ApiProperty()
  @IsString()
  @IsDefined()
  description: string;

  @ApiProperty()
  @IsString()
  @IsDefined()
  dueDate: Date;
}
