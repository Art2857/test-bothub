type UserAccesses = number;

export type UserContractEntities = {
  User: {
    id: string;
    username: string;
    email: string;
    passwordHash: string;
    role: UserAccesses;
    createdAt: Date;
    updatedAt: Date;
  };
};

export type UserCRUDServiceContractCreate = {
  RequestDto: {
    username: string;
    email: string;
    passwordHash: string;
    role?: UserAccesses;
  };
  ResponseDto: {
    user: UserContractEntities["User"];
  };
};

export type UserCRUDServiceContractFindById = {
  RequestDto: {
    id: string;
  };
  ResponseDto: {
    user: UserContractEntities["User"];
  };
};

export type UserCRUDServiceContractFindByUsername = {
  RequestDto: {
    username: string;
  };
  ResponseDto: {
    user: UserContractEntities["User"];
  };
};

export type UserCRUDServiceContractChangeRole = {
  RequestDto: {
    id: string;
    role: UserAccesses;
  };
  ResponseDto: {
    user: UserContractEntities["User"];
  };
};

export type UserCRUDServiceContractCheckUserExists = {
  RequestDto: {
    email?: string;
    username?: string;
  };
  ResponseDto: {
    exists: boolean;
  };
};

export type UserCRUDServiceContract = {
  create(
    props: UserCRUDServiceContractCreate["RequestDto"]
  ): Promise<UserCRUDServiceContractCreate["ResponseDto"]>;
  findById(
    props: UserCRUDServiceContractFindById["RequestDto"]
  ): Promise<UserCRUDServiceContractFindById["ResponseDto"]>;
  findByUsername(
    props: UserCRUDServiceContractFindByUsername["RequestDto"]
  ): Promise<UserCRUDServiceContractFindByUsername["ResponseDto"]>;
  changeRole(
    props: UserCRUDServiceContractChangeRole["RequestDto"]
  ): Promise<UserCRUDServiceContractChangeRole["ResponseDto"]>;
  checkUserExists(
    props: UserCRUDServiceContractCheckUserExists["RequestDto"]
  ): Promise<UserCRUDServiceContractCheckUserExists["ResponseDto"]>;
};
