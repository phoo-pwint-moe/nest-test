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
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './blog.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Public } from '../auth/public.decorator';

@UseGuards(JwtAuthGuard)
@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Public()
  @Get()
  async findAll(): Promise<Blog[]> {
    return this.blogService.findAll();
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Blog | null> {
    return this.blogService.findOne(id);
  }


  @Post()
  async create(@Body() dto: CreateBlogDto): Promise<Blog | null> {
    return this.blogService.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateBlogDto,
  ): Promise<Blog | null> {
    return this.blogService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.blogService.remove(id);
  }

  
}
