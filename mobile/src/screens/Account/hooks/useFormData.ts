import { useLogin } from './useLogin';
import { usePassword } from './usePassword';

/* -------------------------------------------------------------------------- */
/*                                    HOOK                                    */
/* -------------------------------------------------------------------------- */

export const useFormData = () => {
  const { login, changeLogin } = useLogin();
  const { password, changePassword } = usePassword();

  return {
    login,
    password,
    changeLogin,
    changePassword,
  };
};

/* -------------------------------------------------------------------------- */
/*                                   / HOOK                                   */
/* -------------------------------------------------------------------------- */
