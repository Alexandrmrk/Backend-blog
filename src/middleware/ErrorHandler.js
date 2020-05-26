import httpErrors from 'http-errors';

export default function (error, req, res, next) {
  console.error(error);

  const status = error.httpStatus || 500;
  const httpError = httpErrors(status);

  let message;
  if (process.env.NODE_ENV !== 'production') {
    message = error.message || 'Unknown error';
  } else {
    message = httpError.message || 'Unknown error';
  }

  res.status(status);
  res.json({ status, message });
  next();
}
