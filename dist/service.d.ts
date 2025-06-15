import { AbstractConfiguration } from "./abstract";
import { Key, Configuration, Shape } from "./types";
export declare class ConfigurationService extends AbstractConfiguration {
    protected static instance?: ConfigurationService;
    protected static isIngested?: boolean;
    private constructor();
    get<S extends Shape>(key: Key<Configuration<S>>): string;
    static getInstance(): ConfigurationService;
    static ingest(path: string): void;
}
//# sourceMappingURL=service.d.ts.map