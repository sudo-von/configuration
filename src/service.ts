import dotenv from "dotenv";
import fs from "fs";
import { Key, Configuration, Shape } from "./types";
import { AbstractConfiguration } from "./abstract";
import {
  ConfigurationAlreadyIngestedError,
  ConfigurationFileNotReadableError,
  ConfigurationNotIngestedError,
  FailedToParseConfigurationFileError,
  MissingConfigurationError,
  MissingConfigurationFileError,
} from "./errors";

export class ConfigurationService extends AbstractConfiguration {
  protected static instance: ConfigurationService;
  protected static isIngested: boolean = false;

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

    const fileExists = fs.existsSync(path);
    if (!fileExists) {
      throw new MissingConfigurationFileError(path);
    }

    try {
      fs.accessSync(path, fs.constants.R_OK);
    } catch (e) {
      const { message } = e as Error;
      throw new ConfigurationFileNotReadableError(path, message);
    }

    const { error } = dotenv.config({ path });
    if (error) {
      const { message } = error;
      throw new FailedToParseConfigurationFileError(path, message);
    }

    ConfigurationService.isIngested = true;
  }
}
