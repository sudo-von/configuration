import { CoreError } from "@sudo-von/core";

/**
 * Error thrown when the environment variables have already been ingested.
 */
export class ConfigurationAlreadyIngestedError extends CoreError {
  /**
   * @param path - Path that was passed during the repeated ingestion attempt.
   */
  constructor(path: string) {
    super(`Configuration has already been ingested. Duplicate call attempted with path: ${path}.`);
  }
}

/**
 * Error thrown when the configuration file exists but is not readable.
 */
export class ConfigurationFileNotReadableError extends CoreError {
  /**
   * @param path - The full path to the configuration file.
   * @param reason - The reason reading failed.
   */
  constructor(path: string, reason: string) {
    super(`Configuration file is not readable at path: ${path}, reason: ${reason}.`);
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
 * Error thrown when the configuration file cannot be parsed.
 */
export class FailedToParseConfigurationFileError extends CoreError {
  /**
   * @param path - The full path to the configuration file.
   * @param reason - The reason parsing failed.
   */
  constructor(path: string, reason: string) {
    super(`Failed to parse configuration file at ${path}, reason: ${reason}.`);
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
