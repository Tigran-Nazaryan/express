import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { v4 as uuidv4 } from 'uuid';

const filePath = path.resolve('data/posts.json');

async function readPosts() {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data || '[]');
    } catch {
        return [];
    }
}

async function writePosts(posts) {
    await fs.writeFile(filePath, JSON.stringify(posts, null, 2), 'utf8');
}

export const getAllPosts = async () => {
    return await readPosts();
};

export const getPostById = async (id) => {
    const posts = await readPosts();
    return posts.find(post => post.id === id);
};

export const createPost = async ({ title, avatar, body, author }) => {
    const posts = await readPosts();
    const newPost = {
        id: uuidv4(),
        title,
        avatar,
        body,
        author,
        createdAt: new Date().toISOString(),
    };
    posts.push(newPost);
    await writePosts(posts);
    return newPost;
};

export const updatePost = async (id, updateData) => {
    const posts = await readPosts();
    const index = posts.findIndex(post => post.id === id);
    if (index === -1) return null;

    posts[index] = { ...posts[index], ...updateData };
    await writePosts(posts);
    return posts[index];
};

export const deletePost = async (id) => {
    const posts = await readPosts();
    const filtered = posts.filter(post => post.id !== id);
    if (posts.length === filtered.length) return false;

    await writePosts(filtered);
    return true;
};
