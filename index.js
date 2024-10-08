// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair
/* eslint-disable security/detect-object-injection */
export class Configurator {
    #defaultValues;
    #userConfiguration;
    /**
     * Initializes the Configurator.
     * @param defaultValues - An object with the property values to use when not set in the userConfig.
     *  All keys should correspond to the value being returned.
     *  ex. { propertyOne: 5, 'propertyTwo.inner': 'value' }
     * @param userConfiguration - The values that should be used when available.
     *  ex. { propertyOne: 7, propertyTwo: { inner: 'userValue' } }
     */
    constructor(defaultValues, userConfiguration = {}) {
        this.#defaultValues = defaultValues;
        this.setUserConfig(userConfiguration);
    }
    /**
     * Updates the user configuration.
     * @param userConfiguration - The values that should be used when available.
     *  ex. { propertyOne: 7, propertyTwo: { inner: 'userValue' } }
     */
    setUserConfig(userConfiguration) {
        this.#userConfiguration = userConfiguration;
    }
    #getPropertyFromUserConfiguration(propertyName) {
        /*
         * If the propertyName is in the userConfig as is
         * Return the value from the userConfig
         */
        if (Object.hasOwn(this.#userConfiguration, propertyName)) {
            return {
                propertyFound: true,
                propertyValue: this.#userConfiguration[propertyName]
            };
        }
        let currentObject = this.#userConfiguration;
        /*
         * Split the propertyName and search the userConfig
         */
        const propertyNameSplit = propertyName.split('.');
        for (const propertyNamePiece of propertyNameSplit) {
            if (typeof currentObject === 'object' &&
                currentObject !== null &&
                Object.hasOwn(currentObject, propertyNamePiece)) {
                currentObject = currentObject[propertyNamePiece];
                continue;
            }
            return {
                propertyFound: false
            };
        }
        return {
            propertyFound: true,
            propertyValue: currentObject
        };
    }
    #getPropertyFromDefaultValues(propertyName) {
        if (Object.hasOwn(this.#defaultValues, propertyName)) {
            return {
                propertyFound: true,
                propertyValue: this.#defaultValues[propertyName]
            };
        }
        return {
            propertyFound: false
        };
    }
    /**
     * Retrieves a property value, checking in the following order.
     * - User configuration
     * - Default values
     * - Fallback value
     * @param propertyName - The property key.
     * @param fallbackValue - An optional value if the property is not found in the user configuration or the default values.
     * @returns A property value.
     */
    getConfigProperty(propertyName, fallbackValue) {
        const userPropertyValue = this.#getPropertyFromUserConfiguration(propertyName);
        if (userPropertyValue.propertyFound) {
            return userPropertyValue.propertyValue;
        }
        const defaultPropertyValue = this.#getPropertyFromDefaultValues(propertyName);
        if (defaultPropertyValue.propertyFound) {
            return defaultPropertyValue.propertyValue;
        }
        return fallbackValue;
    }
    /**
     * Checks if the property has been set in the user configuration.
     * @param propertyName - The property key.
     * @returns `true` if the property key is found in the user configuration.
     */
    isPropertyInUserConfig(propertyName) {
        return this.#getPropertyFromUserConfiguration(propertyName).propertyFound;
    }
    /**
     * Checks if the property has been set in the default values object.
     * @param propertyName - The property key.
     * @returns `true` if the property key is found in the default values object.
     */
    isPropertyInDefaultValues(propertyName) {
        return this.#getPropertyFromDefaultValues(propertyName).propertyFound;
    }
    /**
     * Checks if the default value for the property has been overwritten with a different value in the user configuration.
     * @param propertyName - The property key.
     * @returns `true` if the user configuration has a different value compared to the default.
     */
    isDefaultValueOverwritten(propertyName) {
        const userPropertyValue = this.#getPropertyFromUserConfiguration(propertyName);
        if (!userPropertyValue.propertyFound) {
            return false;
        }
        const defaultPropertyValue = this.#getPropertyFromDefaultValues(propertyName);
        return Boolean(!defaultPropertyValue.propertyFound ||
            userPropertyValue.propertyValue !== defaultPropertyValue.propertyValue);
    }
}
