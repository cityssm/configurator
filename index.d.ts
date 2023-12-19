export declare class Configurator<T extends Record<string, unknown>> {
    #private;
    constructor(userConfig: object, defaultValues: T);
    getConfigProperty<K extends keyof T>(propertyName: K): T[K];
}
