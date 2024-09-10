import type { JWTServiceContract } from "#ioc-modules/technicals/jwt/static";
import type { MailSenderServiceContract } from "#ioc-modules/technicals/mail-sender/static";
import type { HasherServiceContract } from "#ioc-modules/technicals/hasher/static";
import type { CryptoServiceContract } from "#ioc-modules/technicals/crypto/static";
import type { UserCRUDServiceContract } from "#ioc-modules/users/static";

import {
  AuthJwtPayload,
  AuthServiceContract,
  AuthServiceContractLoginUser,
  AuthServiceContractProcessRegisterUser,
} from "./types";
import { jwtPayloadSerialize } from "./methods";

const TICKET_LIFETIME_MS = 300000; // 5 minutes

/**
 * TODO: maybe use username like salt for hash password ?
 *       this will make the hashes more random,
 *       but it affects business requirements
 */

export class AuthService implements AuthServiceContract {
  public constructor(
    private readonly urlVerifyTicket: string,

    private readonly jwtService: JWTServiceContract,
    private readonly mailSenderService: MailSenderServiceContract,
    private readonly hasherService: HasherServiceContract,
    private readonly cryptoService: CryptoServiceContract,

    private readonly userCRUDService: UserCRUDServiceContract
  ) {}

  public async processRegisterStage1CreateTicket(
    props: AuthServiceContractProcessRegisterUser["Stage1CreateTicket"]["RequestDto"]
  ): Promise<
    AuthServiceContractProcessRegisterUser["Stage1CreateTicket"]["ResponseDto"]
  > {
    await this.validateUserAlreadyExists(props);

    const rid = Math.random().toString(36);
    const lifetimeMs = TICKET_LIFETIME_MS;
    const createdAt = new Date();
    const deadAt = new Date(createdAt.getTime() + lifetimeMs);

    const passwordHash = this.hasherService.hashWithSalt(props.password);
    const passwordCrypted = this.cryptoService.encrypt(passwordHash, rid);
    const { uri, hash } = this.generateVerifyUri({
      email: props.email,
      passwordHash: passwordCrypted,
      username: props.username,
      rid,
      createdAt: createdAt.toISOString(),
      deadAt: deadAt.toISOString(),
      lifetimeMs: lifetimeMs.toString(),
    });

    const response: AuthServiceContractProcessRegisterUser["Stage1CreateTicket"]["ResponseDto"] =
      {
        ticket: {
          rid,
          lifetimeMs,
          createdAt,
          deadAt,
        },
        verifyHash: hash,
        verifyUri: uri,
      };

    await this.mailSenderService.sendMail({
      to: props.email,
      subject: "Create new user",
      html: `
        <p>URI <code>${uri}</code></p>
        <hr />
        <a href="${uri}">Click here</a>
      `,
    });

    return response;
  }

  public async processRegisterStage2VerifyTicket(
    props: AuthServiceContractProcessRegisterUser["Stage2VerifyTicket"]["RequestDto"]
  ): Promise<
    AuthServiceContractProcessRegisterUser["Stage2VerifyTicket"]["ResponseDto"]
  > {
    await this.validateUserAlreadyExists(props);

    const timestamp = Date.now();

    const verifyHash = this.generateVerifyHash({
      email: props.email,
      username: props.username,
      passwordHash: props.passwordHash,
      rid: props.ticket.rid,
      lifetimeMs: props.ticket.lifetimeMs.toString(),
      createdAt: props.ticket.createdAt.toISOString(),
      deadAt: props.ticket.deadAt.toISOString(),
    });

    if (verifyHash !== props.verifyHash) {
      /// TODO: add special error 0x1
      throw new Error("Bad ticket");
    }
    if (timestamp > props.ticket.deadAt.getTime()) {
      /// TODO: add special error 0x1
      throw new Error("Bad ticket");
    }

    const passwordHash = this.cryptoService.decrypt(
      props.passwordHash,
      props.ticket.rid
    );

    const { user } = await this.userCRUDService.create({
      email: props.email,
      username: props.username,
      passwordHash,
    });

    const jwtPayload: AuthJwtPayload = {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };

    const { jwt } = this.jwtService.sign({
      payload: jwtPayloadSerialize(jwtPayload),
    });

    return { user, jwt };
  }

  public async login(
    props: AuthServiceContractLoginUser["RequestDto"]
  ): Promise<AuthServiceContractLoginUser["ResponseDto"]> {
    const passwordHash = this.hasherService.hashWithSalt(props.password);

    const { user } = await this.userCRUDService.findByUsername({
      username: props.username,
    });

    if (user.passwordHash !== passwordHash) {
      /// TODO: add special error 0x2
      throw new Error("Bad password");
    }

    const jwtPayload: AuthJwtPayload = {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };

    const { jwt } = this.jwtService.sign({
      payload: jwtPayloadSerialize(jwtPayload),
    });

    return { jwt };
  }

  private async validateUserAlreadyExists(props: {
    username: string;
    email: string;
  }) {
    const { exists } = await this.userCRUDService.checkUserExists({
      username: props.username,
      email: props.email,
    });

    if (exists) {
      /// TODO: add special error 0x3
      throw new Error("User already exists");
    }
  }

  private generateVerifyUri(props: {
    rid: string;
    lifetimeMs: string;
    createdAt: string;
    deadAt: string;
    username: string;
    passwordHash: string;
    email: string;
  }) {
    const hash = this.generateVerifyHash(props);
    const url = new URL(this.urlVerifyTicket);

    url.searchParams.append("verifyHash", hash);
    for (const [key, value] of Object.entries(props)) {
      url.searchParams.append(key, value);
    }

    const uri = url.toString();

    return { uri, hash };
  }

  private generateVerifyHash(props: {
    rid: string;
    lifetimeMs: string;
    createdAt: string;
    deadAt: string;
    username: string;
    passwordHash: string;
    email: string;
  }): string {
    const compoments = [
      props.rid,
      props.lifetimeMs,
      props.createdAt,
      props.deadAt,
      props.username,
      props.passwordHash,
      props.email,
    ];

    const key = JSON.stringify(compoments);
    const hash = this.hasherService.hashWithSalt(key);
    return hash;
  }
}
