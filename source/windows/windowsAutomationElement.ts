import { AutomationElement, PatternIds, PropertyIds, TreeScopes } from "@bright-fish/node-ui-automation";
import { WindowsAutomationProvider } from ".";
import { Scopes, SetRootAction, SetScopeAction } from "../actions";
import { IAutomationProvider } from "../automationProvider";
import { BoundingBox } from "../boundingBox";
import { ControlTypes } from "../ControlTypes";
import { IElement } from "../element";
import { IQueryable, Queryable } from "../queryable";
import { translateControlTypes } from "./utilities";

export class WindowsAutomationElement implements IElement {
    constructor(private automationProvider: IAutomationProvider, public automationElement: AutomationElement) {

    }

    get name(): string {
        return this.automationElement.currentName;
    }
    get className(): string {
        return this.automationElement.currentClassName;
    }
    get isControl(): boolean {
        return this.automationElement.currentIsControlElement;
    }
    get isContent(): boolean {
        return this.automationElement.currentIsContentElement;
    }
    get isDialog(): boolean {
        const windowPattern = this.automationElement.getCurrentPattern(PatternIds.WindowPatternId);

        return windowPattern?.currentIsModal ?? false;
    }
    get processId(): number {
        return this.automationElement.currentProcessId;
    }
    get controlType(): ControlTypes {
        return translateControlTypes(this.automationElement.currentControlType);
    }

    get boundingBox(): BoundingBox {
        return this.automationElement.currentBoundingRectangle;
    }

    get automationId(): string {
        return this.automationElement.currentAutomationId;
    }

    get elements(): IQueryable {
        const queryable = new Queryable(this.automationProvider);

        queryable.addAction(new SetRootAction(this));
        queryable.addAction(new SetScopeAction(Scopes.Descendants));

        return queryable;
    }

    get children(): IQueryable {
        const queryable = new Queryable(this.automationProvider);

        queryable.addAction(new SetRootAction(this));
        queryable.addAction(new SetScopeAction(Scopes.Children));

        return queryable;
    }

    get parent(): IElement {
        const windowsAutomationProvider = this.automationProvider as WindowsAutomationProvider;

        const automation = windowsAutomationProvider.getAutomation();

        const parentElement = automation.rawViewWalker.getParentElement(this.automationElement);

        if (!parentElement) {
            return null;
        }

        return new WindowsAutomationElement(this.automationProvider, parentElement);
    }

    get isOffscreen(): boolean {
        return this.automationElement.currentIsOffscreen;
    }

    setText(text: string): Promise<void> {
        const valuePattern = this.automationElement.getCurrentPattern(PatternIds.ValuePatternId);

        if (valuePattern) {
            valuePattern.setValue(text);
        }

        return Promise.resolve();
    }

    scrollTo(): Promise<void> {
        const scrollItemPattern = this.automationElement.getCurrentPattern(PatternIds.ScrollItemPatternId);

        if (scrollItemPattern) {
            scrollItemPattern.scrollIntoView();

            return Promise.resolve();
        }

        return Promise.reject();
    }

    click(): Promise<void> {
        const invokePattern = this.automationElement.getCurrentPattern(PatternIds.InvokePatternId);

        if (invokePattern) {
            invokePattern.invoke();
            return Promise.resolve();
        }

        const selectionItemPattern = this.automationElement.getCurrentPattern(PatternIds.SelectionItemPatternId);

        if (selectionItemPattern) {
            selectionItemPattern.select();
            return Promise.resolve();
        }

        const togglePattern = this.automationElement.getCurrentPattern(PatternIds.TogglePatternId);

        if (togglePattern) {
            togglePattern.toggle();
            return Promise.resolve();
        }

        return Promise.reject();
    }

    getText(): Promise<string> {
        const valuePattern = this.automationElement.getCurrentPattern(PatternIds.ValuePatternId);

        if (valuePattern) {
            return Promise.resolve(valuePattern.currentValue);
        }

        return Promise.resolve(null);
    }

    sendKeys(value: string): Promise<void> {
        const valuePattern = this.automationElement.getCurrentPattern(PatternIds.ValuePatternId);

        valuePattern.setValue(value);

        return Promise.resolve();
    }

    clone(): IElement {
        return new WindowsAutomationElement(this.automationProvider, this.automationElement);
    }
}