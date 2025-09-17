import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { Blog } from './blog.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('blogs')
export class BlogController {
  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getProtected() {
    return { message: 'This route is protected with JWT' };
  }

  constructor(private readonly blogService: BlogService) {}

  @Get()
  async findAll(): Promise<Blog[]> {
    return this.blogService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Blog | null> {
    return this.blogService.findOne(id);
  }

  @Post()
  async create(@Body() blog: Partial<Blog>): Promise<Blog | null> {
    return this.blogService.create(blog);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() blog: Partial<Blog>,
  ): Promise<Blog | null> {
    return this.blogService.update(id, blog);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.blogService.remove(id);
  }
}
