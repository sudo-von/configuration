# ConfigurationService

`ConfigurationService` is a singleton service responsible for ingesting and retrieving environment configuration from `.env` files.  
It internally uses the popular [`dotenv`](https://github.com/motdotla/dotenv) package to load environment variables from a specified file.

This package includes the built `dist/` folder in the repository because there are currently no plans to publish it to the public npm registry.  
Consumers are expected to install it directly from GitHub, and the committed output ensures compatibility without requiring local builds.

## Installation

You can install the package directly from the GitHub repository using npm:

```sh
npm install github:sudo-von/configuration#vX.Y.Z
```

## Usage

Pass the path and perform the ingest once at the start of your application:

```ts
import { join } from "path";
import { ConfigurationService } from "@sudo-von/configuration";

const filename = ".env";
const directory = process.cwd();
const path = join(directory, filename);

ConfigurationService.ingest(path);
```

Get the singleton instance:

```ts
const configurationService = ConfigurationService.getInstance();
```

Retrieve values by their keys, using a custom configuration type that restricts the allowed environment variables:

```ts
type Configuration = {
  SECRET: string;
};

const secret = configurationService.get<Configuration>("SECRET");
```

## Errors

The `ConfigurationService` provides meaningful, purpose-specific error types to help you identify and handle configuration issues precisely.

### Possible Errors

- `ConfigurationAlreadyIngestedError`:  
  Thrown if you call `ingest()` more than once.

- `ConfigurationFilePermissionError`:  
  Thrown when the file exists but is not readable due to insufficient file system permissions.

- `ConfigurationNotIngestedError`:  
  Thrown if you try to access the singleton instance via `getInstance()` before calling `ingest()`.

- `MissingConfigurationError`:  
  Thrown when you request an environment variable key that was not defined or has no value.

- `MissingConfigurationFileError`:  
  Thrown when the specified file does not exist at the given path.

- `UnknownConfigurationFileError`:  
  Thrown for unknown or unexpected errors while parsing the file.