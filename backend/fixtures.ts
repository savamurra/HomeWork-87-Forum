import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import Post from "./models/Post";
import Comment from "./models/Comment";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection("users");
        await db.dropCollection("posts");
        await db.dropCollection("tracks");
    } catch (error) {
        console.error(error);
    }

    const user = await User.create(
        {
            username: "Sadyr",
            password: "123",
            token: crypto.randomUUID(),
        },
        {
            username: "Kamchy",
            password: "123",
            token: crypto.randomUUID(),
        }
    );

    const post = await Post.create(
        {
            user: user[0]._id,
            title: 'Уголь подешевел',
            description: 'Урааа наконецто',
        },
        {
            user: user[0]._id,
            title: 'Свет подешевел',
            description: 'Урааа наконецто',
        },
        {
            user: user[1]._id,
            title: 'Газ подешевел',
            description: 'Урааа наконецто',
        },
        {
            user: user[1]._id,
            title: 'Вода подешевела',
            description: 'Урааа наконецто',
        }
    );

    await Comment.create(
        {
            user: user[0]._id,
            post: post[0]._id,
            text: 'Some text 1'
        },
        {
            user: user[0]._id,
            post: post[0]._id,
            text: 'Some text 2'
        },
        {
            user: user[0]._id,
            post: post[1]._id,
            text: 'Some text 3'
        },
        {
            user: user[0]._id,
            post: post[1]._id,
            text: 'Some text 4'
        },
        {
            user: user[1]._id,
            post: post[2]._id,
            text: 'Some text 5'
        },
        {
            user: user[1]._id,
            post: post[2]._id,
            text: 'Some text 6'
        },
        {
            user: user[1]._id,
            post: post[3]._id,
            text: 'Some text 7'
        },
        {
            user: user[1]._id,
            post: post[3]._id,
            text: 'Some text 8'
        }
    );

    await db.close();
};

run().catch((err) => {
    console.log(err)
})