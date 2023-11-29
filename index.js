const fs = require('fs');
const { nameToEnvironmentVariableName } = require('./parameters');

function loadParameter(spec, env, appPrefix) {
  const parameterName = nameToEnvironmentVariableName(spec.name, {
    appPrefix,
  });
  return env[parameterName];
}

function loadJson(path) {
  return JSON.parse(fs.readFileSync(path, { encoding: 'utf8', flag: 'r' }));
}

function load(spec, options) {
  const env = options.env || process.env;
  const appPrefix = options.appPrefix;
  const localConfigFile = options.localConfigFile || null;

  const localConfigContents = localConfigFile ? loadJson(localConfigFile) : {};

  //  Go through the keys in the spec.
  const parameters = Object
    .getOwnPropertyNames(spec)
    .reduce((result, propertyName) => {
      const configValue = localConfigFile ? localConfigContents[propertyName] : undefined;
      const envValue = loadParameter({ name: propertyName}, env, appPrefix);
      const value = configValue || envValue;
      console.log(`Property ${propertyName}
  Local Config File: ${configValue}
  Environment      : ${envValue}
  Resolves to     => ${value}`);
      //  Return the result object with a new key - the property name - with the
      //  value set.
      return {
        ...result,
        [propertyName]: value,
      };
    }, {});

  return parameters;
}

module.exports = {
  load,
};
