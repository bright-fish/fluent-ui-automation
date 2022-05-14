import { Automation, AutomationCondition, ControlTypeIds, PropertyIds } from "@bright-fish/node-ui-automation";
import { OperationCanceledException } from "typescript";
import { IAutomationProvider } from "./automationProvider";
import { ICloneable } from "./cloneable";
import { ControlTypes } from "./controlTypes";


export interface ICombinable extends ICloneable<ICombinable> {
    get and(): ILocatable;
    get or(): ILocatable;
}

export interface ILocatable {
    name(value: string): ICombinable;
    className(value: string): ICombinable;
    automationId(value: string): ICombinable;
    isControl(): ICombinable;
    isContent(): ICombinable;
    combine(locator: ICombinable): ICombinable;
}

class Locator implements ICombinable {
    constructor() {

    }

    get and(): IAndLocator {
        const andLocator = new AndLocator();

        andLocator.addChild(this);

        return andLocator;
    }
    get or(): IOrLocator {
        const orLocator = new OrLocator();

        orLocator.addChild(this);

        return orLocator;
    }

    clone(): ICombinable {
        throw new Error('Not implemented.');
    }
}

class ClassNameLocator extends Locator {
    constructor(public value: string) {
        super();
    }

    toString() {
        return `{ className: "${this.value}" }`;
    }

    clone() {
        return new ClassNameLocator(this.value);
    }
}

class NameLocator extends Locator {
    constructor(public value: string) {
        super();
    }

    toString() {
        return `{ name: "${this.value}" }`;
    }

    public clone(): ICombinable {
        return new NameLocator(this.value);
    }
}

class IsControlLocator extends Locator {
    constructor() {
        super();
    }

    public toString() {
        return '{ isControl }';
    }


    public clone(): ICombinable {
        return new IsControlLocator();
    }
}

class IsContentLocator extends Locator {
    constructor() {
        super();
    }

    public toString() {
        return '{ isContent }';
    }

    public clone(): ICombinable {
        return new IsContentLocator();
    }
}

class AutomationIdLocator extends Locator {
    constructor(public value: string) {
        super();
    }

    public toString() {
        return `{ automationId: "${this.value}" }`;
    }

    public clone(): ICombinable {
        return new AutomationIdLocator(this.value);
    }
}

class ProcessIdLocator extends Locator {
    constructor(public value: number) {
        super();
    }

    public toString() {
        return `{ processId: ${this.value} }`;
    }

    public clone(): ICombinable {
        return new ProcessIdLocator(this.value);
    }
}

class ControlTypeLocator extends Locator {
    constructor(public value: ControlTypes) {
        super();
    }

    public toString() {
        return `{ controlType: "${this.value}" }`;
    }

    public clone(): ICombinable {
        return new ControlTypeLocator(this.value);
    }
}

class RuntimeIdLocator extends Locator {
    constructor(public value: string) {
        super();
    }


    toString() {
        return `{ runtimeId: "${this.value}" }`;
    }

    public clone(): ICombinable {
        return new RuntimeIdLocator(this.value);
    }
}


interface IAndLocator extends ILocatable, ICombinable {

}

class AndLocator implements IAndLocator, ICloneable<AndLocator> {
    private children: ICombinable[];

    constructor(locator?: ICombinable) {
        this.children = [];
    }

    get and(): ILocatable {
        return this;
    }

    get or(): ILocatable {
        const orLocator = new OrLocator();

        orLocator.addChild(this);

        return orLocator;
    }

    name(value: string): ICombinable {
        const copy = this.clone();

        copy.children.push(new NameLocator(value));

        return copy;
    }

    className(value: string): ICombinable {
        const copy = this.clone();

        copy.children.push(new ClassNameLocator(value));

        return copy;
    }

    isControl(): ICombinable {
        const copy = this.clone();

        copy.children.push(new IsControlLocator());

        return copy;
    }

    isContent(): ICombinable {
        const copy = this.clone();

        copy.children.push(new IsContentLocator());

        return copy;
    }

