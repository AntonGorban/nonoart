import type { D } from '@nono-art/domain';

export type RootStackParamList = {
  /* ---------------------------------- home ---------------------------------- */

  readonly Home: undefined;

  readonly Levels: undefined;

  readonly MyLevels: undefined;

  readonly Account: undefined;

  /* --------------------------------- / home --------------------------------- */

  /* ---------------------------------- game ---------------------------------- */

  readonly Game: { readonly levelId: D.Level.Id };

  readonly Designer: { readonly levelId: D.Level.Id };

  /* --------------------------------- / game --------------------------------- */

  /* ---------------------------------- utils --------------------------------- */

  readonly ColorPalette: undefined;

  readonly AsyncStorage: undefined;

  /* --------------------------------- / utils -------------------------------- */

  /* ---------------------------------- admin --------------------------------- */

  readonly Users: undefined;

  /* --------------------------------- / admin -------------------------------- */
};
