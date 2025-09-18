import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from './blog.schema';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

  async findAll(): Promise<Blog[]> {
    return this.blogModel.find().exec();
  }

  async findOne(id: string): Promise<Blog | null> {
    return this.blogModel.findById(id).exec();
  }

  async create(dto: CreateBlogDto): Promise<Blog> {
    const newBlog = new this.blogModel(dto);
    return newBlog.save();
  }

  async update(id: string, dto: UpdateBlogDto): Promise<Blog | null> {
    return this.blogModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async remove(id: string): Promise<any> {
    return this.blogModel.findByIdAndDelete(id).exec();
  }
}
