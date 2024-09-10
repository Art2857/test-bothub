import { AuthJwtPayload } from "./types";

export const jwtPayloadSerialize = (
  payload: AuthJwtPayload
): Record<string, any> => {
  return {
    user: {
      id: payload.user.id,
      username: payload.user.username,
      email: payload.user.email,
      role: payload.user.role,
      createdAt: payload.user.createdAt.toISOString(),
      updatedAt: payload.user.updatedAt.toISOString(),
    },
  };
};

export const jwtPayloadDeserialize = (
  payload: Record<string, any>
): AuthJwtPayload => {
  return {
    user: {
      id: payload["user"]["id"],
      username: payload["user"]["username"],
      email: payload["user"]["email"],
      role: payload["user"]["role"],
      createdAt: new Date(payload["user"]["createdAt"]),
      updatedAt: new Date(payload["user"]["updatedAt"]),
    },
  };
};
