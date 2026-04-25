import type { AxiosInstance } from 'axios';

import type { REST } from '@nono-art/api-types';

export const createUserApiDictionary = (client: AxiosInstance) => ({
  /* -------------------------------------------------------------------------- */
  /*                                     GET                                    */
  /* -------------------------------------------------------------------------- */

  get: (params: REST.user.get.P, query: REST.user.get.Q, body: REST.user.get.B) =>
    client.get<REST.user.get.R>('user', { params: query }),

  /* -------------------------------------------------------------------------- */
  /*                                    / GET                                   */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                    POST                                    */
  /* -------------------------------------------------------------------------- */

  signUp: (params: REST.user.signUp.P, query: REST.user.signUp.Q, body: REST.user.signUp.B) =>
    client.post<REST.user.signUp.R>('user/sign-up', body, { params: query, skipAuthRefresh: true }),

  /* -------------------------------------------------------------------------- */

  signIn: (params: REST.user.signIn.P, query: REST.user.signIn.Q, body: REST.user.signIn.B) =>
    client.post<REST.user.signIn.R>('user/sign-in', body, { params: query, skipAuthRefresh: true }),

  /* -------------------------------------------------------------------------- */

  refreshToken: (params: REST.user.refreshToken.P, query: REST.user.refreshToken.Q, body: REST.user.refreshToken.B) =>
    client.post<REST.user.refreshToken.R>('user/refresh-token', body, { params: query, skipAuthRefresh: true }),

  /* -------------------------------------------------------------------------- */
  /*                                   / POST                                   */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                     PUT                                    */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                    / PUT                                   */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                    PATCH                                   */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                   / PATCH                                  */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                   DELETE                                   */
  /* -------------------------------------------------------------------------- */

  signOut: (params: REST.user.signOut.P, query: REST.user.signOut.Q, body: REST.user.signOut.B) =>
    client.delete<REST.user.signOut.R>('user/sign-out', { params: query, skipAuthRefresh: true }),

  /* -------------------------------------------------------------------------- */
  /*                                  / DELETE                                  */
  /* -------------------------------------------------------------------------- */
});

export type User = Readonly<ReturnType<typeof createUserApiDictionary>>;