    automationId(value: string): ICombinable {
        const copy = this.clone();

        copy.children.push(new AutomationIdLocator(value));

        return copy;
    }

    processId(value: number): ICombinable {
        const copy = this.clone();

        copy.children.push(new ProcessIdLocator(value));

        return copy;
    }

    controlType(value: ControlTypes): ICombinable {
        const copy = this.clone();

        copy.children.push(new ControlTypeLocator(value));

        return copy;
    }

    runtimeId(value: string): ICombinable {
        const copy = this.clone();

        copy.children.push(new RuntimeIdLocator(value));

        return copy;
    }

    combine(locator: ICombinable): ICombinable {
        const copy = this.clone();

        copy.children.push(locator);

        return copy;
    }

    clone(): AndLocator {
        const copy = new AndLocator();

        copy.children = this.children.map(c => c.clone())

        return copy;
    }

    addChild(child: ICombinable) {
        this.children.push(child);
    }

    getChildren() {
        return this.children;
    }

    toString() {
        return `{ ${this.children.map(node => node.toString()).join(' && ')} }`;
    }
}

interface IOrLocator extends ILocatable, ICombinable {

}

class OrLocator implements IOrLocator, ICloneable<OrLocator> {
    protected children: ICombinable[];

    constructor() {
        this.children = [];
    }

    get and(): ILocatable {
        return new AndLocator();
    }

    get or(): ILocatable {
        return this;
    }

    name(value: string): ICombinable {
        const copy = this.clone();

        copy.children.push(new NameLocator(value));

        return copy;
    }

    className(value: string): ICombinable {
        const copy = this.clone();

        copy.children.push(new ClassNameLocator(value));

        return copy;
    }

    isControl(): ICombinable {
        const copy = this.clone();

        copy.children.push(new IsControlLocator());

        return this;
    }

    isContent(): ICombinable {
        const copy = this.clone();

        copy.children.push(new IsContentLocator());

        return copy;
    }

    automationId(value: string): ICombinable {
        const copy = this.clone();

        copy.children.push(new AutomationIdLocator(value));

        return copy;
    }

    processId(value: number): ICombinable {
        const copy = this.clone();

        copy.children.push(new ProcessIdLocator(value));

        return copy;

    }

    controlType(value: ControlTypes): ICombinable {
        const copy = this.clone();

        copy.children.push(new ControlTypeLocator(value));

        return copy;

    }

    runtimeId(value: string): ICombinable {
        const copy = this.clone();

        copy.children.push(new RuntimeIdLocator(value));

        return copy;
    }

    combine(locator: ICombinable): ICombinable {
        const copy = this.clone();

        copy.children.push(locator);

        return copy;
    }

    clone(): OrLocator {
        const copy = new OrLocator();

        copy.children = this.children.map(c => c.clone());
        
        return copy;
    }

    addChild(child: ICombinable) {
        this.children.push(child);
    }

    getChildren() {
        return this.children;
    }

    toString() {
        return `{ ${this.children.map(node => node.toString()).join(' || ')} }`;
    }
}

class By {
    constructor() {

    }

    name(value: string): ICombinable {
        return new NameLocator(value);
    }

    className(value: string): ICombinable {
        return new ClassNameLocator(value);
    }

    isControl(): ICombinable {
        return new IsControlLocator();
    }

    isContent(): ICombinable {
        return new IsContentLocator();
    }

    automationId(value: string): ICombinable {
        return new AutomationIdLocator(value);
    }

    processId(value: number): ICombinable {
        return new ProcessIdLocator(value);
    }

    controlType(value: ControlTypes): ICombinable {
        return new ControlTypeLocator(value);
    }

    runtimeId(value: string): ICombinable {
        return new RuntimeIdLocator(value);
    }

    
}

export {
    By,
    NameLocator,
    ClassNameLocator,
    IsControlLocator,
    AndLocator,
    OrLocator,
    IsContentLocator,
    RuntimeIdLocator,
    ProcessIdLocator,
    AutomationIdLocator
}
