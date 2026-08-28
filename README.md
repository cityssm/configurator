# configurator

[![npm (scoped)](https://img.shields.io/npm/v/%40cityssm/configurator)](https://www.npmjs.com/package/@cityssm/configurator)
[![DeepSource](https://app.deepsource.com/gh/cityssm/configurator.svg/?label=active+issues&show_trend=true&token=Nw1eDARbmSM0dil3bFVqWccm)](https://app.deepsource.com/gh/cityssm/configurator/)
[![Coverage Testing](https://github.com/cityssm/configurator/actions/workflows/coverage.yml/badge.svg)](https://github.com/cityssm/configurator/actions/workflows/coverage.yml)
[![codecov](https://codecov.io/gh/cityssm/configurator/graph/badge.svg?token=LMJ4EIKBJC)](https://codecov.io/gh/cityssm/configurator)

Handles Node application configuration files. Includes default values and
helper functions.

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
