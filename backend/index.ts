import express from "express";
import mongoose from "mongoose";
import mongoDb from "./mongoDb";
import usersRouter from "./routers/users";
import postsRouter from "./routers/posts";
import commentsRouter from "./routers/comments";
import cors from "cors";

const app = express();
const port = 8000;


app.use(cors());
app.use(express.json());
app.use(express.static('public'));


app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

const run = async () => {
    await  mongoose.connect('mongodb://localhost:27017/forum');

    app.listen(port, () => {
        console.log(`Server started on port http://localhost:${port}`);
    });

    process.on('exit', () => {
        mongoDb.disconnect();
    });
};

run().catch(err => console.log(err));