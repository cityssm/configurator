export declare class Configurator<D extends Record<string, unknown>> {
    #private;
    /**
     * Initializes the Configurator.
     * @param defaultValues - An object with the property values to use when not set in the userConfig.
     *  All keys should correspond to the value being returned.
     *  ex. { propertyOne: 5, 'propertyTwo.inner': 'value' }
     * @param userConfiguration - The values that should be used when available.
     *  ex. { propertyOne: 7, propertyTwo: { inner: 'userValue' } }
     */
    constructor(defaultValues: D, userConfiguration?: Record<string, unknown>);
    /**
     * Updates the user configuration.
     * @param userConfiguration - The values that should be used when available.
     *  ex. { propertyOne: 7, propertyTwo: { inner: 'userValue' } }
     */
    setUserConfig(userConfiguration: Record<string, unknown>): void;
    /**
     * Retrieves a property value, checking in the following order.
     * - User configuration
     * - Default values
     * - Fallback value
     * @param propertyName - The property key.
     * @param fallbackValue - An optional value if the property is not found in the user configuration or the default values.
     * @returns A property value.
     */
    getConfigProperty<K extends keyof D>(propertyName: K | string, fallbackValue?: D[K]): D[K] | undefined;
    /**
     * Checks if the property has been set in the user configuration.
     * @param propertyName - The property key.
     * @returns `true` if the property key is found in the user configuration.
     */
    isPropertyInUserConfig(propertyName: string): boolean;
    /**
     * Checks if the property has been set in the default values object.
     * @param propertyName - The property key.
     * @returns `true` if the property key is found in the default values object.
     */
    isPropertyInDefaultValues(propertyName: string): boolean;
    /**
     * Checks if the default value for the property has been overwritten with a different value in the user configuration.
     * @param propertyName - The property key.
     * @returns `true` if the user configuration has a different value compared to the default.
     */
    isDefaultValueOverwritten(propertyName: keyof D): boolean;
}
