import { MethodNotImplementedYetError } from "@sudo-von/core";
export class AbstractConfiguration {
    /**
     * Prevents direct instantiation of the abstract class.
     */
    constructor() { }
    /**
     * Returns the singleton instance of the ConfigurationService.
     *
     * @returns The singleton instance.
     */
    static getInstance() {
        throw new MethodNotImplementedYetError("getInstance");
    }
    /**
     * Ingests environment variables from a file.
     *
     * @param path - Path to the environment file.
     */
    static ingest(_path) {
        throw new MethodNotImplementedYetError("ingest");
    }
}
//# sourceMappingURL=abstract.js.map