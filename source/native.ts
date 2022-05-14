import { ICondition } from "./conditions";
import { IElement } from "./element";

export interface INative {
    waitFor(condition: ICondition, options?: WaitForOptions): Promise<void>;
}

export interface WaitForOptions {
    timeout?: number;
    rootElement?: IElement;
}
