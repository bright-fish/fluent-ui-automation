import { elements, by, conditions, native } from '.';
import { exec } from 'child_process';

describe('example', () => {

    test('test', async () => {
        const automationTestWindow =  elements.first(by.name('Automation Test').and.className('ApplicationFrameWindow'));

        console.log(automationTestWindow.boundingBox);
        
        console.log('Im here for the breakpoints.');
    });
});

 // exec('start automation-test://');

        // const test = by.name('Automation Test').and.className('test').or.isContent().or.isControl().toString();

        // let automationTestWindow = elements.first(by.name('Automation Test').and.className('ApplicationFrameWindow'));

        // automationTestWindow.elements.first(by.automationId('DataGridItems'));

        // brandon, steve, dilling, matt, arron murrell

        // potential for better developer experience.  
        // focus on hidden line items.  
        // repeat delayed execution concept.  
        // display waitFor as more performant.  


        // Fluent apis provide a nice developer experience.  
        // What is a fluent api?  
        // A fluent api is where function calls return itself so that functions can be chained together.  
        // Here is an example of a fluent api.  
        // config.setValue('Key', 'Value').addProvider(provider).setValue('Key', 'Value')
        // I have developed a fluent wrapper for the ui automation framework. 
        // How this helps automation.  Selectors can be quickly chained together to form concise descriptions of what your looking for.  
        // For example:
        // by.name('Automation Test').and.className('ApplicationFrameWindow') 
        // this is more readible that 
        // {
        //     name: 'Automation Test',
        //     className: "ApplicationFrameWindow"
        // }

        // This meeting is to demo the library.  

        // console.log(automationTestWindow);

        // native.waitFor(conditions.exists(by.name('Automation Test').and.className('ApplicationFrameWindow')));

        // automationTestWindow = elements.first(by.name('Automation Test').and.className('ApplicationFrameWindow'));

        // native element selection and the Elements class.
        // const dataGridRowsPresenter = automationTestWindow.elements.first(by.className('DataGridRowsPresenter'));

        // waiting for native elements with the Conditions class and the waitFor function.
        // native.waitFor(conditions.exists())

// const automationTestWindow = elements.first(by.name('Automation Test').and.className('ApplicationFrameWindow'));

// process.kill(automationTestWindow.processId);


// const items = elements.all(by.name('DataGridItems'));

// const first = items.first();

// await native.waitFor(conditions.exists(by.name('Automation Test').and.className('ApplicationFrameWindow')));

// const automationTestWindow = elements.first(by.name('Automation Test').and.className('ApplicationFrameWindow'));

// // await native.waitFor(conditions.exists(by.automationId('GivenNameTextBox')));

// const giveNameTextBox = automationTestWindow.elements.first(by.automationId('GivenNameTextBox'));

// await giveNameTextBox.setText('Chris');

// const familyNameTextBox = automationTestWindow.elements.first(by.automationId('FamilyNameTextBox'));

// await familyNameTextBox.setText('Nimmons');

// await giveNameTextBox.setText('Luna');

// const value = await giveNameTextBox.getText();

// expect(value).toBe('Luna');

// await native.waitFor(conditions.exists(by.automationId('DataGridTabItem')));

// const dataGridTabItem = automationTestWindow.elements.first(by.automationId('DataGridTabItem'));

// await dataGridTabItem.click();

// const presenter = automationTestWindow.elements.first(by.className('DataGridRowsPresenter'));

// const last = presenter.children.last();

// await last.click();