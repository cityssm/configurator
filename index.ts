// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/indent, security/detect-object-injection */

type PropertyValue<V> =
  | {
      propertyFound: true
      propertyValue: V
    }
  | {
      propertyFound: false
    }

export class Configurator<D extends Record<string, unknown>> {
  readonly #defaultValues: D
  #userConfiguration: Record<string, unknown>

  /**
   * Initializes the Configurator.
   * @param {Record<string, unknown>} defaultValues - An object with the property values to use when not set in the userConfig.
   *  All keys should correspond to the value being returned.
   *  ex. { propertyOne: 5, 'propertyTwo.inner': 'value' }
   * @param {Record<string, unknown>} userConfiguration - The values that should be used when available.
   *  ex. { propertyOne: 7, propertyTwo: { inner: 'userValue' } }
   */
  constructor(
    defaultValues: D,
    userConfiguration: Record<string, unknown> = {}
  ) {
    this.#defaultValues = defaultValues
    this.setUserConfig(userConfiguration)
  }

  /**
   * Updates the user configuration.
   * @param {Record<string, unknown>} userConfiguration - The values that should be used when available.
   *  ex. { propertyOne: 7, propertyTwo: { inner: 'userValue' } }
   */
  setUserConfig(userConfiguration: Record<string, unknown>): void {
    this.#userConfiguration = userConfiguration
  }

  #getPropertyFromUserConfiguration<K extends keyof D>(
    propertyName: K
  ): PropertyValue<D[K]> {
    /*
     * If the propertyName is in the userConfig as is
     * Return the value from the userConfig
     */

    if (Object.hasOwn(this.#userConfiguration, propertyName)) {
      return {
        propertyFound: true,
        propertyValue: (this.#userConfiguration as Record<K, unknown>)[
          propertyName
        ] as D[K]
      }
    }

    let currentObject: Record<string, unknown> | unknown =
      this.#userConfiguration

    /*
     * Split the propertyName and search the userConfig
     */

    const propertyNameSplit = (propertyName as string).split('.')

    for (const propertyNamePiece of propertyNameSplit) {
      if (
        typeof currentObject === 'object' &&
        currentObject !== null &&
        Object.hasOwn(currentObject, propertyNamePiece)
      ) {
        currentObject = currentObject[propertyNamePiece]
        continue
      }

      return {
        propertyFound: false
      }
    }

    return {
      propertyFound: true,
      propertyValue: currentObject as D[K]
    }
  }

  #getPropertyFromDefaultValues<K extends keyof D>(
    propertyName: K
  ): PropertyValue<D[K]> {
    if (Object.hasOwn(this.#defaultValues, propertyName)) {
      return {
        propertyFound: true,
        propertyValue: this.#defaultValues[propertyName]
      }
    }

    return {
      propertyFound: false
    }
  }

  /**
   * Retrieves a property value, checking in the following order.
   * - User configuration
   * - Default values
   * - Fallback value
   * @param {string} propertyName - The property key.
   * @param {unknown} fallbackValue - An optional value if the property is not found in the user configuration or the default values.
   * @returns {unknown} A property value.
   */
  getConfigProperty<K extends keyof D>(
    propertyName: K | string,
    fallbackValue?: D[K]
  ): D[K] | undefined {
    const userPropertyValue =
      this.#getPropertyFromUserConfiguration(propertyName)

    if (userPropertyValue.propertyFound) {
      return userPropertyValue.propertyValue as D[K] | undefined
    }

    const defaultPropertyValue =
      this.#getPropertyFromDefaultValues(propertyName)

    if (defaultPropertyValue.propertyFound) {
      return defaultPropertyValue.propertyValue as D[K] | undefined
    }

    return fallbackValue
  }

  /**
   * Checks if the property has been set in the user configuration.
   * @param {string} propertyName - The property key.
   * @returns {boolean} Whether or not the property key is found in the user configuration.
   */
  isPropertyInUserConfig(propertyName: string): boolean {
    return this.#getPropertyFromUserConfiguration(propertyName).propertyFound
  }

  /**
   * Checks if the property has been set in the default values object.
   * @param {string} propertyName - The property key.
   * @returns {boolean} Whether or not the property key is found in the default values object.
   */
  isPropertyInDefaultValues(propertyName: string): boolean {
    return this.#getPropertyFromDefaultValues(propertyName).propertyFound
  }

  /**
   * Checks if the default value for the property has been overwritten with a different value in the user configuration.
   * @param {string} propertyName - The property key.
   * @returns {boolean} Whether or not the user configuration has a different value compared to the default.
   */
  isDefaultValueOverwritten<K extends keyof D>(propertyName: K): boolean {
    const userPropertyValue =
      this.#getPropertyFromUserConfiguration(propertyName)

    if (!userPropertyValue.propertyFound) {
      return false
    }

    const defaultPropertyValue =
      this.#getPropertyFromDefaultValues(propertyName)

    return Boolean(
      !defaultPropertyValue.propertyFound ||
        userPropertyValue.propertyValue !== defaultPropertyValue.propertyValue
    )
  }
}
