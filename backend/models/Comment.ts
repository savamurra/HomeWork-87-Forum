import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CommentSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"],
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: [true, "Post is required"],
    },
    text: {
        type: String,
        required: true,
    }
});

const Comment = mongoose.model('Comment', CommentSchema);
export default Comment;