import db from '../../db/index.js';

export const getAllPosts = async (req, res) => {
    try {
        const posts = await db.query(`SELECT * FROM person`);
        res.json(posts.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error?.message || 'Failed to retrieve posts',
        });
    }
};

export const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await db.query(`SELECT * FROM person WHERE id = $1`, [id]);

        if (post.rows.length === 0) {
            return res.status(404).json({ message: 'Person not found' });
        }

        res.json(post.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error?.message || 'Failed to retrieve person',
        });
    }
};

export const createPost = async (req, res) => {
    try {
        const { name, surname } = req.body;

        const newPost = await db.query(
            `INSERT INTO person (name, surname) VALUES ($1, $2) RETURNING *`,
            [name, surname]
        );

        res.status(201).json(newPost.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error?.message || 'Failed to create person',
        });
    }
};

export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, surname } = req.body;

        const post = await db.query(
            `UPDATE person SET name = $1, surname = $2 WHERE id = $3 RETURNING *`,
            [name, surname, id]
        );

        if (post.rows.length === 0) {
            return res.status(404).json({ message: 'Person not found' });
        }

        res.json(post.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error?.message || 'Failed to update person',
        });
    }
};

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await db.query(
            `DELETE FROM person WHERE id = $1 RETURNING *`,
            [id]
        );

        if (post.rows.length === 0) {
            return res.status(404).json({ message: 'Person not found' });
        }

        res.status(200).json({ message: 'Person deleted', data: post.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error?.message || 'Failed to delete person',
        });
    }
};