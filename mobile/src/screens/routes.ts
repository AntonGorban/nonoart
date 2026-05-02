export type RootStackParamList = {
  /* ---------------------------------- home ---------------------------------- */

  readonly Home: undefined;

  readonly Levels: undefined;

  readonly MyLevels: undefined;

  readonly Account: undefined;

  /* --------------------------------- / home --------------------------------- */

  /* ---------------------------------- game ---------------------------------- */

  readonly Game: { readonly levelId?: string };

  readonly Designer: { readonly levelId: string };

  /* --------------------------------- / game --------------------------------- */

  /* ---------------------------------- utils --------------------------------- */

  readonly ColorPalette: undefined;

  readonly AsyncStorage: undefined;

  /* --------------------------------- / utils -------------------------------- */

  /* ---------------------------------- admin --------------------------------- */

  readonly Users: undefined;

  /* --------------------------------- / admin -------------------------------- */
};
