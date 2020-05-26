import Post from '../models/Post';
import TryCatch from '../decorators/TryCatchMiddlewareDecorator';
import HttpError from '../exeptions/HttpError';

class PostsController {
  @TryCatch
  static async read(req, res) {
    const post = await PostsController.getPostById(req.params.id);
    res.json(post);
  }

  @TryCatch
  static async list(req, res) {
    const posts = await Post.find();
    res.json(posts);
  }

  @TryCatch
  static async create(req, res) {
    const model = new Post(req.body);
    const post = await model.save();

    res.json({ status: true, post });
  }

  @TryCatch
  static async update(req, res) {
    const post = await PostsController.getPostById(req.params.id);

    post.header = req.body.header;
    post.content = req.body.content;
    await post.save();

    res.json({ status: true, post });
  }

  @TryCatch
  static async delete(req, res) {
    const post = await PostsController.getPostById(req.params.id);

    await post.delete();

    res.status(204).end();
  }

  static async getPostById(id) {
    const post = await Post.findById(id);

    if (!post) {
      throw new HttpError('Post not found', 404);
    }

    return post;
  }
}

export default PostsController;
