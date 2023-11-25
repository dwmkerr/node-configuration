const { nameToEnvironmentVariableName } = require('./parameters');

function loadParameter(spec, env) {
  return env[nameToEnvironmentVariableName(spec.name)];
}

function load(spec, options) {
  const env = options.env || process.env;

  //  Go through the keys in the spec.
  const parameters = Object
    .getOwnPropertyNames(spec)
    .reduce((result, propertyName) => {
      const value = loadParameter({ name: propertyName}, env);
      console.log(`property ${propertyName}: ${value}`);
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
