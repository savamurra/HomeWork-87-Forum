import express from "express";
import Comment from "../models/Comment";
import auth, {RequestWithUser} from "../middleware/auth";
import Post from "../models/Post";

const commentsRouter = express.Router();

commentsRouter.get('/', async (
    req,
    res,
    next) => {
    const idQuery = req.query.post as string;
    try {
        if(idQuery) {
            const commentByIdPost = await Comment.find({post: idQuery}).sort({trackNumber: -1});
            if(!commentByIdPost) res.status(404).send("Not Found");
            res.send(commentByIdPost);
        }
    } catch (e) {
        next(e);
    }
});

commentsRouter.post('/', auth, async (
    req,
    res,
    next) => {

    const expressReq = req as RequestWithUser;

    const user = expressReq.user;
    if (!user){
        res.status(401).send({error: 'Wrong token'});
        return;
    }

    if (req.body.post.length !== 24) {
        res.status(401).send({error: 'Required post id'});
        return;
    }

    if (req.body.post) {
        const post = await Post.findById(req.body.post);
        if (!post) res.status(404).send('Not Found post');
    }
    const commentData = {
        user: user._id,
        post: req.body.post,
        text: req.body.text,
    }
    try {
        const track = new Comment(commentData);
        await track.save();
        res.send(track);
    } catch (e) {
        next(e);
    }
})

export default commentsRouter;