import { MethodNotImplementedYetError } from "@sudo-von/core";
import { Configuration, Key, Shape } from "./types";

export abstract class AbstractConfiguration {
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
  public get<S extends Shape>(_key: Key<Configuration<S>>): string {
    throw new MethodNotImplementedYetError("getConfiguration");
  }

  /**
   * Returns the singleton instance of the ConfigurationService.
   * 
   * @returns The singleton instance.
   */
  public static getInstance(): AbstractConfiguration {
    throw new MethodNotImplementedYetError("getInstance");
  }

  /**
   * Loads the environment variables from a file.
   * For now, passing a path as a parameter is not planned;
   */
  protected load(): void {
    throw new MethodNotImplementedYetError("load");
  }
}
