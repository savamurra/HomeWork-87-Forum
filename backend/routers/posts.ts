import express from "express";
import auth, {RequestWithUser} from "../middleware/auth";
import mongoose from "mongoose";
import Post from "../models/Post";
import Comment from "../models/Comment";
import {imagesUpload} from "../multer";

const postsRouter = express.Router();

postsRouter.get("/", async (req, res, next) => {
    try {
        const posts = await Post.find()
            .sort({ datetime: -1 })
            .populate("user", "-_id username")
            .exec();

        const postsWithCommentCount = await Promise.all(
            posts.map(async (post) => {
                const commentCount = await Comment.countDocuments({ post: post._id });
                return { ...post.toObject(), commentCount };
            })
        );

        res.status(200).send(postsWithCommentCount);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
});

postsRouter.get("/:id",  async (req, res, next) => {
    const id = req.params.id;

    if (!id) {
        res.status(404).send('Not Found');
    }

    try {
        const post = await Post.findById(id)
            .populate("user", "-_id username");

        if (!post) res.status(404).send('Not Found');

        res.send(post);
    } catch (e) {
        next(e);
    }
})

postsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
    const expressReq = req as RequestWithUser;

    try {
        const user = expressReq.user;
        if (!user) {
            res.status(401).send({ error: "User not authenticated" });
            return;
        }

        const { title, description } = req.body;

        if (!title) {
            res.status(400).send({ error: "Title and status are required" });
            return;
        }

        const post = new Post({
            user: user._id,
            title,
            description,
            image: req.file ? '/images' + req.file.filename : null,
            datetime: new Date().toISOString(),
        });

        await post.save();

        res.status(201).send(post);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
});

export default postsRouter;
