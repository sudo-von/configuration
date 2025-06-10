import { MethodNotImplementedYetError } from "@sudo-von/core";
import { Configuration, Key, Shape } from "./types";

export abstract class AbstractConfiguration {
  /**
   * Singleton instance of the configuration service.
   * Ensures that only one instance exists throughout the application lifecycle.
   */
  protected static instance: AbstractConfiguration;

  /**
   * Indicates whether the environment variables have been ingested.
   * This is used to ensure that the ingest operation is only performed once.
   */
  protected static isIngested?: boolean;

  /**
   * Prevents direct instantiation of the abstract class.
   */
  protected constructor() { }

  /**
   * Retrieves a configuration value.
   * Should throw an error if the value is not defined.
   * For now, it is not planned to support return types other than string.
   *
   * @param key - The configuration key to retrieve.
   *
   * @returns The corresponding configuration value as a string.
   */
  public abstract get<S extends Shape>(key: Key<Configuration<S>>): string;

  /**
   * Returns the singleton instance of the ConfigurationService.
   *
   * @returns The singleton instance.
   */
  public static getInstance(): AbstractConfiguration {
    throw new MethodNotImplementedYetError("getInstance");
  }

  /**
   * Ingests environment variables from a file.
   *
   * @param path - Path to the environment file.
   */
  public static ingest(_path: string): void {
    throw new MethodNotImplementedYetError("ingest");
  }
}
