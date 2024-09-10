import { PrismaClient } from "@prisma/client";

import { PrismaMapPubError } from "#libs/prisma";

import { RolesServiceContract } from "#ioc-modules/roles/static";

import {
  UserCRUDServiceContract,
  UserCRUDServiceContractChangeRole,
  UserCRUDServiceContractCheckUserExists,
  UserCRUDServiceContractCreate,
  UserCRUDServiceContractFindById,
  UserCRUDServiceContractFindByUsername,
} from "./types";

export class UserCRUDService implements UserCRUDServiceContract {
  public constructor(
    private readonly prisma: PrismaClient,
    private readonly rolesService: RolesServiceContract
  ) {}

  public async create(
    props: UserCRUDServiceContractCreate["RequestDto"]
  ): Promise<UserCRUDServiceContractCreate["ResponseDto"]> {
    const role = this.rolesService.applyMask(
      props.role === undefined ? this.rolesService.default : props.role
    );

    const user = await this.prisma.user.create({
      data: {
        username: props.username,
        email: props.email,
        passwordHash: props.passwordHash,
        role,
      },
    });
    return { user };
  }

  @PrismaMapPubError
  public async findById(
    props: UserCRUDServiceContractFindById["RequestDto"]
  ): Promise<UserCRUDServiceContractFindById["ResponseDto"]> {
    const user = await this.prisma.user.findFirstOrThrow({
      where: { id: props.id },
    });

    return { user };
  }

  @PrismaMapPubError
  public async changeRole(
    props: UserCRUDServiceContractChangeRole["RequestDto"]
  ): Promise<UserCRUDServiceContractChangeRole["ResponseDto"]> {
    const role = this.rolesService.applyMask(props.role);

    const user = await this.prisma.user.update({
      where: { id: props.id },
      data: { role },
    });
    return { user };
  }

  @PrismaMapPubError
  public async findByUsername(
    props: UserCRUDServiceContractFindByUsername["RequestDto"]
  ): Promise<UserCRUDServiceContractFindByUsername["ResponseDto"]> {
    const user = await this.prisma.user.findFirstOrThrow({
      where: { username: props.username },
    });
    return { user };
  }

  @PrismaMapPubError
  public async checkUserExists(
    props: UserCRUDServiceContractCheckUserExists["RequestDto"]
  ): Promise<UserCRUDServiceContractCheckUserExists["ResponseDto"]> {
    const user = await this.prisma.user.findFirst({
      where: { OR: [{ username: props.username }, { email: props.email }] },
    });

    return { exists: !!user };
  }
}
