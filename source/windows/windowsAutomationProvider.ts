import { Automation, AutomationElement, ElementModes, TreeScopes } from "@bright-fish/node-ui-automation";
import { IAction, SetRootAction, AllAction, SkipAction, TakeAction, FirstAction, LastAction, CountAction, ExistsAction, ToArrayAction, SetScopeAction, Scopes, AtAction } from "../actions";
import { IAutomationProvider } from "../automationProvider";
import { WindowsAutomationElement } from "./windowsAutomationElement";
import { translateLocatorToCondition, translateScopeToTreeScope } from './utilities';
import { ICombinable } from "../locators";
import { IElement } from "../element";

export class WindowsAutomationProvider implements IAutomationProvider {

    constructor(private automation: Automation) {
    }

    execute(actions: IAction[]) {
        let rootElement = this.automation.getRootElement();

        let skip: number = null;
        let take: number = null;
        let locator: ICombinable = null;
        let scope: Scopes = null;

        for (const action of actions) {
            if (action instanceof SetScopeAction) {
                scope = action.scope;
            } else if (action instanceof SetRootAction) {
                if (!(action.element instanceof WindowsAutomationElement)) {
                    throw new Error('Not implemented');
                }

                rootElement = action.element.automationElement;
            } else if (action instanceof AllAction) {
                locator = action.locator;
            } else if (action instanceof SkipAction) {
                skip = action.amount;
            } else if (action instanceof TakeAction) {
                take = action.amount;
            } else if (action instanceof AtAction) {

                let treeScope = TreeScopes.Descendants;

                if (scope) {
                    treeScope = translateScopeToTreeScope(scope);
                }

                const automationCondition = translateLocatorToCondition(this.automation, locator);

                const cacheRequest = this.automation.createCacheRequest();
                cacheRequest.treeScope = TreeScopes.Element;
                cacheRequest.treeFilter = this.automation.createTrueCondition();

                let automationElements = rootElement.findAllBuildCache(treeScope, automationCondition, cacheRequest);

                if (skip) {
                    automationElements = automationElements.slice(skip);
                }

                if (take) {
                    automationElements = automationElements.slice(0, take);
                }

                const automationElement = automationElements.at(action.index);

                if (!automationElement) {
                    return null;
                }

                return new WindowsAutomationElement(this, automationElement);
                
            } else if (action instanceof FirstAction) {
                if (action.locator) {
                    if (locator) {
                        locator = locator.and.combine(action.locator);
                    } else {
                        locator = action.locator;
                    }
                }

                let treeScope = TreeScopes.Descendants;

                if (scope) {
                    treeScope = translateScopeToTreeScope(scope);
                }

                const automationCondition = translateLocatorToCondition(this.automation, locator);

                const cacheRequest = this.automation.createCacheRequest();
                cacheRequest.treeScope = TreeScopes.Element;
                cacheRequest.treeFilter = this.automation.createTrueCondition();

                let automationElement: AutomationElement = null;

                if (skip) {
                    let automationElements = rootElement.findAllBuildCache(treeScope, automationCondition, cacheRequest);

                    automationElements = automationElements.slice(skip);

                    automationElement = automationElements.shift();
                } else {
                    automationElement = rootElement.findFirstBuildCache(treeScope, automationCondition, cacheRequest);
                }

                if (!automationElement) {
                    return null;
                }

                return new WindowsAutomationElement(this, automationElement);
            } else if (action instanceof LastAction) {
                if (action.locator) {
                    if (locator) {
                        locator = locator.and.combine(action.locator);
                    } else {
                        locator = action.locator;
                    }
                }

                let treeScope = TreeScopes.Descendants;

                if (scope) {
                    treeScope = translateScopeToTreeScope(scope);
                }

                const automationCondition = translateLocatorToCondition(this.automation, locator);

                const cacheRequest = this.automation.createCacheRequest();
                cacheRequest.treeScope = TreeScopes.Element;
                cacheRequest.treeFilter = this.automation.createTrueCondition();

                let automationElements = rootElement.findAllBuildCache(treeScope, automationCondition, cacheRequest);

                if (skip) {
                    automationElements = automationElements.slice(skip);
                }

                if (take) {
                    automationElements = automationElements.slice(0, take);
                }

                const automationElement = automationElements.pop();

                if (!automationElement) {
                    return null;
                }

                return new WindowsAutomationElement(this, automationElement);
            } else if (action instanceof CountAction) {
                if (action.locator) {
                    if (locator) {
                        locator = locator.and.combine(action.locator);
                    } else {
                        locator = action.locator;
                    }
                }

                let treeScope = TreeScopes.Descendants;

                if (scope) {
                    treeScope = translateScopeToTreeScope(scope);
                }

                const automationCondition = translateLocatorToCondition(this.automation, locator);

                const cacheRequest = this.automation.createCacheRequest();
                cacheRequest.treeScope = TreeScopes.Element;
                cacheRequest.treeFilter = this.automation.createTrueCondition();

                let automationElements = rootElement.findAllBuildCache(treeScope, automationCondition, cacheRequest);

                if (skip) {
                    automationElements = automationElements.slice(skip);
                }

                if (take) {
                    automationElements = automationElements.slice(0, take);
                }

                return automationElements.length;
            } else if (action instanceof ExistsAction) {
                if (action.locator) {
                    if (locator) {
                        locator = locator.and.combine(action.locator);
                    } else {
                        locator = action.locator;
                    }
                }

                let treeScope = TreeScopes.Descendants;

                if (scope) {
                    treeScope = translateScopeToTreeScope(scope);
                }

                const automationCondition = translateLocatorToCondition(this.automation, locator);

                const cacheRequest = this.automation.createCacheRequest();
                cacheRequest.treeScope = TreeScopes.Element;
                cacheRequest.treeFilter = this.automation.createTrueCondition();

                let automationElements = rootElement.findAllBuildCache(treeScope, automationCondition, cacheRequest);

                if (skip) {
                    automationElements = automationElements.slice(skip);
                }

                if (take) {
                    automationElements = automationElements.slice(0, take);
                }

                return automationElements.length > 0;
            } else if (action instanceof ToArrayAction) {
                let treeScope = TreeScopes.Descendants;

                if (scope) {
                    treeScope = translateScopeToTreeScope(scope);
                }

                const automationCondition = translateLocatorToCondition(this.automation, locator);

                const cacheRequest = this.automation.createCacheRequest();
                cacheRequest.treeScope = TreeScopes.Element;
                cacheRequest.treeFilter = this.automation.createTrueCondition();

                let automationElements = rootElement.findAllBuildCache(treeScope, automationCondition, cacheRequest);

                if (skip) {
                    automationElements = automationElements.slice(skip);
                }

                if (take) {
                    automationElements = automationElements.slice(0, take);
                }

                const output = [];
                for (const automationElement of automationElements) {
                    output.push(new WindowsAutomationElement(this, automationElement));
                }

                return output;
            } else {
                throw new Error(`Action '${typeof action}' not supported.`);
            }
        }
    }

    public getAutomation(): Automation {
        return this.automation;
    }
}