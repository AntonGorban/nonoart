import { Typography } from 'antd';
import React from 'react';
import {
  useAsyncError,
  useAsyncValue,
  useFormAction,
  useInRouterContext,
  useLocation,
  useNavigate,
  useNavigationType,
  useOutlet,
  useOutletContext,
  useParams,
  useSearchParams,
} from 'react-router';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const HomePage: React.FC<Props> = () => {
  const AsyncError = useAsyncError();
  const AsyncValue = useAsyncValue();
  const FormAction = useFormAction();
  const InRouterContext = useInRouterContext();
  const Location = useLocation();
  const Navigate = useNavigate();
  const NavigationType = useNavigationType();
  const Outlet = useOutlet();
  const OutletContext = useOutletContext();
  const Params = useParams();
  const SearchParams = useSearchParams();

  return (
    <>
      <Typography.Title>HomePage</Typography.Title>

      <Typography.Paragraph code>
        <pre>
          {JSON.stringify(
            {
              AsyncError,
              AsyncValue,
              FormAction,
              InRouterContext,
              Location,
              Navigate,
              NavigationType,
              Outlet,
              OutletContext,
              Params,
              SearchParams,
            },
            null,
            2,
          )}
        </pre>
      </Typography.Paragraph>
    </>
  );
};

/* -------------------------------------------------------------------------- */
/*                                 / COMPONENT                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

interface Props {}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
