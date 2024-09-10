export class UnauthorizedException extends Error {}

export class EntityNotFoundException extends Error {}

export class HttpException extends Error {
  constructor(message: string, public readonly status: number) {
    super(message);
  }
}
