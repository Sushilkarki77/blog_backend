import { z } from 'zod';

export const CommentSchema = z.object({
    postId: z.string(),
    author: z.string(),
    content: z.string(),
    date: z.string(),
});

export type Comment = z.infer<typeof CommentSchema>;
