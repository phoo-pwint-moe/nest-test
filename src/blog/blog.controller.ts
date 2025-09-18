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
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './blog.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Public } from '../auth/public.decorator';

@ApiTags('blogs')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Public()
  @ApiOperation({ summary: 'Get All Blogs' })
  @Get()
  async findAll(): Promise<Blog[]> {
    return this.blogService.findAll();
  }

  @Public()
  @ApiOperation({ summary: 'Get blog with id' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Blog | null> {
    return this.blogService.findOne(id);
  }

  @ApiOperation({ summary: 'Create a new blog' })
  @Post()
  async create(@Body() dto: CreateBlogDto): Promise<Blog | null> {
    return this.blogService.create(dto);
  }

  @ApiOperation({ summary: 'Update a new blog' })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateBlogDto,
  ): Promise<Blog | null> {
    return this.blogService.update(id, dto);
  }

  @ApiOperation({ summary: 'Delete blog' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.blogService.remove(id);
  }
}
