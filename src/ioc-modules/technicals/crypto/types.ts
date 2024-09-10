export type CryptoServiceContract = {
  encrypt(text: string, salt: null | string): string;
  decrypt(text: string, salt: null | string): string;
};
