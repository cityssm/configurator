import assert from 'node:assert';
import { Configurator } from '../index.js';
describe('configurator', () => {
    const userConfig = {
        obj: {
            str: 'user string'
        },
        bool: true
    };
    const defaultValues = {
        'obj.str': 'default string',
        'obj.num': 5,
        bool: false
    };
    const config = new Configurator(userConfig, defaultValues);
    it('returns a set user value string', () => {
        const value = config.getConfigProperty('obj.str');
        assert.strictEqual(value, userConfig.obj.str);
        assert.notStrictEqual(value, defaultValues['obj.str']);
    });
    it('returns a default value number', () => {
        const value = config.getConfigProperty('obj.num');
        assert.strictEqual(value, defaultValues['obj.num']);
    });
});
