import { useAppDispatch } from './hooks';
import { useConfigActions } from './slices';

/* -------------------------------------------------------------------------- */
/*                                    HOOK                                    */
/* -------------------------------------------------------------------------- */

export const useStoreActions = () => {
  const dispatch = useAppDispatch();

  /* --------------------------------- actions -------------------------------- */

  // const levels = useLevelsActions(dispatch);
  // const myLevels = useMyLevelsActions(dispatch);
  const config = useConfigActions(dispatch);

  /* -------------------------------- / actions ------------------------------- */

  /* --------------------------------- RETURN --------------------------------- */

  return { config };
};

/* -------------------------------------------------------------------------- */
/*                                   / HOOK                                   */
/* -------------------------------------------------------------------------- */
