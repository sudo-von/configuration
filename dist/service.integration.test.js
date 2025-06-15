import { ConfigurationFilePermissionError, ConfigurationNotIngestedError, MissingConfigurationError, MissingConfigurationFileError, } from "./errors";
import { chmodSync } from "fs";
import { join } from "path";
const { ConfigurationService } = await import("./service");
const { ConfigurationAlreadyIngestedError } = await import("./errors");
describe("ConfigurationService", () => {
    const filename = ".env.sample";
    const directory = process.cwd();
    const path = join(directory, filename);
    beforeEach(() => {
        ConfigurationService["isIngested"] = false;
        ConfigurationService["instance"] = undefined;
    });
    describe("get", () => {
        describe("when the configuration has been ingested", () => {
            beforeEach(() => {
                ConfigurationService.ingest(path);
            });
            it("returns the value of the requested configuration key", () => {
                const configurationService = ConfigurationService.getInstance();
                expect(configurationService.get("KEY")).toBe("VALUE");
            });
            it("throws a MissingConfigurationError when the requested key is not set", () => {
                const configurationService = ConfigurationService.getInstance();
                expect(() => configurationService.get("NONEXISTINGKEY")).toThrow(MissingConfigurationError);
            });
        });
    });
    describe("getInstance", () => {
        describe("when the configuration has been ingested", () => {
            beforeEach(() => {
                ConfigurationService.ingest(path);
            });
            it("returns the singleton instance of ConfigurationService", () => {
                expect(ConfigurationService.getInstance()).toBeInstanceOf(ConfigurationService);
            });
        });
        describe("when the configuration has not been ingested", () => {
            it("throws a ConfigurationNotIngestedError", () => {
                expect(() => ConfigurationService.getInstance()).toThrow(ConfigurationNotIngestedError);
            });
        });
    });
    describe("ingest", () => {
        describe("when configuration has already been ingested", () => {
            beforeEach(() => {
                ConfigurationService.ingest(path);
            });
            it("throws a ConfigurationAlreadyIngestedError if called more than once", () => {
                expect(() => ConfigurationService.ingest(path)).toThrow(ConfigurationAlreadyIngestedError);
            });
        });
        describe("when configuration has not been ingested", () => {
            it("throws a MissingConfigurationFileError if the file does not exist", () => {
                const nonexistentPath = "nonexistent-path";
                expect(() => ConfigurationService.ingest(nonexistentPath)).toThrow(MissingConfigurationFileError);
            });
            it("throws a ConfigurationFilePermissionError if the file is not readable", () => {
                const NO_PERMISSIONS = 0o000;
                const READ_PERMISSIONS = 0o444;
                chmodSync(path, NO_PERMISSIONS);
                expect(() => ConfigurationService.ingest(path)).toThrow(ConfigurationFilePermissionError);
                chmodSync(path, READ_PERMISSIONS);
            });
            it("successfully ingests when the file exists, is readable, and parses correctly", () => {
                ConfigurationService.ingest(path);
                expect(ConfigurationService["isIngested"]).toBe(true);
            });
        });
    });
});
//# sourceMappingURL=service.integration.test.js.map