import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { Key, Configuration, Shape } from "./types";
import { AbstractConfiguration } from "./abstract";
import {
  ConfigurationFileNotFoundError,
  ConfigurationFileNotReadableError,
  FailedToParseConfigurationFileError,
  MissingConfigurationError,
} from "./errors";

class ConfigurationService extends AbstractConfiguration {
  protected static instance: ConfigurationService;

  private constructor() {
    super();
    this.load();
  }

  public get<S extends Shape>(key: Key<Configuration<S>>): string {
    const value = process.env[key];
    if (!value) {
      throw new MissingConfigurationError(key);
    }
    return value;
  }

  public static getInstance(): ConfigurationService {
    if (!ConfigurationService.instance) {
      ConfigurationService.instance = new ConfigurationService();
    }
    return ConfigurationService.instance;
  }

  protected load() {
    const filename = ".env";
    const workingDirectory = process.cwd();
    const filePath = path.join(workingDirectory, filename);

    if (!fs.existsSync(filePath)) {
      throw new ConfigurationFileNotFoundError(filename, filePath);
    }

    try {
      fs.accessSync(filePath, fs.constants.R_OK);
    } catch (e) {
      const error = e as Error;
      throw new ConfigurationFileNotReadableError(
        filename,
        filePath,
        error.message
      );
    }

    const { error } = dotenv.config({ path: filePath });
    if (error) {
      throw new FailedToParseConfigurationFileError(
        filename,
        filePath,
        error.message
      );
    }
  }
}