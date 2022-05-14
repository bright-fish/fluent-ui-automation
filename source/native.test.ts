import { by, conditions, native } from ".";

describe('native', () => {
    test('waitFor', async () => {
        expect.assertions(1);

        const promise = native.waitFor(conditions.exists(by.name('About Windows')));

        // start process.  
        expect(promise).resolves.toReturn();
    })
});