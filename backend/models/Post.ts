import mongoose, {Schema} from "mongoose";

const PostSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
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

const Post = mongoose.model("Post", PostSchema);
export default Post;
