import express from "express";
import mongoose from "mongoose";
import mongoDb from "./mongoDb";
import usersRouter from "./routers/users";


const app = express();
const port = 8000;

app.use(express.json());
app.use(express.static('public'));
app.use('/users', usersRouter);

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