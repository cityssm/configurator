export class Configurator {
    #defaultValues;
    #userConfiguration;
    constructor(defaultValues, userConfiguration = {}) {
        this.#defaultValues = defaultValues;
        this.setUserConfig(userConfiguration);
    }
    setUserConfig(userConfiguration) {
        this.#userConfiguration = userConfiguration;
    }
    #getPropertyFromUserConfiguration(propertyName) {
        if (Object.hasOwn(this.#userConfiguration, propertyName)) {
            return {
                propertyFound: true,
                propertyValue: this.#userConfiguration[propertyName]
            };
        }
        let currentObject = this.#userConfiguration;
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
    isPropertyInUserConfig(propertyName) {
        return this.#getPropertyFromUserConfiguration(propertyName).propertyFound;
    }
    isPropertyInDefaultValues(propertyName) {
        return this.#getPropertyFromDefaultValues(propertyName).propertyFound;
    }
    isDefaultValueOverwritten(propertyName) {
        const userPropertyValue = this.#getPropertyFromUserConfiguration(propertyName);
        if (!userPropertyValue.propertyFound) {
            return false;
        }
        const defaultPropertyValue = this.#getPropertyFromDefaultValues(propertyName);
        return !!(!defaultPropertyValue.propertyFound ||
            userPropertyValue.propertyValue !== defaultPropertyValue.propertyValue);
    }
}
