import React, { type ComponentProps } from 'react';

import { useStoreSelectors } from '@/store';

import { CounterListPresentation } from './CounterList.presentation';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const CounterList = React.memo<Props>(({ ...props }) => {
  const {
    config: { artGapSize },
  } = useStoreSelectors();

  /* --------------------------------- RETURN --------------------------------- */

  return <CounterListPresentation {...props} artGapSize={artGapSize} />;
});

/* -------------------------------------------------------------------------- */
/*                                 / COMPONENT                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    tYPES                                   */
/* -------------------------------------------------------------------------- */

type CounterListPresentationProps = ComponentProps<typeof CounterListPresentation>;

interface Props extends Omit<CounterListPresentationProps, 'artGapSize'> {}

/* -------------------------------------------------------------------------- */
/*                                   / tYPES                                  */
/* -------------------------------------------------------------------------- */
