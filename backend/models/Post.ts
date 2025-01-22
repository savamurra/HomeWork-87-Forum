import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    description: {
        type: String,
        default: null,
    },
    image: {
        type: String,
        default: null,
    },
    datetime: Date,
});

export const Post = mongoose.model("Post", PostSchema);
export default Post;
