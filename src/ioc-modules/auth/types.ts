type _AuthServiceContractEntities = {
  User: import("#ioc-modules/users/static").UserContractEntities["User"];
  Jwt: import("#ioc-modules/technicals/jwt/static").AuthServiceContractEntities["Jwt"];
};

export type AuthServiceContractProcessRegisterUser = {
  Stage1CreateTicket: {
    RequestDto: {
      username: string;
      password: string;
      email: string;
    };
    ResponseDto: {
      ticket: {
        rid: string;
        lifetimeMs: number;
        createdAt: Date;
        deadAt: Date;
      };
      verifyHash: string;
      verifyUri: string;
    };
  };
  Stage2VerifyTicket: {
    RequestDto: {
      username: string;
      passwordHash: string;
      email: string;
      ticket: {
        rid: string;
        lifetimeMs: number;
        createdAt: Date;
        deadAt: Date;
      };
      verifyHash: string;
    };
    ResponseDto: {
      user: _AuthServiceContractEntities["User"];
      jwt: _AuthServiceContractEntities["Jwt"];
    };
  };
};

export type AuthServiceContractLoginUser = {
  RequestDto: {
    username: string;
    password: string;
  };
  ResponseDto: {
    jwt: _AuthServiceContractEntities["Jwt"];
  };
};

export type AuthServiceContract = {
  processRegisterStage1CreateTicket(
    props: AuthServiceContractProcessRegisterUser["Stage1CreateTicket"]["RequestDto"]
  ): Promise<
    AuthServiceContractProcessRegisterUser["Stage1CreateTicket"]["ResponseDto"]
  >;

  processRegisterStage2VerifyTicket(
    props: AuthServiceContractProcessRegisterUser["Stage2VerifyTicket"]["RequestDto"]
  ): Promise<
    AuthServiceContractProcessRegisterUser["Stage2VerifyTicket"]["ResponseDto"]
  >;

  login(
    props: AuthServiceContractLoginUser["RequestDto"]
  ): Promise<AuthServiceContractLoginUser["ResponseDto"]>;
};

export type AuthJwtPayload = {
  user: {
    id: string;
    username: string;
    email: string;
    role: number;
    createdAt: Date;
    updatedAt: Date;
  };
};
