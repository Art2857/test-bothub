import * as LibsExceptions from "#libs/exceptions";

const mapError = (error: unknown): never => {
  if (error instanceof LibsExceptions.EntityNotFoundException) {
    throw new LibsExceptions.HttpException(error.message, 404);
  }
  if (error instanceof LibsExceptions.UnauthorizedException) {
    throw new LibsExceptions.HttpException(error.message, 401);
  }

  throw error;
};

export const ExpressMapPubError = (
  _target: any,
  _propertyKey: string,
  descriptor: PropertyDescriptor
) => {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    try {
      const value = originalMethod.apply(this, args);

      if (value instanceof Promise) {
        return value.catch(mapError);
      }

      return value;
    } catch (error) {
      mapError(error);
    }
  };
  return descriptor;
};
