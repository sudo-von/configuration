/**
 * Type guard to check if an unknown error object contains a `code` property.
 *
 * @param error - The value to check, typically caught from a `try/catch` or error-returning function.
 *
 * @returns `true` if `error` is a non-null object that includes a `code` property of type `string`.
 */
export const hasCode = (error) => {
    return typeof error === "object" && error !== null && "code" in error;
};
//# sourceMappingURL=helper.js.map