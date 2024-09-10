import { Prisma } from "@prisma/client";

import * as LibsExceptions from "#libs/exceptions";

const mapError = (error: unknown): never => {
  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2025"
  ) {
    /// TODO: provide meta information for entity
    throw new LibsExceptions.EntityNotFoundException(`Not found`);
  }

  throw error;
};

export const PrismaMapPubError = (
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
