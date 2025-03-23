import {  RequestHandler } from 'express';
import { Comment, Post, Result } from '../interfaces/interfaces';
import { CommentSchema } from '../models/comment.model';
import { createComment, deleteCommentHandler, getCommentsByPostID } from '../services/comment.service';
import { getPostById } from '../services/post.service';

export const fetchComments: RequestHandler<{ postId: string }, Result<Comment[]> | Error> = async (req, res, next) => {
    try {
        const { postId } = req.params;
        if (!postId || typeof (postId) != 'string') {
            res.status(400).json({ name: 'error', message: 'Invalid post ID' });
        }

        const comments: Comment[] = await getCommentsByPostID(postId);

        res.status(200).json({ result: comments, count: comments.length, totalcount: comments.length });
    } catch (error) {
        next(error);
    }

};

export const addComment: RequestHandler<{ postId: string }, Result<Comment> | Error, Omit<Comment, 'id'>, unknown> = async (req, res, next) => {

    try {
        const { postId } = req.params;
        const comment = req.body;

        if (!postId || typeof (postId) !== 'string') {
            res.status(400).json({ name: 'error', message: 'Invalid post id' });
            return;
        }

        const validation = CommentSchema.safeParse(comment);

        if (!validation.success) {
            res.status(400).json({ name: 'error', message: 'Invalid request body' });
            return;
        }
        const post: Post | null = await getPostById(postId);
        if (!post) {
            res.status(400).json({ name: 'error', message: 'Invalid Post ID' });
            return;
        }
        const addedComment: Comment = await createComment(postId, {...comment, postId});

        res.status(200).json({ result: addedComment });
    } catch (error) {
        next(error);
    }

};

export const deleteComment: RequestHandler<{ postId: string; commentId: string }, Result<string> | Error, unknown, unknown> = async (req, res, next) => {
    try {
        const { postId, commentId } = req.params;

        if (!postId || typeof postId !== 'string') {
            res.status(400).json({ name: 'error', message: 'Invalid post ID' });
            return;
        }

        if (!commentId || typeof commentId !== 'string') {
            res.status(400).json({ name: 'error', message: 'Invalid comment ID' });
            return;
        }

        const post: Post | null = await getPostById(postId);
        if (!post) {
            res.status(404).json({ name: 'error', message: 'Post not found' });
            return;
        }

        const commentExists = await getCommentsByPostID(postId);
        if (!commentExists) {
            res.status(404).json({ name: 'error', message: 'Comment not found' });
            return;
        }

        await deleteCommentHandler(commentId);

        res.status(200).json({ result: 'deleted successfully' });
    } catch (error) {
        next(error);
    }
};
