import { CoreError } from '@sudo-von/core';

/**
 * Error thrown when a configuration value that is expected to be numeric is not valid.
 *
 * This error occurs when the environment variable is defined but contains a non-numeric value.
 *
 * @param configuration - The name of the configuration variable.
 * @param value - The actual value retrieved from the environment that failed numeric validation.
 */
export class InvalidConfigurationAsNumberError extends CoreError {
  constructor(configuration: string, value: string) {
    super(`Invalid value '${value}' for '${configuration}' configuration. It must be a valid number.`);
  }
}

/**
 * Error thrown when a required configuration value is missing from the environment.
 *
 * This is typically used during application startup to indicate that a critical environment variable
 * has not been defined or set.
 *
 * @param configuration - The name of the missing configuration variable (e.g., 'DATABASE_URL').
 */
export class MissingConfigurationError extends CoreError {
  constructor(configuration: string) {
    super(`Missing required configuration: '${configuration}'.`);
  }
}
