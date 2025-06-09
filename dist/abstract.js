import { MethodNotImplementedYetError } from "@sudo-von/core";
export class AbstractConfiguration {
    /**
     * Prevents direct instantiation of the abstract class.
     */
    constructor() { }
    /**
     * Retrieves a configuration value.
     * Should throw an error if the value is not defined.
     * For now, it is not planned to support return types other than string.
     *
     * @param key - The configuration key to retrieve.
     *
     * @returns The corresponding configuration value as a string.
     */
    get(_key) {
        throw new MethodNotImplementedYetError("getConfiguration");
    }
    /**
     * Returns the singleton instance of the ConfigurationService.
     *
     * @returns The singleton instance.
     */
    static getInstance() {
        throw new MethodNotImplementedYetError("getInstance");
    }
    /**
     * Loads the environment variables from a file.
     * For now, passing a path as a parameter is not planned;
     */
    load() {
        throw new MethodNotImplementedYetError("load");
    }
}
//# sourceMappingURL=abstract.js.map