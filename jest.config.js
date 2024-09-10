module.exports = {
  testPathIgnorePatterns: ["/node_modules/"],
  testMatch: ["**/*.test@unit.ts", "**/*.test@[i]int.ts"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  moduleNameMapper: {
    "^#libs/(.*)$": "<rootDir>/src/libs/$1",
    "^#ioc-modules/(.*)$": "<rootDir>/src/ioc-modules/$1",
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};
