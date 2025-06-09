import { CoreError } from '@sudo-von/core';

/**
 * Error thrown when the configuration file is not found at the expected path.
 */
export class ConfigurationFileNotFoundError extends CoreError {
  /**
   * @param filename - The name of the missing configuration file.
   * @param path - The full path where the file was expected.
   */
  constructor(filename: string, path: string) {
    super(`Configuration file '${filename}' was not found at path: ${path}.`);
  }
}

/**
 * Error thrown when the configuration file exists but is not readable.
 */
export class ConfigurationFileNotReadableError extends CoreError {
  /**
   * @param filename - The name of the configuration file.
   * @param path - The full path to the configuration file.
   * @param reason - The reason reading failed.
   */
  constructor(filename: string, path: string, reason: string) {
    super(`Configuration file '${filename}' is not readable at path: ${path}, reason: ${reason}.`);
  }
}

/**
 * Error thrown when the configuration file cannot be parsed.
 */
export class FailedToParseConfigurationFileError extends CoreError {
  /**
   * @param filename - The name of the configuration file.
   * @param path - The full path to the configuration file.
   * @param reason - The reason parsing failed.
   */
  constructor(filename: string, path: string, reason: string) {
    super(`Failed to parse configuration file '${filename}' at ${path}: ${reason}.`);
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