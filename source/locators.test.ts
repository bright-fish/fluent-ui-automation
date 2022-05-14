import { by } from "."

describe('locators', () => {
    test('and locators', () => {
        const value = by.name('About Windows').and.isControl().toString();

        expect(value).toBe('{ { name: "About Windows" } && { isControl } }');
    });

    test('or locator', () => {
        const locator = by.name('About Windows').or.name('Windows Version');

        expect(locator.toString()).toBe('{ { name: "About Windows" } || { name: "Windows Version" } }');
    });

    test('switch between "and" and "or"', () => {
        const locator = by.name('About Windows').and.automationId('1234').or.name('Windows Version');

        expect(locator.toString()).toBe('{ { { name: "About Windows" } && { automationId: "1234" } } || { name: "Windows Version" } }')
    });

    test('combine locators', () => {
        const windowLocator = by.name('About Windows').and.automationId('1234');

        expect(windowLocator.toString()).toBe('{ { name: "About Windows" } && { automationId: "1234" } }')

        const contentOrControlLocator = by.isControl().or.isContent();

        expect(contentOrControlLocator.toString()).toBe('{ { isControl } || { isContent } }');

        const combined = windowLocator.and.combine(contentOrControlLocator);

        expect(combined.toString()).toBe('{ { name: "About Windows" } && { automationId: "1234" } && { { isControl } || { isContent } } }');

        const complicatedLocator = by.processId(1234).and.combine(windowLocator).and.combine(contentOrControlLocator).toString();

        expect(complicatedLocator.toString()).toBe('{ { processId: 1234 } && { { name: "About Windows" } && { automationId: "1234" } } && { { isControl } || { isContent } } }');
    });

    test.skip('combine prevents circular references', () => {

    });

    test('locators are immutable', () => {
        const one = by.name('About Windows');

        one.or.name('Windows Version');

        expect(one.or.name('Windows Version')).not.toEqual(one);
        expect(one.or.automationId('1234')).not.toBe(one);
        expect(one.or.isContent()).not.toBe(one);
        expect(one.or.isControl()).not.toBe(one);


        expect(one.and.name('Windows Version')).not.toEqual(one);
        expect(one.and.automationId('1234')).not.toBe(one);
        expect(one.and.isContent()).not.toBe(one);
        expect(one.and.isControl()).not.toBe(one);
    });

    test('locators should translate to ui automation library format', () => {
        // how do we do this with a operating system provider that sits between?  
        
    });
});