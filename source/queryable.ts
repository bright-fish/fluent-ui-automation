import { AllAction, AtAction, CountAction, ExistsAction, FirstAction, IAction, LastAction, Scopes, SetScopeAction, SkipAction, TakeAction, ToArrayAction } from "./actions";
import { IAutomationProvider } from "./automationProvider";
import { ICloneable } from "./cloneable";
import { IElement } from "./element";
import { ICombinable } from "./locators";

export interface ISkippable {
    take(amount: Number): ITakeable;
    first(): IElement;
    last(): IElement;
    count(): number;
    toArray(): IElement[];
}

export interface ITakeable {
    first(): IElement;
    last(): IElement;
    count(): number;
    toArray(): IElement[];
}

export interface IAllQueryable {
    first(locator?: ICombinable): IElement;
    last(locator?: ICombinable): IElement;
    count(locator?: ICombinable): number;
    skip(amount: number): ISkippable;
    take(amount: number): ITakeable;
    exists(locator?: ICombinable): boolean;
    toArray(): IElement[];
}

export interface IQueryable {
    all(locator: ICombinable): IAllQueryable;
    first(locator?: ICombinable): IElement;
    last(locator?: ICombinable): IElement;
    count(locator?: ICombinable): number;
    skip(amount: number): ISkippable;
    take(amount: number): ITakeable;
    exists(locator: ICombinable): boolean;
    toArray(): IElement[];
}

export interface IElements {
    all(locator: ICombinable): IAllQueryable;
    first(locator: ICombinable): IElement;
    last(locator: ICombinable): IElement;
    count(locator: ICombinable): number;
    exists(locator: ICombinable): boolean;
}

export class Queryable implements IQueryable, ITakeable, ISkippable, ICloneable<Queryable>, IElements {

    private actions: IAction[];

    constructor(private automationProvider: IAutomationProvider) {
        this.actions = [];
    }

    all(locator: ICombinable): IAllQueryable {
        const queryable = this.clone();

        queryable.addAction(new AllAction(locator));

        return queryable;
    }

    at(index: number): IElement {
        const queryable = this.clone();

        queryable.addAction(new AtAction(index));

        return this.automationProvider.execute(queryable.actions);
    }

    first(locator?: ICombinable): IElement {
        const queryable = this.clone();

        queryable.addAction(new FirstAction(locator));

        return this.automationProvider.execute(queryable.actions);
    }

    last(locator?: ICombinable): IElement {
        const queryable = this.clone();

        queryable.addAction(new LastAction(locator));

        return this.automationProvider.execute(queryable.actions);
    }

    count(locator?: ICombinable): number {
        const queryable = this.clone();

        queryable.addAction(new CountAction(locator));

        return this.automationProvider.execute(queryable.actions);
    }

    skip(amount: number): ISkippable {
        const queryable = this.clone();

        queryable.addAction(new SkipAction(amount));

        return queryable;
    }

    take(amount: number): ITakeable {
        const queryable = this.clone();

        queryable.addAction(new TakeAction(amount));

        return queryable;
    }

    exists(locator: ICombinable): boolean {
        const queryable = this.clone();

        queryable.addAction(new ExistsAction(locator));

        return this.automationProvider.execute(queryable.actions);
    }

    toArray(): IElement[] {
        const queryable = this.clone();

        queryable.addAction(new ToArrayAction());

        return this.automationProvider.execute(queryable.actions);
    }

    clone(): Queryable {
        const queryable = new Queryable(this.automationProvider);

        for (let action of this.actions) {
            queryable.actions.push(action.clone());
        }

        return queryable;
    }

    public addAction(action: IAction) {
        // todo: potentially put action validation here
        this.actions.push(action);
    }
}