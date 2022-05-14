import { Automation, AutomationCondition, ControlTypeIds, PropertyIds, TreeScopes } from "@bright-fish/node-ui-automation";
import { Scopes } from "../actions";
import { ControlTypes } from "../ControlTypes";
import { AndLocator, AutomationIdLocator, ClassNameLocator, ICombinable, IsContentLocator, IsControlLocator, NameLocator, OrLocator } from "../locators";

export function translateLocatorToCondition(automation: Automation, locator: ICombinable): AutomationCondition {
    if (locator === null) {
        return automation.createTrueCondition();
    } else if (locator instanceof AndLocator) {
        let previousCondition = null;
        for (let child of locator.getChildren()) {
            if (!previousCondition) {
                previousCondition = translateLocatorToCondition(automation, child);
                continue;
            }

            const currentCondition = translateLocatorToCondition(automation, child);

            previousCondition = automation.createAndCondition(previousCondition, currentCondition);
        }

        return previousCondition;
    } else if (locator instanceof OrLocator) {
        let previousCondition = null;
        for (let child of locator.getChildren()) {
            if (!previousCondition) {
                previousCondition = translateLocatorToCondition(automation, child);
                continue;
            }

            const currentCondition = translateLocatorToCondition(automation, child);

            previousCondition = automation.createOrCondition(previousCondition, currentCondition);
        }

        return previousCondition;
    } else if (locator instanceof NameLocator) {
        return automation.createPropertyCondition(PropertyIds.NamePropertyId, locator.value);
    } else if (locator instanceof ClassNameLocator) {
        return automation.createPropertyCondition(PropertyIds.ClassNamePropertyId, locator.value)
    } else if (locator instanceof AutomationIdLocator) {
        return automation.createPropertyCondition(PropertyIds.AutomationIdPropertyId, locator.value);
    } else if (locator instanceof IsControlLocator) {
        return automation.createPropertyCondition(PropertyIds.IsControlElementPropertyId, true);
    } else if (locator instanceof IsContentLocator) {
        return automation.createPropertyCondition(PropertyIds.IsContentElementPropertyId, true);
    }
    else {
        throw new Error(`Locator ${typeof locator} not implenented. `);
    }
}

export function translateScopeToTreeScope(treeScope: Scopes): TreeScopes {
    switch (treeScope) {
        case Scopes.Children:
            return TreeScopes.Children;
        case Scopes.Descendants:
            return TreeScopes.Descendants;
        default:
            throw new Error('Not implemented. ');
    }
}

export function translateControlTypes(controlTypes: ControlTypeIds): ControlTypes {
    switch (controlTypes) {

    }
    switch (controlTypes) {
        case ControlTypeIds.AppBarControlTypeId:
            return ControlTypes.AppBar;
        case ControlTypeIds.ButtonControlTypeId:
            return ControlTypes.Button;
        case ControlTypeIds.CalendarControlTypeId:
            return ControlTypes.Calendar;
        case ControlTypeIds.CheckBoxControlTypeId:
            return ControlTypes.CheckBox;
        case ControlTypeIds.ComboBoxControlTypeId:
            return ControlTypes.ComboBox;
        case ControlTypeIds.CustomControlTypeId:
            return ControlTypes.Custom;
        case ControlTypeIds.DataGridControlTypeId:
            return ControlTypes.DataGrid;
        case ControlTypeIds.DataItemControlTypeId:
            return ControlTypes.DataItem;
        case ControlTypeIds.DocumentControlTypeId:
            return ControlTypes.Document;
        case ControlTypeIds.EditControlTypeId:
            return ControlTypes.Edit;
        case ControlTypeIds.GroupControlTypeId:
            return ControlTypes.Group;
        case ControlTypeIds.HeaderControlTypeId:
            return ControlTypes.Header;
        case ControlTypeIds.HeaderItemControlTypeId:
            return ControlTypes.HeaderItem;
        case ControlTypeIds.HyperlinkControlTypeId:
            return ControlTypes.Hyperlink;
        case ControlTypeIds.ImageControlTypeId:
            return ControlTypes.Image;
        case ControlTypeIds.ListControlTypeId:
            return ControlTypes.List;
        case ControlTypeIds.ListItemControlTypeId:
            return ControlTypes.ListItem;
        case ControlTypeIds.MenuBarControlTypeId:
            return ControlTypes.MenuBar;
        case ControlTypeIds.MenuControlTypeId:
            return ControlTypes.Menu;
        case ControlTypeIds.MenuItemControlTypeId:
            return ControlTypes.MenuItem;
        case ControlTypeIds.PaneControlTypeId:
            return ControlTypes.Pane;
        case ControlTypeIds.ProgressBarControlTypeId:
            return ControlTypes.ProgressBar;
        case ControlTypeIds.RadioButtonControlTypeId:
            return ControlTypes.RadioButton;
        case ControlTypeIds.ScrollBarControlTypeId:
            return ControlTypes.ScrollBar;
        case ControlTypeIds.SemanticZoomControlTypeId:
            return ControlTypes.SemanticZoom;
        case ControlTypeIds.SeparatorControlTypeId:
            return ControlTypes.Separator;
        case ControlTypeIds.SliderControlTypeId:
            return ControlTypes.Slider;
        case ControlTypeIds.SpinnerControlTypeId:
            return ControlTypes.Spinner;
        case ControlTypeIds.SplitButtonControlTypeId:
            return ControlTypes.SplitButton;
        case ControlTypeIds.StatusBarControlTypeId:
            return ControlTypes.StatusBar;
        case ControlTypeIds.TabControlTypeId:
            return ControlTypes.Tab;
        case ControlTypeIds.TabItemControlTypeId:
            return ControlTypes.TabItem;
        case ControlTypeIds.TableControlTypeId:
            return ControlTypes.Table;
        case ControlTypeIds.TextControlTypeId:
            return ControlTypes.Text;
        case ControlTypeIds.ThumbControlTypeId:
            return ControlTypes.Thumb;
        case ControlTypeIds.TitleBarControlTypeId:
            return ControlTypes.TitleBar;
        case ControlTypeIds.ToolBarControlTypeId:
            return ControlTypes.ToolBar;
        case ControlTypeIds.ToolTipControlTypeId:
            return ControlTypes.ToolTip;
        case ControlTypeIds.TreeControlTypeId:
            return ControlTypes.Tree;
        case ControlTypeIds.TreeItemControlTypeId:
            return ControlTypes.TreeItem;
        case ControlTypeIds.WindowControlTypeId:
            return ControlTypes.Window;
        default:
            throw new Error(`ControlTypeId ${controlTypes} not implemented.`);
    }
}