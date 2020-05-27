import User from '../models/User';
import TryCatch from '../decorators/TryCatchMiddlewareDecorator';
import HttpError from '../exeptions/HttpError';
import { hashPassword, checkPassword } from '../helpers/password';
import { createAuthToken } from '../helpers/auth';

class AuthController {
  @TryCatch
  static async signin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await checkPassword(password, user.password))) {
      throw new HttpError('Incorrect login or password', 401);
    }

    /* eslint no-underscore-dangle: ["error", {"allow": ["_id"]}] */
    const authToken = await createAuthToken({ id: user._id.toString() });
    delete user.password;

    res.json({ status: true, user, authToken });
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
