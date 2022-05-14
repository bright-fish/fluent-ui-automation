import { Automation, AutomationStructureChangedEventHandler, TreeScopes } from "@bright-fish/node-ui-automation";
import { WindowsAutomationElement } from ".";
import { by, conditions, elements } from "..";
import { ExistsCondition, ICondition } from "../conditions";
import { INative, WaitForOptions } from "../native";
import { translateLocatorToCondition } from "./utilities";

export class WindowsNativeProvider implements INative {
    constructor(private automation: Automation) {
    }

    private sleep(delay) {
        return new Promise((resolve, reject) => {
            const handle = setTimeout(() => {
                clearTimeout(handle);
                resolve(null);
            }, delay);
        });
    }

    waitFor(condition: ICondition, options: WaitForOptions = {}): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            if (condition instanceof ExistsCondition) {

                while (!elements.exists(condition.locator)) {
                    await this.sleep(500);
                }

                resolve();
            }
        });

        return new Promise<void>((resolve, reject) => {
            let timeoutHandle: NodeJS.Timeout = null;

            if (options.timeout) {
                timeoutHandle = setTimeout(() => reject(), options.timeout).unref();
            }

            if (condition instanceof ExistsCondition) {
                let rootElement = null;

                if (options.rootElement) {
                    rootElement = (options.rootElement as WindowsAutomationElement).automationElement;
                }

                if (!rootElement) {
                    rootElement = this.automation.getRootElement();
                }

                const automationCondition = translateLocatorToCondition(this.automation, condition.locator);

                let addStructureChangedEventHandler = new AutomationStructureChangedEventHandler((sender) => {
                    const matchingElement = sender.findFirst(TreeScopes.Subtree, automationCondition);

                    if (matchingElement) {
                        if (options.timeout) {
                            clearTimeout(timeoutHandle);
                        }

                        this.automation.removeStructureChangedEventHandler(rootElement, addStructureChangedEventHandler);

                        resolve();
                    }
                });
                this.automation.addStructureChangedEventHandler(rootElement, TreeScopes.Children, null, addStructureChangedEventHandler);
            } else {
                throw new Error(`Condition '${typeof (condition)}' not implemented`);
            }

        });
    }
}
