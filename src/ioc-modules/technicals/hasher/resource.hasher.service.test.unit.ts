import { HasherService } from "./resource.hasher.service";

const salt = ":salt";
let hasherService: HasherService;

beforeAll(() => {
  hasherService = new HasherService(salt);
});

describe("Test from https://sha256.online/", () => {
  it("hash -> Hello World", () => {
    const content = "Hello World";

    const hash = hasherService.hashWithSalt(content);
    expect(hash).toBe(
      "1beb2936178ef0af76cafa48b04856a382157248677f09340c1b19ae92caf26a"
    );
  });

  it("hash -> Random symbols", () => {
    const content = "9f239f@346jj9v!@#T@#TF@Q#T%$Y)j89j dgf";

    const hash = hasherService.hashWithSalt(content);
    expect(hash).toBe(
      "b5bec30fbb1d64b1fcf630c7aba362b00269b7f8e975fcacd9134268725885d3"
    );
  });
});
