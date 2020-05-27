import TryCatch from '../decorators/TryCatchMiddlewareDecorator';
import HttpError from '../exeptions/HttpError';
import { verifyAuthToken } from '../helpers/auth';

class Authorize {
  @TryCatch
  static async check(req, res, next) {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];

      if (!token) {
        throw new HttpError('Access token not found in request', 400);
      }

      const verifyData = verifyAuthToken(token);

      if (!verifyData) {
        throw new HttpError('Token invalid or expired', 401);
      }

      req.userId = verifyData.id;
      return next();
    }
    throw new HttpError('Unauthorized', 401);
  }
}

export default Authorize;
