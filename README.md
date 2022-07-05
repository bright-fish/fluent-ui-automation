# Fluent UI Automation Library (Beta)
## For use only on the Windows Operating System.

This library is a fluent api that wraps around the UI Automation Framework.  

You can quickly access UI Automation elements by using the elements instance made available by the package.  

## Installation

`npm install @bright-fish/fluent-ui-automation`

Here is a quick example of how to click the Ok button of the About Windows application.  

``` javascript 
const { elements, by } = require('@bright-fish/fluent-ui-automation');

const winverWindow = elements.first(by.name('About Windows'));

const okButton = winverWindow.children.first(by.name('OK'));

okButton.click();

```
