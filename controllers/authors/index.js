import {getAuthorWithPosts} from "../../service/author.service.js";

export const getAuthorById = async (req, res) => {
    const userId = req.params.id;

    try {
        const author = await getAuthorWithPosts(userId, req.user.id);

        if (!author) {
            return res.status(404).json({ error: "No author with this id" });
        }

        return res.json(author);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err?.message || "Server error" });
    }
};
