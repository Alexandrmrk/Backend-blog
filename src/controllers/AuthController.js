import users from '../models/User';

class AuthController {
  static async auth(req, res) {
    const { login, password } = req.body;
    const user = users.find((u) => u.login === login && u.password === password);

    if (!user) {
      res.status(401).json({ status: false, message: 'Incorrect user login or password' });
    }

    res.json({ status: true, user });
  }
}

export default AuthController;
