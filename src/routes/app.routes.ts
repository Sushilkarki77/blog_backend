import express from 'express';
import { addComment, deleteComment, fetchComments } from '../controllers/comment.controller';
import { createPost, deletePost,  exportPosts,  fetchPosts, patchPost, searchPostsByTitle } from '../controllers/post.coltroller';

const router = express.Router();

router.get('/', fetchPosts);
router.post('/', createPost);
router.patch('/:id', patchPost);
router.delete('/:id', deletePost);
router.get('/search', searchPostsByTitle);

router.get('/:postId/comments', fetchComments);
router.post('/:postId/comments', addComment);
router.delete('/:postId/comments/:commentId', deleteComment);

router.get('/export', exportPosts);

export default router;
