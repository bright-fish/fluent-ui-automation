import { AutomationElement, PatternIds, PropertyIds, TreeScopes, WindowVisualStates } from "@bright-fish/node-ui-automation";
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

    scrollTo(): Promise<void> {
        const scrollItemPattern = this.automationElement.getCurrentPattern(PatternIds.ScrollItemPatternId);

        if (!scrollItemPattern) {
            return Promise.reject();
        }

        scrollItemPattern.scrollIntoView();

        return Promise.reject();
    }

    invoke() {
        const invokePattern = this.automationElement.getCurrentPattern(PatternIds.InvokePatternId);

        if (!invokePattern) {
            return Promise.reject();
        }

        invokePattern.invoke();

        return Promise.resolve();
    }

    select() {
        const selectionItemPattern = this.automationElement.getCurrentPattern(PatternIds.SelectionItemPatternId);

        if (!selectionItemPattern) {

            return Promise.resolve();
        }

        selectionItemPattern.select();

        return Promise.resolve();
    }

    toggle() {
        const togglePattern = this.automationElement.getCurrentPattern(PatternIds.TogglePatternId);

        if (!togglePattern) {
            return Promise.reject();
        }

        togglePattern.toggle();

        return Promise.resolve();
    }

    expand() {
        const expandCollapsePattern = this.automationElement.getCurrentPattern(PatternIds.ExpandCollapsePatternId);

        if (!expandCollapsePattern) {
            return Promise.reject();
        }

        expandCollapsePattern.expand();
    }

    collapse() {
        const expandCollapsePattern = this.automationElement.getCurrentPattern(PatternIds.ExpandCollapsePatternId);

        if (!expandCollapsePattern) {
            return Promise.reject();
        }

        expandCollapsePattern.collapse();
    }

    close() {
        const windowPattern = this.automationElement.getCurrentPattern(PatternIds.WindowPatternId);

        if (!windowPattern) {
            return Promise.reject();
        }

        windowPattern.close();

        return Promise.resolve();
    }

    maximize() {
        const windowPattern = this.automationElement.getCurrentPattern(PatternIds.WindowPatternId);

        if (!windowPattern) {
            return Promise.reject();
        }

        if(!windowPattern.currentCanMaximize) { 
            return Promise.reject();
        }

        windowPattern.setWindowVisualState(WindowVisualStates.Maximized);

        return Promise.resolve();
    }

    minimize() {
        const windowPattern = this.automationElement.getCurrentPattern(PatternIds.WindowPatternId);

        if (!windowPattern) {
            return Promise.reject();
        }

        if(!windowPattern.currentCanMinimize){
            return Promise.reject();
        }

        windowPattern.setWindowVisualState(WindowVisualStates.Minimized);

        return Promise.resolve();
    }

    restore() {
        const windowPattern = this.automationElement.getCurrentPattern(PatternIds.WindowPatternId);

        if (!windowPattern) {
            return Promise.reject();
        }

        windowPattern.setWindowVisualState(WindowVisualStates.Normal);

        return Promise.resolve();
    }

    realize() {
        const virtualizedItemPattern = this.automationElement.getCurrentPattern(PatternIds.VirtualizedItemPatternId);

        if (!virtualizedItemPattern) {
            return Promise.reject();
        }

        virtualizedItemPattern.realize();

        return Promise.resolve();
    }

    getValue() {
        const valuePattern = this.automationElement.getCurrentPattern(PatternIds.ValuePatternId);

        if (!valuePattern) {
            return Promise.resolve(null);
        }

        return Promise.resolve(valuePattern.currentValue);
    }

    setValue(value: string) {
        const valuePattern = this.automationElement.getCurrentPattern(PatternIds.ValuePatternId);

        if (!valuePattern) {
            return Promise.reject();
        }

        valuePattern.setValue(value);

        return Promise.resolve();
    }

    focus(): Promise<void> {
        this.automationElement.setFocus();
        
        return Promise.resolve();
    }

    clone(): IElement {
        return new WindowsAutomationElement(this.automationProvider, this.automationElement);
    }
}
