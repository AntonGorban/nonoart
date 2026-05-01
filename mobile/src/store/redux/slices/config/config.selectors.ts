import { useAppSelector } from '../../hooks';

import { selectors } from './config.slice';

/* -------------------------------------------------------------------------- */
/*                                    HOOK                                    */
/* -------------------------------------------------------------------------- */

export const useConfigSelectors = (): { [key in keyof typeof selectors]: ReturnType<(typeof selectors)[key]> } => {
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
