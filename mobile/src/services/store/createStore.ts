import { useSyncExternalStore } from 'react';

export const createStore = <State>(initialState: State) => {
  let state = initialState;
  const listeners = new Set<() => void>();

  const getState = () => state;

  const setState = (updater: (prev: State) => State) => {
    state = updater(state);
    listeners.forEach((listener) => listener());
  };

  const subscribe = (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  const createSetter = <P extends ReadonlyArray<unknown>>(fn: (...args: P) => (prev: State) => State) => {
    return (...args: P) => setState(fn(...args));
  };

  return { getState, setState, subscribe, createSetter };
};

export type GlobalStore<State> = ReturnType<typeof createStore<State>>;
export type GlobalSelector<State, Selected> = (state: State) => Selected;

export const useGlobalStoreSelector = <State, Selected = State>(
  store: GlobalStore<State>,
  selector: GlobalSelector<State, Selected>,
): Selected => {
  return useSyncExternalStore(store.subscribe, () => selector(store.getState()));
};
