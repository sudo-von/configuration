/**
 * Configuration is a type alias for a specific shape of environment variables.
 */
export type Configuration<S extends Shape = {}> = S;
/**
 * Represents a valid configuration key from a given Configuration shape.
 */
export type Key<C extends Configuration> = keyof C & string;
/**
 * Shape defines the expected structure for environment variables.
 * Each key should correspond to a string value.
 */
export type Shape = Record<string, string>;
//# sourceMappingURL=types.d.ts.map