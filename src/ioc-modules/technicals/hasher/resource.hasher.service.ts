import crypto from "crypto";

import { HasherServiceContract } from "./types";

export class HasherService implements HasherServiceContract {
  public constructor(private readonly salt: string) {}

  public hashWithSalt(value: string): string {
    return this._hash(value + this.salt);
  }

  private _hash(value: string): string {
    const byteArray = Buffer.from(value, "utf8");
    const hash = crypto.createHash("sha256").update(byteArray).digest("hex");
    return hash;
  }
}
