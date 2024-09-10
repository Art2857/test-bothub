export type AuthServiceContractEntities = {
  Jwt: {
    token: string;
  };
};

export type JWTServiceContract = {
  sign(props: { payload: Record<string, any> }): {
    jwt: AuthServiceContractEntities["Jwt"];
  };

  verify(token: string): {
    payload: Record<string, any>;
  };

  safeVerify(
    token: string
  ):
    | { ok: true; payload: Record<string, any> }
    | { ok: false; message?: string };
};
