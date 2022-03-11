import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
export class Token {
  @Expose()
  @ApiProperty()
  access_token: string;
}
