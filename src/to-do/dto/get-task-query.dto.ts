import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsOptional, IsNumber } from 'class-validator';
import { TodoStatus } from '../entities/to-do.entity';

export class GetTaskQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  offset?: number;

  @ApiPropertyOptional({
    enum: TodoStatus,
  })
  @IsOptional()
  @IsString()
  sort?: TodoStatus;
}
