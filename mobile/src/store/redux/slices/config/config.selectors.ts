import { useAppSelector } from '../../hooks';

import { selectors, type Selectors } from './config.slice';

/* -------------------------------------------------------------------------- */
/*                                    HOOK                                    */
/* -------------------------------------------------------------------------- */

export const useConfigSelectors = (): ConfigSelectors => {
  /* -------------------------------- selectors ------------------------------- */

  const appHeaderTitle = useAppSelector(selectors.appHeaderTitle);
  const artGapSize = useAppSelector(selectors.artGapSize);
  const artCounterSizeModifier = useAppSelector(selectors.artCounterSizeModifier);
  const artCellBorderRadiusModifier = useAppSelector(selectors.artCellBorderRadiusModifier);

  /* ------------------------------- / selectors ------------------------------ */

  /* --------------------------------- RETURN --------------------------------- */

  return {
    appHeaderTitle,
    artGapSize,
    artCounterSizeModifier,
    artCellBorderRadiusModifier,
  };
};

/* -------------------------------------------------------------------------- */
/*                                   / HOOK                                   */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

export interface ConfigSelectors extends Selectors {}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
