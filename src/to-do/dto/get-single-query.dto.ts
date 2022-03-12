import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsOptional, IsNumber } from 'class-validator';
import { TodoStatus } from '../entities/to-do.entity';

export class GetSingleTaskQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Type(() => String)
  name?: string;
  sort?: TodoStatus;
}
