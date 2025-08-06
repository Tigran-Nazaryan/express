import * as fs from "node:fs/promises";
import * as path from "node:path";

export const getPosts = async (req, res) => {
    try {
        const postsJSON = await fs.readFile(path.resolve("data/posts.json"), {
            encoding: 'utf8'
        });
        if (!postsJSON) {
            return res.status(404).send('No posts found');
        }
        const posts = JSON.parse(postsJSON);
        return res.status(200).send({
            message: 'Posts found successfully',
            data: posts
        });
    } catch (error) {
        console.error(error)
        res.status(500).send({
            message: error?.message || 'Something went wrong',
        })
    }
};

export const getPostsById = async (req, res) => {
    const { id } = req.params;
    try {
        const postsJSON = await fs.readFile(path.resolve("data/posts.json"), {
            encoding: 'utf8'
        });
        if (!postsJSON) {
            return res.status(404).send('No posts found');
        }

        const post = JSON.parse(postsJSON).find(post => post.id === id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found with id " + id,
            })
        }

        return res.status(200).send({
            message: 'Posts found successfully',
            data: post
        });
    } catch (error) {
        console.error(error)
        res.status(500).send({
            message: error?.message || 'Something went wrong',
        })
    }
};

