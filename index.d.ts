export declare class Configurator<D extends Record<string, unknown>> {
    #private;
    constructor(defaultValues: D, userConfiguration?: Record<string, unknown>);
    setUserConfig(userConfiguration: Record<string, unknown>): void;
    getConfigProperty<K extends keyof D>(propertyName: K | string, fallbackValue?: D[K]): D[K] | undefined;
    isPropertyInUserConfig(propertyName: string): boolean;
    isPropertyInDefaultValues(propertyName: string): boolean;
    isDefaultValueOverwritten<K extends keyof D>(propertyName: K): boolean;
}
