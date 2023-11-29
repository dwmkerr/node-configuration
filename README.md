# node-configuration

Simple configuration for Node applications, load from files, environment variables or parameters.

## Quickstart

Install:

```bash
npm install --save node-configuration
```

Load basic configuration from the environment:

```javascript
const config = configuration.load({
    port: null,
});
console.log(`Environment variable PORT: ${config.port}`);
```

Load basic configuration from a file:

Create a simple JSON file:

```bash
cat << EOF > config.json
{
  "clientId": "myapp",
  "clientSecret": "mysecret"
}
EOF
```

Use it like so:

```javascript
const config = configuration.load({
    port: null,
    clientId: param,
    clientSecret: param,
}, {
    localConfigFile: "./config.json"
});
console.log(config);
```

### Loading Environment Variables

You can specify a prefix for environment variables to reduce the chance that your parameter names clash with other parameters. With the following environment variables:

```bash
export MYAPP_VERBOSE=1
```

And this config:

```javascript
console.log(configuration.load({
  verbose
}, {
  appPrefix: "MYAPP"
});
```

The output is:

```
{
  verbose: "1"
}
```


## Advanced Techniques

Validation of parameters.

For more sophisticated validation of types, string lengths, patterns, etc etc, a dedicated library can be used. For example, using [Joi](https://joi.dev):

```javascript
TODO
```

## Braindump

```javascript
//  braindump.js

const configDefinition = configuration({
  //  Full specification of parameters.
  port: configuration.parameter({
    type: Number,
    parameterName: 'port',
    environmentVariableName: 'PORT',
  }),

  //  Simple specification of parameters.
  arcgisApiKey: configuration.parameter('arcgisApiKey'),
  arcgisClientKey: configuration.parameter('arcgisApiKey'),

  //  Even more simple specification of parameters.
  arcgisApiKey: configuration.parameter('arcgisApiKey'),

  pirateWeatherApiKey: null,
});

//  Load them up...
const config = config.load({
  env: process.env,
  userPath: '~/.config',
  systemPath: '/etc/config',
  localPath: './.config',
  customLoaders: [],
});

const PORT = process.env.PORT || 3000;
const ARCGIS_API_KEY = process.env.TRIPPY_ARCGIS_API_KEY || config.ARCGIS_API_KEY;
const ARCGIS_CLIENT_ID = process.env.TRIPPY_ARCGIS_CLIENT_ID || config.ARCGIS_CLIENT_ID;
const ARCGIS_CLIENT_SECRET = process.env.TRIPPY_ARCGIS_CLIENT_SECRET || config.ARCGIS_CLIENT_SECRET;

//  If we don't have an API key, let's fail now.
if (!ARCGIS_API_KEY) {
  console.error("TRIPPY_ARCGIS_API_KEY must be provided");
  process.exit(1);
}

const session = new ApplicationSession({
  clientId: ARCGIS_CLIENT_ID,
  clientSecret: ARCGIS_CLIENT_SECRET
});


app.listen(PORT, async () => {
  console.log("Server Listening on port:", PORT);
   console.log("  ARCGIS_API_KEY:", mask(ARCGIS_API_KEY, "*", 4).substring(0, 10) + "...");
```

| Command | Description |
| ------- | ----------- |
| npm run test | Run tests. |
| npm run test:debug | Debug tests. |
| npm run test:cov | Run tests with coverage reported. |


## TODO

- [ ] prefix app name for env vars option
- [ ] create the param.number() type stuff
