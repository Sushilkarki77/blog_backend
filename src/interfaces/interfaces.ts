export interface Comment {
    id: string;
    postId: string;
    author: string;
    content: string;
    date: string;
}

export interface Post {
    id: string;
    title: string;
    content: string;
    author: string;
    tags: string[];
    date: string;
    bookmarked: boolean;
}

export interface Result<T> {
    result: T;
    count?: number;
    totalcount?: number;
    page?: number;
}

export interface markdownItem { title: string; content: string; }
