import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
@Exclude()
class User {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  email: string;

  @Expose()
  @ApiProperty()
  createdAt: string;

  @Expose()
  @ApiProperty()
  updatedAt: string;
}

@Exclude()
export class ToDoListDTO {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  description: string;

  @Expose()
  @ApiProperty()
  @Type(() => User)
  user: User;

  @Expose()
  @ApiProperty()
  dueDate: Date;

  @Expose()
  @ApiProperty()
  isDeleted: string;

  @Expose()
  @ApiProperty()
  status: string;

  @Expose()
  @ApiProperty()
  createdAt: string;

  @Expose()
  @ApiProperty()
  updatedAt: string;
}
