function nameToEnvironmentVariableName(name, options) {
  const appPrefix = options?.appPrefix;

  //  Convert camel case to snake case.
  const camelCaseToSnakeCase = (input) => (input.replace(/([a-z])([A-Z])/g, '$1_$2'));
  const casedName = camelCaseToSnakeCase(name);

  //  Add the prefix if needed.
  const parameterName = appPrefix ? `${appPrefix}_${casedName}` : casedName;
  return parameterName.toUpperCase();
}

module.exports = {
  nameToEnvironmentVariableName,
};
