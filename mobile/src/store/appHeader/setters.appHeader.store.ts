import { type State, store } from './appHeader.store';

export const state = store.createSetter((state: State) => (p) => ({ ...p, ...state }));
export const partialState = store.createSetter((state: Partial<State>) => (p) => ({ ...p, ...state }));

export const title = store.createSetter((title: State['title']) => (p) => ({ ...p, title }));
export const icon = store.createSetter((icon: State['icon']) => (p) => ({ ...p, icon }));
export const actionList = store.createSetter((actionList: State['actionList']) => (p) => ({ ...p, actionList }));
