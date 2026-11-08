export class ConflictError extends Error {
  statusCode: number= 409;
  constructor(message: string) {
    super(message);
    this.name = 'ConflictError';
  }}