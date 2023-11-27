const fs = require('fs');
const configuration = require('./index');

jest.mock('fs');

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
      expect(config.port).toEqual(3000);
    });

    test("can load a simple string parameter from a local file", () => {
      const configFileContents = {
        port: 3000,
        clientId: "mpapp",
        clientSecret: "mysecret",
      };
      fs.readFileSync.mockReturnValue(JSON.stringify(configFileContents, null, 2));
      const config = configuration.load({
        port: null,
        clientId: null,
        clientSecret: null,
      }, {
        localConfigFile: "config.json",
      });
      expect(config).toEqual(configFileContents);
    });
  });
});
