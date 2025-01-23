import express from "express";
import auth, {RequestWithUser} from "../middleware/auth";
import mongoose from "mongoose";
import Post from "../models/Post";
import {imagesUpload} from "../multer";

const postsRouter = express.Router();

postsRouter.get("/", auth, async (req, res, next) => {
    const expressReq = req as RequestWithUser;

    try {
        const user = expressReq.user;

        if (!user) {
            res.status(401).send({ error: "User not authorized" });
            return;
        }

        const posts = await Post.find()
            .populate("user", "username")
            .exec();

        res.status(200).send(posts);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
});

postsRouter.get("/:id", auth, async (req, res, next) => {
    const id = req.params.id;

    if (!id) {
        res.status(404).send('Not Found');
    }

    try {
        const post = await Post.findById(id);

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
