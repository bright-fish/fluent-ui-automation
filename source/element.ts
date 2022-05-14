import { BoundingBox } from "./boundingBox";
import { ICloneable } from "./cloneable";
import { ControlTypes } from "./ControlTypes";
import { IQueryable } from "./queryable";

export interface IElement extends ICloneable<IElement> {
    get name(): string;
    get className(): string;
    get isControl(): boolean;
    get isContent(): boolean;
    get isDialog(): boolean;
    get controlType(): ControlTypes;
    get boundingBox(): BoundingBox;
    get automationId(): string;
    get elements(): IQueryable;
    get children(): IQueryable;
    get parent(): IElement;
    get isOffscreen(): boolean;
    get processId(): number;

    setText(text: string): Promise<void>;
    scrollTo(): Promise<void>;
    click(): Promise<void>;
    getText(): Promise<string>;
    sendKeys(value: string): Promise<void>;
}
