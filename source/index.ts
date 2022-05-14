import { Conditions, IConditions } from "./conditions";
import { WindowsNativeProvider } from "./windows";
import { By } from "./locators";
import { WindowsAutomationProvider } from "./windows";
import { IElements, Queryable } from "./queryable";
import { Automation } from "@bright-fish/node-ui-automation";
import { INative } from "./native";

const automation = new Automation();

const by: By = new By();
const elements = new Queryable(new WindowsAutomationProvider(automation)) as IElements;
const native = new WindowsNativeProvider(automation) as INative;
const conditions = new Conditions() as IConditions;

export {
    by,
    elements,
    native,
    conditions
};