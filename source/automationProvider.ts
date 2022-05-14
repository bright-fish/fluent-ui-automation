import { IAction } from './actions';

export interface IAutomationProvider {
    execute(actions: IAction[]);
}

