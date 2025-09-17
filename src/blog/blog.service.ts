import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from './blog.schema';

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

  async findAll(): Promise<Blog[]> {
    return this.blogModel.find().exec();
  }

  async findOne(id: string): Promise<Blog | null> {
    return this.blogModel.findById(id).exec();
  }

  async create(data: Partial<Blog>): Promise<Blog> {
    const newBlog = new this.blogModel(data);
    return newBlog.save();
  }

  async update(id: string, data: Partial<Blog>): Promise<Blog | null> {
    return this.blogModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async remove(id: string): Promise<any> {
    return this.blogModel.findByIdAndDelete(id).exec();
  }
}
