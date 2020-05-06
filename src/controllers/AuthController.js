import users from '../models/User';
import TryCatch from '../decorators/TryCatchMiddlewareDecorator';
import HttpError from '../exeptions/HttpError';

class AuthController {
  @TryCatch
  static async auth(req, res) {
    const { login, password } = req.body;
    const user = users.find((u) => u.login === login && u.password === password);

    if (!user) {
      throw new HttpError('Incorrect login or password', 401);
    }

    res.json({ status: true, user });
  }
}

export default AuthController;
