import posts from '../models/Post';

class PostsController {
  static async read(req, res) {
    const index = posts.findIndex((p) => +p.id === +req.params.id);

    if (index === -1) {
      res.status(404).json({ status: false, message: 'Post not found' });
    }

    res.json(posts[index]);
  }

  static async list(req, res) {
    res.json(posts);
  }

  static async create(req, res) {
    posts.push(req.body);
    res.json({ status: true, post: req.body });
  }

  static async update(req, res) {
    const index = posts.findIndex((p) => +p.id === +req.params.id);

    if (index === -1) {
      res.status(404).json({ status: false, message: 'Post not found' });
    }

    posts[index].header = req.body.header;
    posts[index].content = req.body.content;

    res.json({ status: true, post: posts[index] });
  }

  static async delete(req, res) {
    const index = posts.findIndex((p) => +p.id === +req.params.id);

    if (index === -1) {
      res.status(404).json({ status: false, message: 'Post not found' });
    }

    posts.splice(index, 1);

    res.status(204).end();
  }
}

export default PostsController;
