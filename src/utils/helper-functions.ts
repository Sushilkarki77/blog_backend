import archiver from 'archiver';
import json2md from 'json2md';
import { PassThrough } from 'stream';
import { markdownItem, Post } from '../interfaces/interfaces';

export const markdownContent = (post: Post): string =>
    json2md([
        { h1: post.title },
        { h3: post.author + '  Published date: ' + getFormatterdDate(post.date) },
        { blockquote: post.content },
        { ol: post.tags },

    ]);

const getFormatterdDate = (date: string): string => {
    const dateFormatted = new Date(date);
    return dateFormatted.toLocaleDateString('en-US');
};

export async function createZipInMemory(files: markdownItem[]): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        const zipStream = new PassThrough();
        const archive = archiver('zip', { zlib: { level: 9 } });

        archive.on('error', (err) => reject(err));
        archive.pipe(zipStream);

        files.forEach((file) => {
            archive.append(file.content, { name: file.title + '.md' });
        });

        archive.finalize();

        const chunks: Buffer[] = [];
        zipStream.on('data', (chunk: Buffer) => chunks.push(chunk));
        zipStream.on('end', () => resolve(Buffer.concat(chunks)));
    });
}
