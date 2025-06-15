import dotenv from "dotenv";
import { AbstractConfiguration } from "./abstract";
import { ConfigurationAlreadyIngestedError, ConfigurationFilePermissionError, ConfigurationNotIngestedError, MissingConfigurationError, MissingConfigurationFileError, UnknownConfigurationFileError, } from "./errors";
import { hasCode } from "./helper";
export class ConfigurationService extends AbstractConfiguration {
    constructor() {
        super();
    }
    get(key) {
        const value = process.env[key];
        if (!value) {
            throw new MissingConfigurationError(key);
        }
        return value;
    }
    static getInstance() {
        if (!ConfigurationService.isIngested) {
            throw new ConfigurationNotIngestedError();
        }
        if (!ConfigurationService.instance) {
            ConfigurationService.instance = new ConfigurationService();
        }
        return ConfigurationService.instance;
    }
    static ingest(path) {
        if (ConfigurationService.isIngested) {
            throw new ConfigurationAlreadyIngestedError(path);
        }
        const { error } = dotenv.config({ path });
        if (error) {
            const { message } = error;
            if (!hasCode(error)) {
                throw new UnknownConfigurationFileError(path, message);
            }
            const { code } = error;
            switch (code) {
                case "ENOENT":
                    throw new MissingConfigurationFileError(path);
                case "EACCES":
                    throw new ConfigurationFilePermissionError(path, message);
                default:
                    throw new UnknownConfigurationFileError(path, message);
            }
        }
        ConfigurationService.isIngested = true;
    }
}
//# sourceMappingURL=service.js.map