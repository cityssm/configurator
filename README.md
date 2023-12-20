# configurator

Handles Node application configuration files. Includes default values and helper functions.

## Installation

```sh
npm install @cityssm/configurator
```

## Usage

```javascript
import { Configurator } from '@cityssm/configurator'

import { userConfig } from 'data/config.js'

/*
 * userConfig = {
 *   application: {
 *     httpPort: 9090
 *   },
 *   userNames: ['administrator']
 * }
 */

const defaultValues = {
  'application.httpPort': 8080,
  'application.applicationName': 'Super Awesome Application',
  userNames: []
}

const config = new Configurator(defaultValues, userConfig)

console.log(config.getConfigProperty('application.httpPort'))
// => 9090

console.log(config.getConfigProperty('application.applicationName'))
// => "Super Awesome Application"
```
