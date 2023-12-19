export class Configurator {
    #userConfig;
    #defaultValues;
    constructor(userConfig, defaultValues) {
        this.#userConfig = userConfig;
        this.#defaultValues = defaultValues;
    }
    getConfigProperty(propertyName) {
        const propertyNameSplit = propertyName.split('.');
        let currentObject = this.#userConfig;
        for (const propertyNamePiece of propertyNameSplit) {
            if (typeof currentObject === 'object' && currentObject !== null && Object.hasOwn(currentObject, propertyNamePiece)) {
                currentObject = currentObject[propertyNamePiece];
                continue;
            }
            return this.#defaultValues[propertyName];
        }
        return currentObject;
    }
}
