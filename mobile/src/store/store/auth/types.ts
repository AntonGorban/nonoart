import type { D } from '@nono-art/domain';

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

export interface Auth extends StoreAuth {
  readonly complexity: D.Level.Complexity;
}

/* -------------------------------------------------------------------------- */

export interface StoreAuth {
  readonly user: {
    readonly id: D.User.Id;
    readonly login: D.User.Login;
    readonly role: D.User.Role;
  } | null;
  readonly accessToken: string | null;
  readonly refreshToken: string | null;
}

/* -------------------------------------------------------------------------- */

export interface SerializedAuth extends StoreAuth {}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
