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

    scrollTo(): Promise<void>;
    invoke(): Promise<void>;
    select(): Promise<void>;
    toggle(): Promise<void>;
    expand(): Promise<void>;
    collapse(): Promise<void>;
    close(): Promise<void>;
    maximize(): Promise<void>;
    minimize(): Promise<void>;
    restore(): Promise<void>;
    getValue(): Promise<string>;
    setValue(value: string): Promise<void>;
    focus(): Promise<void>;
}
