
// import fs from 'fs/promises';
import path from 'path';
// // import { v4 as uuidv4 } from 'uuid';
import { markdownItem, Post } from '../interfaces/interfaces';
import { getPosts } from '../models/post';
import { createZipInMemory, markdownContent } from '../utils/helper-functions';
import { readJsonFile, writeJsonFile } from './file.service';

const postsFilePath = path.join(__dirname, '../database/Posts.json');

export const readPosts = async (): Promise<Post[] | null> => readJsonFile<Post[]>(postsFilePath);
// export const writePosts = async (data: Post[]) => writeJsonFile(postsFilePath, data);

// export const getPostById = async (postId: string): Promise<Post | null> => {
//     const posts = await readPosts();
//     return posts?.find((post) => post.id === postId) || null;
// };

// export const addPost = async (newPost: Omit<Post, 'id'>): Promise<Post> => {
//     try {
//         const completePost = { ...newPost, id: Date.now().toString(36) };
//         const posts = await readPosts() || [];
//         posts.push(completePost);
//         await writePosts(posts);
//         return completePost;
//     } catch (error) {
//         throw error;
//     }

// };

// export const deletePostHandler = async (postId: string): Promise<boolean> => {
//     const posts = await readPosts();
//     if (!posts) { return false; }

//     const filteredPosts = posts.filter((post) => post.id !== postId);
//     if (filteredPosts.length === posts.length) { return false; }

//     await writePosts(filteredPosts);
//     return true;
// };

// export const updatePost = async (postId: string, updatedData: Partial<Post>): Promise<Post | null> => {
//     const posts = await readPosts();
//     if (!posts) { return null; }

//     const postIndex = posts.findIndex((post) => post.id === postId);

//     posts[postIndex] = { ...posts[postIndex], ...updatedData };
//     await writePosts(posts);
//     return posts[postIndex];
// };

// export const searchPost = async (query: string): Promise<Post[]> => {
//     const posts = await readPosts() || [];
//     return posts.filter((post) =>
//         post.title.toLowerCase().includes(query.toLowerCase()) ||
//         post.content.toLowerCase().includes(query.toLowerCase()),
//     );
// };

export const getPostsZip = async () => {

    try {
        const posts: Post[] = await getPosts();

        const markDownArr: markdownItem[] = posts.map((x) => ({ title: x.title, content: markdownContent(x) }));

        const fileBuffer: Buffer = await createZipInMemory(markDownArr);

        return fileBuffer;
    } catch (error) {
        throw error;
    }

};
