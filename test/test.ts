import assert from 'node:assert'
import { describe, it } from 'node:test'

import { Configurator } from '../index.js'

await describe('configurator', async () => {
  const userConfig = {
    obj: {
      str: 'user string'
    },
    bool: true,
    'dot.separated': 77
  }

  const defaultValues = {
    'obj.str': 'default string',
    'obj.num': 5,
    bool: false,
    'dot.separated': 88
  }

  const config = new Configurator(defaultValues, userConfig)

  await it('returns a set user value string', () => {
    const value = config.getConfigProperty('obj.str')
    assert.strictEqual(value, userConfig.obj.str)
    assert.notStrictEqual(value, defaultValues['obj.str'])
    assert.ok(config.isPropertyInUserConfig('obj.str'))
    assert.ok(config.isDefaultValueOverwritten('obj.str'))
  })

  await it('returns a set user value with a dot separated key', () => {
    const value = config.getConfigProperty('dot.separated')
    assert.strictEqual(value, userConfig['dot.separated'])
    assert.notStrictEqual(value, defaultValues['dot.separated'])
  })

  await it('returns a default value number', () => {
    const value = config.getConfigProperty('obj.num')
    assert.strictEqual(value, defaultValues['obj.num'])
    assert.ok(!config.isPropertyInUserConfig('obj.num'))
    assert.ok(config.isPropertyInDefaultValues('obj.num'))
    assert.ok(!config.isDefaultValueOverwritten('obj.num'))
  })

  await it('returns a fallback value', () => {
    const value = config.getConfigProperty('unknown', 'test')
    assert.strictEqual(value, 'test')
    assert.ok(!config.isPropertyInUserConfig('unknown'))
    assert.ok(!config.isPropertyInDefaultValues('unknown'))
  })
})
