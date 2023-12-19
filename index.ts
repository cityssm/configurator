export class Configurator<T extends Record<string, unknown>> {
  readonly #userConfig: object
  readonly #defaultValues: T

  constructor(userConfig: object, defaultValues: T) {
    this.#userConfig = userConfig
    this.#defaultValues = defaultValues
  }

  getConfigProperty<K extends keyof T>(propertyName: K): T[K] {
    const propertyNameSplit = (propertyName as string).split('.')

    let currentObject: unknown = this.#userConfig

    for (const propertyNamePiece of propertyNameSplit) {
      if (typeof currentObject === 'object' && currentObject !== null && Object.hasOwn(currentObject, propertyNamePiece)) {
        currentObject = currentObject[propertyNamePiece]
        continue
      }

      return this.#defaultValues[propertyName]
    }

    return currentObject as T[K]
  }
}
