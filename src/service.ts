import dotenv from "dotenv";
import { AbstractConfiguration } from "./abstract";
import { Key, Configuration, Shape } from "./types";
import {
  ConfigurationAlreadyIngestedError,
  ConfigurationFilePermissionError,
  ConfigurationNotIngestedError,
  MissingConfigurationError,
  MissingConfigurationFileError,
  UnknownConfigurationFileError,
} from "./errors";
import { hasCode } from "./helper";

export class ConfigurationService extends AbstractConfiguration {
  protected static instance?: ConfigurationService;
  protected static isIngested?: boolean;

  private constructor() {
    super();
  }

  public get<S extends Shape>(key: Key<Configuration<S>>): string {
    const value = process.env[key];
    if (!value) {
      throw new MissingConfigurationError(key);
    }
    return value;
  }

  public static getInstance(): ConfigurationService {
    if (!ConfigurationService.isIngested) {
      throw new ConfigurationNotIngestedError();
    }
    if (!ConfigurationService.instance) {
      ConfigurationService.instance = new ConfigurationService();
    }
    return ConfigurationService.instance;
  }

  public static ingest(path: string): void {
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
