import type { AxiosInstance } from 'axios';

import type { REST } from '@nono-art/api-types';

export const createUserApiDictionary = (client: AxiosInstance) => ({
  /* -------------------------------------------------------------------------- */
  /*                                     GET                                    */
  /* -------------------------------------------------------------------------- */

  getAll: (params: REST.user.getAll.P, query: REST.user.getAll.Q, body: REST.user.getAll.B) =>
    client.get<REST.user.getAll.R>('user'),

  /* -------------------------------------------------------------------------- */

  auth: (params: REST.user.auth.P, query: REST.user.auth.Q, body: REST.user.auth.B) =>
    client.get<REST.user.auth.R>('user/auth'),

  /* -------------------------------------------------------------------------- */

  getVerbose: ({ id }: REST.user.getVerbose.P, query: REST.user.getVerbose.Q, body: REST.user.getVerbose.B) =>
    client.get<REST.user.getVerbose.R>(`user/${id}/verbose`),

  /* -------------------------------------------------------------------------- */

  getCompact: ({ id }: REST.user.getCompact.P, query: REST.user.getCompact.Q, body: REST.user.getCompact.B) =>
    client.get<REST.user.getCompact.R>(`user/${id}/compact`),

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
