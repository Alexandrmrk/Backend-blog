import User from '../models/User';
import TryCatch from '../decorators/TryCatchMiddlewareDecorator';
import HttpError from '../exeptions/HttpError';
import { hashPassword, checkPassword } from '../helpers/password';

class AuthController {
  @TryCatch
  static async signin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !await checkPassword(password, user.password)) {
      throw new HttpError('Incorrect login or password', 401);
    }

    res.json({ status: true, user });
  }

  @TryCatch
  static async signup(req, res) {
    const model = new User({
      name: req.body.name,
      email: req.body.email,
      password: await hashPassword(req.body.password),
    });

    const user = await model.save();
    delete user.password;
    res.json({ status: true, user });
  }
}

export default AuthController;
