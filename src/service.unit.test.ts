import { jest } from "@jest/globals";
import {
  ConfigurationFilePermissionError,
  ConfigurationNotIngestedError,
  MissingConfigurationError,
  MissingConfigurationFileError,
  UnknownConfigurationFileError,
} from "./errors";

const configMock = jest.fn();
jest.unstable_mockModule("dotenv", () => ({
  default: {
    config: configMock,
  },
}));

const { ConfigurationService } = await import("./service");
const { ConfigurationAlreadyIngestedError } = await import("./errors");

type Configuration = {
  KEY: string;
};

describe("ConfigurationService", () => {
  const filename = ".env";
  const directory = "/directory/";
  const path = `${directory}${filename}`;

  beforeEach(() => {
    ConfigurationService["isIngested"] = false;
    ConfigurationService["instance"] = undefined;
  });

  describe("get", () => {
    describe("when the configuration has been ingested", () => {
      beforeEach(() => {
        configMock.mockReturnValue({});
        ConfigurationService.ingest(path);
      });

      it("returns the value of the requested configuration key", () => {
        process.env.KEY = "VALUE";

        const configurationService = ConfigurationService.getInstance();
        expect(configurationService.get<Configuration>("KEY")).toBe("VALUE");

        delete process.env.KEY;
      });

      it("throws a MissingConfigurationError when the requested key is not set", () => {
        const configurationService = ConfigurationService.getInstance();
        expect(() => configurationService.get<Configuration>("KEY")).toThrow(
          MissingConfigurationError
        );
      });
    });
  });

  describe("getInstance", () => {
    describe("when the configuration has been ingested", () => {
      beforeEach(() => {
        configMock.mockReturnValue({});
        ConfigurationService.ingest(path);
      });

      it("returns the singleton instance of ConfigurationService", () => {
        expect(ConfigurationService.getInstance()).toBeInstanceOf(
          ConfigurationService
        );
      });
    });

    describe("when the configuration has not been ingested", () => {
      it("throws a ConfigurationNotIngestedError", () => {
        expect(() => ConfigurationService.getInstance()).toThrow(
          ConfigurationNotIngestedError
        );
      });
    });
  });

  describe("ingest", () => {
    describe("when configuration has already been ingested", () => {
      beforeEach(() => {
        configMock.mockReturnValue({});
        ConfigurationService.ingest(path);
      });

      it("throws a ConfigurationAlreadyIngestedError if called more than once", () => {
        expect(() => ConfigurationService.ingest(path)).toThrow(
          ConfigurationAlreadyIngestedError
        );
      });
    });

    describe("when configuration has not been ingested", () => {
      it("throws an UnknownConfigurationFileError if the error lacks a code property", () => {
        configMock.mockReturnValue({ error: {} });

        expect(() => ConfigurationService.ingest(path)).toThrow(
          UnknownConfigurationFileError
        );
      });

      it("throws a MissingConfigurationFileError if the file does not exist", () => {
        configMock.mockReturnValue({ error: { code: "ENOENT" } });

        expect(() => ConfigurationService.ingest(path)).toThrow(
          MissingConfigurationFileError
        );
      });

      it("throws a ConfigurationFilePermissionError if the file is not readable", () => {
        configMock.mockReturnValue({ error: { code: "EACCES" } });

        expect(() => ConfigurationService.ingest(path)).toThrow(
          ConfigurationFilePermissionError
        );
      });

      it("throws an UnknownConfigurationFileError if the error is unknown", () => {
        configMock.mockReturnValue({ error: { code: "UNKNOWN" } });

        expect(() => ConfigurationService.ingest(path)).toThrow(
          UnknownConfigurationFileError
        );
      });

      it("successfully ingests when the file exists, is readable, and parses correctly", () => {
        configMock.mockReturnValue({});

        ConfigurationService.ingest(path);

        expect(ConfigurationService["isIngested"]).toBe(true);
      });
    });
  });
});
