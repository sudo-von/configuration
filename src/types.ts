
/**
 * Represents the full shape of the application's configuration.
 */
export type Configuration<T extends object = {}> = T;

/**
 * Represents a valid key from the configuration object.
 */
export type Key = keyof Configuration;

/**
 * This interface defines the contract that any configuration service implementation 
 * must adhere to in order to retrieve validated and strongly-typed configuration values 
 * from the application.
 */
export interface IConfigurationService {
  /**
   * Retrieves a validated and strongly typed configuration value by key.
   *
   * @param key - The key used to retrieve the corresponding configuration value.
   *
   * @returns The parsed and validated value of the requested configuration.
   */
  get<K extends Key>(key: K): Configuration[K];
}