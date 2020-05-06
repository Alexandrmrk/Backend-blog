export default function (error, req, res, next) {
  console.log('ErrorHandler ', error);

  const status = error.httpStatus || 500;
  const message = error.message || 'Unknown error';

  res.status(status);
  res.json({ status, message });
  next();
}
