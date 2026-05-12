import { createStore, type GlobalSelector, type GlobalStore, useGlobalStoreSelector } from '@/services';

/* -------------------------------------------------------------------------- */
/*                                    STATE                                   */
/* -------------------------------------------------------------------------- */

const initialState: State = {
  title: null,
  icon: null,
  actionList: null,
};

/* -------------------------------------------------------------------------- */
/*                                   / STATE                                  */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

export interface State {
  readonly title: string | null;
  readonly icon: React.ReactNode | null;
  readonly actionList: ReadonlyArray<{
    readonly icon: React.ReactNode;
    readonly onPress: () => void;
  }> | null;
}

/* -------------------------------------------------------------------------- */

export type Store = GlobalStore<State>;
export type Selector<Selected> = GlobalSelector<State, Selected>;

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */

export const store: Store = createStore(initialState);

export const useStoreSelector = <Selected>(selector: Selector<Selected>) =>
  useGlobalStoreSelector<State, Selected>(store, selector);
