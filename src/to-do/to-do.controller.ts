import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
  ParseIntPipe,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { ToDoService } from './to-do.service';
import { CreateToDoDto } from './dto/create-to-do.dto';
import { UpdateToDoDto } from './dto/update-to-do.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetTaskQueryDto } from './dto/get-task-query.dto';
import { TodoStatus } from './entities/to-do.entity';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { AuthUser } from '../auth/auth.decorator';
import { plainToClass } from 'class-transformer';
import { ToDoListDTO } from './dto/todo-list.dto';

@ApiTags('to-do')
@ApiBearerAuth()
@Controller('to-do')
export class ToDoController {
  constructor(private readonly toDoService: ToDoService) {}

  @ApiOkResponse({
    description: 'Allow user to create a to-do list',
    type: ToDoListDTO,
  })
  @Post()
  @UseGuards(JwtAuthGuard)
  createTodoList(
    @AuthUser() user: string,
    @Body() createToDoDto: CreateToDoDto,
  ) {
    return plainToClass(
      ToDoListDTO,
      this.toDoService.createTodoList(createToDoDto, user),
    );
  }

  @ApiOkResponse({
    description: 'Get all to-do lists with query paramter',
    type: [ToDoListDTO],
  })
  @Get()
  @UseGuards(JwtAuthGuard)
  getTodoLists(@Query() params: GetTaskQueryDto) {
    const { offset = 0, limit = 10, sort } = params;
    return plainToClass(
      ToDoListDTO,
      this.toDoService.getTodoList(offset, limit, sort),
    );
  }

  @ApiOkResponse({
    description: 'Edit a given to-do list',
  })
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  updateATodoList(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateToDoDto: UpdateToDoDto,
  ) {
    const { status } = updateToDoDto;
    // ensure the correct format for status is passed
    if (status != TodoStatus.in_progress && status != TodoStatus.completed)
      throw new BadRequestException(
        'status must either be IN-PROGRESS or COMPLETED',
      );
    return this.toDoService.updateATodoList(id, updateToDoDto);
  }

  @ApiOkResponse({
    description: 'Delete a given to-do list',
  })
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  removeATodoList(@Param('id', ParseIntPipe) id: number) {
    return this.toDoService.removeATodoList(id);
  }
}
