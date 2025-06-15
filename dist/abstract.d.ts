import { Configuration, Key, Shape } from "./types";
export declare abstract class AbstractConfiguration {
    /**
     * Singleton instance of the configuration service.
     */
    protected static instance?: AbstractConfiguration;
    /**
     * Indicates whether the environment variables have been ingested.
     */
    protected static isIngested?: boolean;
    /**
     * Prevents direct instantiation of the abstract class.
     */
    protected constructor();
    /**
     * Retrieves a configuration value.
     *
     * @param key - The configuration key to retrieve.
     *
     * @returns The corresponding configuration value as a string.
     */
    abstract get<S extends Shape>(key: Key<Configuration<S>>): string;
    /**
     * Returns the singleton instance of the ConfigurationService.
     *
     * @returns The singleton instance.
     */
    static getInstance(): AbstractConfiguration;
    /**
     * Ingests environment variables from a file.
     *
     * @param path - Path to the environment file.
     */
    static ingest(_path: string): void;
}
//# sourceMappingURL=abstract.d.ts.map