import {getAuthorWithPosts} from "../../service/author.service.js";

export const getAuthorById = async (req, res) => {
    const userId = req.params.id;

    try {
        const author = await getAuthorWithPosts(userId);

        if (!author) {
            return res.status(404).json({ error: "No author with this id" });
        }

        res.json(author);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};
