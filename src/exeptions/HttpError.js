class HttpError extends Error {
  constructor(message, httpStatus = 500) {
    super();
    this.httpStatus = httpStatus;
  }
}

export default HttpError;
