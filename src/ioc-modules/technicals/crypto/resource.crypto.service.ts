import crypto from "crypto";

import { CryptoException } from "./exceptions";
import { CryptoServiceContract } from "./types";

export class CryptoService implements CryptoServiceContract {
  public constructor(private readonly secret: string) {}

  public encrypt(text: string, salt: null | string): string {
    try {
      const secret = this.mixSaltToSecret(salt);

      const iv = crypto.randomBytes(16);
      const cipher = crypto.createCipheriv("aes-256-cbc", secret, iv);
      const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
      const encoded = iv.toString("hex") + ":" + encrypted.toString("hex");

      return encoded;
    } catch {
      throw new CryptoException();
    }
  }

  public decrypt(encryptedText: string, salt: null | string): string {
    try {
      const secret = this.mixSaltToSecret(salt);

      const parts = encryptedText.split(":");
      const iv = Buffer.from(parts[0], "hex");
      const encrypted = Buffer.from(parts[1], "hex");
      const decipher = crypto.createDecipheriv("aes-256-cbc", secret, iv);
      const decrypted = Buffer.concat([
        decipher.update(encrypted),
        decipher.final(),
      ]);
      const decoded = decrypted.toString();

      return decoded;
    } catch {
      throw new CryptoException();
    }
  }

  private mixSaltToSecret(salt: null | string): string {
    return salt ? (salt + this.secret).slice(0, 32) : this.secret;
  }
}
