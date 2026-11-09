class BadRequestError extends Error {
  statusCode: number = 400;

  constructor(message: string) {
    super(message);
    this.name = 'BadRequestError';
  }
}
export default BadRequestError;
