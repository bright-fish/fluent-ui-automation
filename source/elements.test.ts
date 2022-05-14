import { by, conditions, elements, native } from './index';
import { exec, ChildProcess } from 'child_process';
import { IAllQueryable } from './queryable';
import { IElement } from './element';

const sleep = (delay) => {
    return new Promise((resolve, reject) => {
        const handle = setTimeout(() => {
            clearTimeout(handle);
            resolve(null);
        }, delay);
    });
}

class AutomationTestApplication {
    private applicationProcess: ChildProcess = null;

    async open() {
        this.applicationProcess = exec('start automation-test://');
        this.applicationProcess.unref();

        // await native.waitFor(conditions.exists(by.name('Automation Test')));

        while (!elements.exists(by.name('Automation Test').and.className('ApplicationFrameWindow'))) {
            await sleep(500);
        }
    }

    close() {
        this.applicationProcess.kill();
    }

    async navigateToDataGrid(): Promise<IElement> {
        const testApplicationWindow = elements.first(by.name('Automation Test').and.className('ApplicationFrameWindow'));

        const dataGridTabItem = testApplicationWindow.elements.first(by.automationId('DataGridTabItem'));

        await dataGridTabItem.click();

        return testApplicationWindow.elements.first(by.automationId('RowsPresenter'));
    }
}

describe('elements', () => {
    const automationTestApp = new AutomationTestApplication();

    beforeAll(async () => {
        await automationTestApp.open();
    });

    afterAll(() => {
        automationTestApp.close();
    });

    test('parent', () => {
        const buttonTabItem = elements.first(by.automationId('ButtonTabItem'));

        expect(buttonTabItem.parent).toBeDefined();
        expect(buttonTabItem.parent.className).toBe('ListView');
    });

    test('count with locator', () => {
        const count = elements.count(by.name('Automation Test').and.className('ApplicationFrameWindow'));

        expect(count).toBe(1);
    });

    test('exists with locator', () => {
        const exists = elements.exists(by.name('Automation Test').and.className('ApplicationFrameWindow'));

        expect(exists).toBe(true);
    });

    test('first with locator', () => {
        const firstElement = elements.first(by.name('Automation Test').and.className('ApplicationFrameWindow'));

        expect(firstElement).toBeDefined();
    });

    test('last with locator', () => {
        const lastElement = elements.last(by.name('Automation Test').and.className('ApplicationFrameWindow'));

        expect(lastElement).toBeDefined();
    });

    describe('all', () => {
        let windowQueryable: IAllQueryable = null;

        beforeAll(() => {
            windowQueryable = elements.all(by.name('Automation Test').and.className('ApplicationFrameWindow'));
        });

        test('then count', () => {
            const count = windowQueryable.count();

            expect(count).toBe(1);
        });

        test('then count with locator', () => {
            const count = windowQueryable.count(by.isControl());

            expect(count).toBe(1);
        });

        test('then exists', () => {
            const windowExists = windowQueryable.exists();

            expect(windowExists).toBe(true);
        });

        test('then exists with locator', () => {
            const windowExists = windowQueryable.exists(by.isControl());

            expect(windowExists).toBe(true);
        });

        test('then first', () => {
            const window = windowQueryable.first();

            expect(window).toBeDefined();
        });

        test('then first, then elements, then first', () => {
            const okButton = windowQueryable.first().elements.first(by.automationId('Button').and.isControl());

            expect(okButton).toBeDefined();
        })

        test('then first with locator', () => {
            const window = windowQueryable.first(by.isControl());

            expect(window).toBeDefined();
        });

        test('then last', () => {
            const window = windowQueryable.last();

            expect(window).toBeDefined();
        });

        test('then last with locator', () => {
            const window = windowQueryable.last(by.isControl());

            expect(window).toBeDefined();
        });

        describe('then skip', () => {
            let rowPresenter: IElement = null;

            beforeAll(async () => {
                rowPresenter = await automationTestApp.navigateToDataGrid();
            });

            test('then skip, then count', async () => {
                const dataGridRowCount = rowPresenter.children.skip(10).count();

                expect(dataGridRowCount).toBe(90);
            });

            test('then skip, then first', () => {
                const thirdDataGridRow = rowPresenter.children.skip(2).first();

                expect(thirdDataGridRow).toBeDefined();
                expect(thirdDataGridRow.name).toBe('row');
                expect(thirdDataGridRow.children.first().name).toBe('3');
            });

            test('then skip, then last', async () => {
                const lastElement = rowPresenter.children.skip(2).last();

                expect(lastElement).toBeDefined();
                expect(lastElement.name).toBe('row');

                await lastElement.scrollTo();

                expect(lastElement.children.first().name).toBe('100');

                await rowPresenter.children.first().scrollTo();
            });

            test('then skip, then take, then count', () => {
                const count = rowPresenter.children.skip(2).take(1).count();

                expect(count).toBe(1);
            });
            test('then skip, then take, then first', () => {
                const firstElement = rowPresenter.children.skip(2).take(1).first();

                expect(firstElement).toBeDefined();
                expect(firstElement.name).toBe('row');
                expect(firstElement.elements.first().name).toBe('3');
            });
            test('then skip, then take, then last', () => {
                const lastElement = rowPresenter.children.skip(2).take(1).last();

                expect(lastElement).toBeDefined();
                expect(lastElement.name).toBe('row');
                expect(lastElement.elements.first().name).toBe('3');
            });
            test('then skip, then take, then to array', () => {
                const elements = rowPresenter.children.skip(2).take(1).toArray();

                expect(elements).toBeDefined();
                expect(elements.length).toBe(1);
            });

            test('then skip, then to array', () => {
                const elements = rowPresenter.children.skip(2).toArray();

                expect(elements).toBeDefined();
                expect(elements.length).toBe(98);
            });

            test('then take, then count', () => {
                const elementCount = rowPresenter.children.take(2).count();

                expect(elementCount).toBe(2);
            });
            test('then take, then first', () => {
                const firstElement = rowPresenter.children.take(2).first();

                expect(firstElement).toBeDefined();
                expect(firstElement.name).toBe('row');
                expect(firstElement.elements.first().name).toBe('1');
            });

            test('then take, then last', () => {
                const lastElement = rowPresenter.children.take(2).last();

                expect(lastElement).toBeDefined();
                expect(lastElement.name).toBe('row');
                expect(lastElement.elements.first().name).toBe('2');
            });

            test('then take, then to array', () => {
                const twoElements = rowPresenter.children.take(2).toArray();

                expect(twoElements).toBeDefined();
                expect(twoElements.length).toBe(2);
            });

            test('then to array', () => {
                const allDataGridRows = rowPresenter.children.toArray();

                expect(allDataGridRows).toBeDefined();
                expect(allDataGridRows.length).toBe(100);
            });

            test('scrollTo', () => {
                const rowsPresenter = elements.first(by.automationId('RowsPresenter'));

                let lastElement = rowsPresenter.children.last();

                expect(lastElement).toBeDefined();
                expect(lastElement.isOffscreen).toBe(true);

                lastElement.scrollTo();

                // lastElement.focus();

                lastElement = rowsPresenter.children.last();

                expect(lastElement.isOffscreen).toBe(false);

                expect(lastElement.children.first().name).toBe('100');
            });
        });
    });



    // click, getText, drag, drop, scrollTo, scroll
});