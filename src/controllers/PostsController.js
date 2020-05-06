import posts from '../models/Post';
import TryCatch from '../decorators/TryCatchMiddlewareDecorator';
import HttpError from '../exeptions/HttpError';

class PostsController {
  @TryCatch
  static async read(req, res) {
    const index = posts.findIndex((p) => +p.id === +req.params.id);

    if (index === -1) {
      throw new HttpError('Post not found', 404);
    }

    res.json(posts[index]);
  }

  @TryCatch
  static async list(req, res) {
    res.json(posts);
  }

  @TryCatch
  static async create(req, res) {
    posts.push(req.body);
    res.json({ status: true, post: req.body });
  }

  @TryCatch
  static async update(req, res) {
    const index = posts.findIndex((p) => +p.id === +req.params.id);

    if (index === -1) {
      throw new HttpError('Post not found', 404);
    }

    posts[index].header = req.body.header;
    posts[index].content = req.body.content;

    res.json({ status: true, post: posts[index] });
  }

  @TryCatch
  static async delete(req, res) {
    const index = posts.findIndex((p) => +p.id === +req.params.id);

    if (index === -1) {
      throw new HttpError('Post not found', 404);
    }

    posts.splice(index, 1);

    res.status(204).end();
  }
}

export default PostsController;
