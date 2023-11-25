const parameters = require('./parameters');

describe("parameters", () => {
  describe("nameToEnvironmentVariableName", () => {
    test("correctly maps single word parameters to uppercase", () => {
      const input = "port";
      const result = parameters.nameToEnvironmentVariableName(input);
      expect(result).toEqual("PORT");
    });

    xtest("correctly separates words with underscores", () => {
      expect(parameters.nameToEnvironmentVariableName("debugMode")).toEqual("DEBUG_MODE");
      expect(parameters.nameToEnvironmentVariableName("debug_mode")).toEqual("DEBUG_MODE");
    });
  });
});
