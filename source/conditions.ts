import { ICombinable } from "./locators";

export interface IConditions {
    exists(locator: ICombinable): ICondition;
}

export interface ICondition {

}

export class Conditions {
    exists(locator: ICombinable): ICondition {
        return new ExistsCondition(locator);
    }
}


export class ExistsCondition implements ICondition {
    constructor(public locator: ICombinable) {

    }
}