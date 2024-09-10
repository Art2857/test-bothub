import { CryptoService } from "./resource.crypto.service";

let cryptoService: CryptoService;

beforeAll(() => {
  cryptoService = new CryptoService("uA6t8Mshnv3=BrdU5$-pYH*?&HjfC-km");
});

describe("Encode/Decode", () => {
  it("Success", () => {
    const content = "Private Content";

    const encrypted = cryptoService.encrypt(content, "23423");
    const decrypted = cryptoService.decrypt(encrypted, "23423");

    expect(decrypted).toBe(content);
  });

  it("Failed", () => {
    const content = "Private Content";

    const encrypted = cryptoService.encrypt(content, "23423");

    expect(() => cryptoService.decrypt(encrypted, "12345")).toThrow();
  });
});
