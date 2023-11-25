const configuration = require('./index');

describe("configuration", () => {
  describe("load", () => {
    test("can load a simple string parameter from the envionment", () => {
      const testEnv = {
        PORT: 3000,
      };
      const config = configuration.load({
        port: null,
      }, {
        env: testEnv,
      });
      console.log(config);
      expect(config.port).toEqual(3000);
    });
  });
});
