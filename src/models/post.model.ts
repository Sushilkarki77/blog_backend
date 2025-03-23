import { z } from 'zod';

export const PostSchema = z.object({
    title: z.string(),
    content: z.string(),
    author: z.string(),
    tags: z.array(z.string()),
    date: z.string(),
    bookmarked: z.boolean(),
});

export type Post = z.infer<typeof PostSchema>;
