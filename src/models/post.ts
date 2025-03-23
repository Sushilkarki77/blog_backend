import mongoose, { Document, Schema } from 'mongoose';
import { readPosts } from '../services/post.service';
import { Post } from '../interfaces/interfaces';

export interface IPost extends Document {
  id: string;
  title: string;
  content: string;
  author: string;
  tags: string[];
  date: string;
  bookmarked: boolean;
}

const PostSchema: Schema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  tags: { type: [String], default: [] },
  date: { type: String, required: true },
  bookmarked: { type: Boolean, default: false }
});

export const PostModel = mongoose.model<IPost>('Post', PostSchema);

export const getPosts = (): Promise<IPost[]> => PostModel.find().exec();

export const getPostById = (id: string): Promise<IPost | null> =>
  PostModel.findOne({ id }).exec();

export const createPost = (values: Partial<IPost>): Promise<IPost> =>
  new PostModel(values).save().then((post) => post.toObject() as IPost);

export const updatePostById = (id: string, values: Partial<IPost>): Promise<IPost | null> =>
  PostModel.findOneAndUpdate({ id }, values, { new: true }).exec();

export const deletePostById = (id: string): Promise<IPost | null> =>
  PostModel.findOneAndDelete({ id }).exec();

export const seedPosts = async () => {
    const posts: Post[] | null = await readPosts()
    await PostModel.deleteMany({}); 
    
    if (posts) PostModel.insertMany(posts);
}

