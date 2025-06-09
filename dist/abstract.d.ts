import { Configuration, Key, Shape } from "./types";
export declare abstract class AbstractConfiguration {
    /**
     * Prevents direct instantiation of the abstract class.
     */
    protected constructor();
    /**
     * Retrieves a configuration value.
     * Should throw an error if the value is not defined.
     * For now, it is not planned to support return types other than string.
     *
     * @param key - The configuration key to retrieve.
     *
     * @returns The corresponding configuration value as a string.
     */
    get<S extends Shape>(_key: Key<Configuration<S>>): string;
    /**
     * Returns the singleton instance of the ConfigurationService.
     *
     * @returns The singleton instance.
     */
    static getInstance(): AbstractConfiguration;
    /**
     * Loads the environment variables from a file.
     * For now, passing a path as a parameter is not planned;
     */
    protected load(): void;
}
//# sourceMappingURL=abstract.d.ts.map