import { jest } from "@jest/globals";
import {
  ConfigurationFileNotReadableError,
  ConfigurationNotIngestedError,
  FailedToParseConfigurationFileError,
  MissingConfigurationError,
  MissingConfigurationFileError,
} from "./errors";

const configMock = jest.fn();
jest.unstable_mockModule("dotenv", () => ({
  default: {
    config: configMock,
  },
}));

const accessSyncMock = jest.fn();
const existsSyncMock = jest.fn();
const constantsMock = { R_OK: 1 };
jest.unstable_mockModule("fs", () => ({
  default: {
    accessSync: accessSyncMock,
    constants: constantsMock,
    existsSync: existsSyncMock,
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
        existsSyncMock.mockReturnValue(true);
        accessSyncMock.mockImplementation(() => {});
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
        existsSyncMock.mockReturnValue(true);
        accessSyncMock.mockImplementation(() => {});
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
        existsSyncMock.mockReturnValue(true);
        accessSyncMock.mockImplementation(() => {});
        configMock.mockReturnValue({ error: false });
        ConfigurationService.ingest(path);
      });

      it("throws a ConfigurationAlreadyIngestedError on subsequent calls", () => {
        expect(() => ConfigurationService.ingest(path)).toThrow(
          ConfigurationAlreadyIngestedError
        );
      });
    });

    describe("when configuration has not been ingested", () => {
      it("throws a MissingConfigurationFileError if the file does not exist", () => {
        existsSyncMock.mockReturnValue(false);

        expect(() => ConfigurationService.ingest(path)).toThrow(
          MissingConfigurationFileError
        );
      });

      it("throws a ConfigurationFileNotReadableError if the file is not readable", () => {
        existsSyncMock.mockReturnValue(true);
        accessSyncMock.mockImplementation(() => {
          throw new Error();
        });

        expect(() => ConfigurationService.ingest(path)).toThrow(
          ConfigurationFileNotReadableError
        );
      });

      it("throws a FailedToParseConfigurationFileError if parsing the file fails", () => {
        existsSyncMock.mockReturnValue(true);
        accessSyncMock.mockImplementation(() => {});
        configMock.mockReturnValue({ error: new Error() });

        expect(() => ConfigurationService.ingest(path)).toThrow(
          FailedToParseConfigurationFileError
        );
      });

      it("successfully ingests when the file exists, is readable, and parses correctly", () => {
        existsSyncMock.mockReturnValue(true);
        accessSyncMock.mockImplementation(() => {});
        configMock.mockReturnValue({});

        ConfigurationService.ingest(path);

        expect(ConfigurationService["isIngested"]).toBe(true);
      });
    });
  });
});
