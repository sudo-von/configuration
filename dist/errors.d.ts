import { CoreError } from "@sudo-von/core";
/**
 * Error thrown when the environment variables have already been ingested.
 */
export declare class ConfigurationAlreadyIngestedError extends CoreError {
    /**
     * @param path - Path that was passed during the repeated ingestion attempt.
     */
    constructor(path: string);
}
/**
 * Error thrown when the configuration file exists but cannot be read due to insufficient permissions.
 */
export declare class ConfigurationFilePermissionError extends CoreError {
    /**
     * @param path - The full path to the configuration file.
     * @param message - The underlying system message explaining the permission issue.
     */
    constructor(path: string, message: string);
}
/**
 * Error thrown when configuration is accessed before ingestion.
 */
export declare class ConfigurationNotIngestedError extends CoreError {
    constructor();
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
/**
 * Error thrown when the configuration file is missing at the given path.
 */
export declare class MissingConfigurationFileError extends CoreError {
    /**
     * @param path - The full path where the configuration file was expected.
     */
    constructor(path: string);
}
/**
 * Error thrown when an unexpected or unknown error occurs while loading the configuration file.
 */
export declare class UnknownConfigurationFileError extends CoreError {
    /**
     * @param path - The full path to the configuration file.
     * @param message - A description of the underlying error.
     */
    constructor(path: string, message: string);
}
//# sourceMappingURL=errors.d.ts.map