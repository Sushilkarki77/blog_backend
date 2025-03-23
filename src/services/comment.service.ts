
// import path from 'path';
// // import { v4 as uuidv4 } from 'uuid';
// import { Comment } from '../interfaces/interfaces';
// import { readJsonFile, writeJsonFile } from './file.service';

// const commentsFilePath = path.join(__dirname, '../database/comments.json');

// export const readComments = async (): Promise<Comment[] | null> => readJsonFile<Comment[]>(commentsFilePath);
// export const writeComments = async (data: Comment[]) => writeJsonFile(commentsFilePath, data);

// export const deleteCommentHandler = async (commentID: string): Promise<boolean> => {
//     try {
//         const comments = await readComments();
//         if (!comments) { return false; }

//         const filteredcomments = comments.filter((comment) => comment.id !== commentID);
//         if (filteredcomments.length === comments.length) { return false; }

//         await writeComments(filteredcomments);
//         return true;
//     } catch (error) {
//         throw error;
//     }

// };

// export const createComment = async (postId: string, comment: Omit<Comment, 'id'>): Promise<Comment> => {
//     try {
//         const comments: Comment[] = await getComments() || [];
//         const newComment: Comment = { ...comment, id: Date.now().toString(36) };
//         comments.push(newComment);
//         await writeComments(comments);
//         return newComment;
//     } catch (error) {
//         throw error;
//     }
// };

// export const getCommentsByPostID = async (postId: string): Promise<Comment[]> => {
//     const comments = await readComments() || [];
//     return comments.filter((comment) => comment.postId === postId);
// };
// export const getComments = async (): Promise<Comment[] | null> => readComments();
