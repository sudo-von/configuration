import { CoreError } from '@sudo-von/core';
/**
 * Error thrown when the configuration file is not found at the expected path.
 */
export declare class ConfigurationFileNotFoundError extends CoreError {
    /**
     * @param filename - The name of the missing configuration file.
     * @param path - The full path where the file was expected.
     */
    constructor(filename: string, path: string);
}
/**
 * Error thrown when the configuration file exists but is not readable.
 */
export declare class ConfigurationFileNotReadableError extends CoreError {
    /**
     * @param filename - The name of the configuration file.
     * @param path - The full path to the configuration file.
     * @param reason - The reason reading failed.
     */
    constructor(filename: string, path: string, reason: string);
}
/**
 * Error thrown when the configuration file cannot be parsed.
 */
export declare class FailedToParseConfigurationFileError extends CoreError {
    /**
     * @param filename - The name of the configuration file.
     * @param path - The full path to the configuration file.
     * @param reason - The reason parsing failed.
     */
    constructor(filename: string, path: string, reason: string);
}
/**
 * Error thrown when a required configuration value is missing from the environment
 */
export declare class MissingConfigurationError extends CoreError {
    /**
     * @param configuration - The name of the missing configuration variable.
     */
    constructor(configuration: string);
}
//# sourceMappingURL=errors.d.ts.map