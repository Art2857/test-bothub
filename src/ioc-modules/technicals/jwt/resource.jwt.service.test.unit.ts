import { JWTService } from "./resource.jwt.service";

let jwtService1: JWTService;
let jwtService2: JWTService;

beforeAll(() => {
  jwtService1 = new JWTService("3n09r2893rjf2w398f", "1h");
  jwtService2 = new JWTService("h894589gh3n4g8347hr", "2s");
});

describe("Test jwt verified", () => {
  it("Success", () => {
    const user = {
      id: 123,
      name: "John",
    };

    const { jwt } = jwtService1.sign({
      payload: {
        user,
      },
    });

    const { payload } = jwtService1.verify(jwt.token);

    expect(payload["user"]).toEqual(user);
  });

  it("Failed", () => {
    const user = {
      id: 123,
      name: "John",
    };

    const { jwt } = jwtService1.sign({
      payload: {
        user,
      },
    });

    expect(() => {
      jwtService2.verify(jwt.token);
    }).toThrow();
  });
});

describe("Test jwt expired", () => {
  it("Expired", async () => {
    const user = {
      id: 123,
      name: "John",
    };

    const { jwt } = jwtService2.sign({
      payload: {
        user,
      },
    });

    await new Promise((resolve) => setTimeout(resolve, 3 * 1000));

    expect(() => {
      jwtService2.verify(jwt.token);
    }).toThrow();
  });
});
