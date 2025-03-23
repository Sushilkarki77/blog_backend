import {  RequestHandler } from 'express';
import { Post, Result } from '../interfaces/interfaces';
import { PostSchema } from '../models/post.model';
import {  getPostsZip } from '../services/post.service';
import { createPost, deletePostById, getPostById, getPosts, IPost, updatePostById, seedPosts } from '../models/post';
import { randomUUID } from 'crypto';
import { seedComments } from '../models/comment';

export const fetchPosts: RequestHandler<unknown, Result<Post[] | null>, unknown, { page: string }> = async (req, res, next) => {
  try {
    const { page } = req.query;
    const finalPage: number = page && +page > 1 ? +page - 1 : 0;

    const posts: Post[] | null = await getPosts();

    if (!posts) {
      res.status(200).json({ result: [] });
      return;
    }

    const totalLength = posts.length;

    const sortedPosts = posts.sort((x, y) => new Date(y.date).getTime() - new Date(x.date).getTime());

    const filteredPosts: Post[] = sortedPosts.slice(finalPage * 15, (finalPage + 1) * 15);

    res.status(200).json({ result: filteredPosts, count: filteredPosts.length, totalcount: totalLength, page: (+page || 1) });
  } catch (error) {
    next(error);
  }
};


export const seedHandler: RequestHandler<unknown, unknown, unknown, unknown> = async (req, res, next) => {
  try {
    await seedPosts()
    await seedComments()
    res.status(200).json({message: 'Data seed successful!'});
  } catch (error) {
    next(error);
  }
};





export const searchPostsByTitle: RequestHandler<unknown, Result<Post[] | null>, unknown, { q: string }> = async (req, res, next) => {
  try {
    const { q } = req.query;

    const posts: Post[] | null = await getPosts();

    if (!posts) {
      res.status(200).json({ result: [] });
      return;
    }

    let filteredPosts: Post[] = [];
    if (!q || typeof (q) !== 'string') {
      const sortedPosts = posts.sort((x, y) => new Date(y.date).getTime() - new Date(x.date).getTime());
      filteredPosts = sortedPosts.slice(0, 15);
    } else {
      filteredPosts = posts.filter((x) => x?.title?.toLocaleLowerCase()?.includes(q?.toLowerCase())).slice(0, 15);
    }

    res.status(200).json({ result: filteredPosts, count: filteredPosts.length, totalcount: filteredPosts.length });
  } catch (error) {
    next(error);
  }
};

export const createPostHandler: RequestHandler<unknown, Result<Post> | Error, Omit<Post, 'id'>, unknown> = async (req, res, next): Promise<void> => {
  try {
    const post = req.body;
    const validation = PostSchema.safeParse(post);
    if (!validation.success) {
      res.status(400).json({ name: 'error', message: 'Invalid request body' });
      return;
    }

    const addedPost: Post = await createPost({...post, id: randomUUID()});

    res.status(201).json({ result: addedPost });
  } catch (error) {
    next(error);
  }
};

export const patchPost: RequestHandler<{ id: string }, Result<Post> | Error, Partial<Post>, unknown> = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ name: 'error', message: 'Invalid post ID' });
      return;
    }

    const post: Partial<Post> = req.body;
    const validation = PostSchema.partial().safeParse(post);

    if (!validation) {
      res.status(400).json({ name: 'error', message: 'Invalid Body' });
      return;
    }

    const existingPost: Post | null = await getPostById(id);

    if (!existingPost) {
      res.status(400).json({ name: 'error', message: 'Post does not exist' });
      return;
    }

    const updatedPost: Post | null = await updatePostById(id, post);

    if (!updatedPost) {
      next();
      return;
    }

    res.status(200).json({ result: updatedPost });
  } catch (error) {
    throw next;
  }
};

export const deletePost: RequestHandler<{ id: string }, Result<string> | Error, unknown, unknown> = async (req, res, next) => {

  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ name: 'error', message: 'Invalid post ID' });
      return;
    }

    const existingPost: Post | null = await getPostById(id);

    if (!existingPost) {
      res.status(400).json({ name: 'error', message: 'Post does not exist' });
      return;
    }

    const deletedPost: IPost | null = await deletePostById(id);

    if (deletedPost) {
      res.status(200).json({ result: 'deleted successfully' });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }

};

export const exportPosts: RequestHandler = async (req, res, next) => {
  try {
    const convertedData = await getPostsZip();

    res.set('Content-Disposition', 'attachment; filename=Posts.zip');
    res.set('Content-Type', 'application/zip');
    res.send(convertedData);

  } catch (error) {
    next(error);
  }
};
