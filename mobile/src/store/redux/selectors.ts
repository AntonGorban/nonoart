import { useConfigSelectors, useLevelsSelectors, useMyLevelsSelectors } from './slices';

/* -------------------------------------------------------------------------- */
/*                                    HOOK                                    */
/* -------------------------------------------------------------------------- */

export const useStoreSelectors = () => {
  /* -------------------------------- selectors ------------------------------- */

  const levels = useLevelsSelectors();
  const myLevels = useMyLevelsSelectors();
  const config = useConfigSelectors();

  /* ------------------------------- / selectors ------------------------------ */

  /* --------------------------------- RETURN --------------------------------- */

  return { levels, myLevels, config };
};

/* -------------------------------------------------------------------------- */
/*                                   / HOOK                                   */
/* -------------------------------------------------------------------------- */
