import { CoreError } from "@sudo-von/core";

/**
 * Error thrown when the environment variables have already been ingested.
 */
export class ConfigurationAlreadyIngestedError extends CoreError {
  /**
   * @param path - Path that was passed during the repeated ingestion attempt.
   */
  constructor(path: string) {
    super(
      `Configuration has already been ingested. Duplicate call attempted with path: ${path}.`
    );
  }
}

/**
 * Error thrown when the configuration file exists but cannot be read due to insufficient permissions.
 */
export class ConfigurationFilePermissionError extends CoreError {
  /**
   * @param path - The full path to the configuration file.
   * @param message - The underlying system message explaining the permission issue.
   */
  constructor(path: string, message: string) {
    super(
      `Insufficient permissions to read configuration file at path: ${path}, message: ${message}.`
    );
  }
}

/**
 * Error thrown when configuration is accessed before ingestion.
 */
export class ConfigurationNotIngestedError extends CoreError {
  constructor() {
    super("Cannot obtain configuration instance before ingestion.");
  }
}

/**
 * Error thrown when a required configuration value is missing from the environment
 */
export class MissingConfigurationError extends CoreError {
  /**
   * @param configuration - The name of the missing configuration variable.
   */
  constructor(configuration: string) {
    super(`Missing required configuration: '${configuration}'.`);
  }
}

/**
 * Error thrown when the configuration file is missing at the given path.
 */
export class MissingConfigurationFileError extends CoreError {
  /**
   * @param path - The full path where the configuration file was expected.
   */
  constructor(path: string) {
    super(`Configuration file was not found at path: ${path}.`);
  }
}

/**
 * Error thrown when an unexpected or unknown error occurs while loading the configuration file.
 */
export class UnknownConfigurationFileError extends CoreError {
  /**
   * @param path - The full path to the configuration file.
   * @param message - A description of the underlying error.
   */
  constructor(path: string, message: string) {
    super(
      `An unknown error occurred while loading the configuration file at path: ${path}, message: ${message}.`
    );
  }
}
