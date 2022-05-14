import { ICloneable } from "./cloneable";
import { IElement } from "./element";
import { ICombinable } from "./locators";

export interface IAction extends ICloneable<IAction> {

}

export enum Scopes {
    Children = 'children',
    Descendants = 'descendants',
}
export class SetScopeAction implements IAction {
    constructor(public scope: Scopes) {

    }

    clone(): IAction {
        return new SetScopeAction(this.scope)
    }
}

export class SetRootAction implements IAction {
    constructor(public element: IElement) {

    }
    clone(): IAction {
        return new SetRootAction(this.element.clone());
    }


}

export class AllAction implements IAction {
    constructor(public locator?: ICombinable) {

    }

    clone(): IAction {
        return new AllAction(this.locator);
    }
}

export class SkipAction implements IAction {
    constructor(public amount: number) {

    }

    clone(): IAction {
        return new SkipAction(this.amount);
    }
}

export class TakeAction implements IAction {
    constructor(public amount: number) {

    }

    clone(): IAction {
        return new TakeAction(this.amount);
    }
}

export class AtAction implements IAction {
    constructor(public index: number) { 

    }

    clone(): IAction {
        return new AtAction(this.index);
    }
}

export class FirstAction implements IAction {
    constructor(public locator?: ICombinable) {

    }

    clone(): IAction {
        return new FirstAction(this.locator);
    }
}

export class LastAction implements IAction {
    constructor(public locator?: ICombinable) {

    }

    clone(): IAction {
        return new LastAction(this.locator);
    }
}

export class CountAction implements IAction {
    constructor(public locator?: ICombinable) {

    }

    clone(): IAction {
        return new CountAction(this.locator);
    }
}

export class ExistsAction implements IAction {
    constructor(public locator?: ICombinable) {

    }

    clone(): IAction {
        return new ExistsAction(this.locator);
    }
}

export class ToArrayAction implements IAction {
    constructor() {

    }

    clone(): IAction {
        return new ToArrayAction();
    }
}