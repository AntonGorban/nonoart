import { BaseToast, ErrorToast, SuccessToast, type ToastConfig } from 'react-native-toast-message';

import { UI } from '@nono-art/ui-mobile';

export const toastConfig: ToastConfig = {
  /* --------------------------------- success -------------------------------- */

  success: ({ text1Style, text2Style, ...props }) => (
    <SuccessToast
      {...props}
      style={{ borderLeftColor: UI.color.primary, backgroundColor: UI.color.black300 }}
      text1Style={[{ color: UI.color.white }, text1Style]}
      text2Style={[{ color: UI.color.greyWhite }, text2Style]}
      text2NumberOfLines={3}
    />
  ),

  /* -------------------------------- / success ------------------------------- */
  /* ---------------------------------- info ---------------------------------- */

  info: ({ text1Style, text2Style, ...props }) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: UI.color.cyanA400, backgroundColor: UI.color.black300 }}
      text1Style={[{ color: UI.color.white }, text1Style]}
      text2Style={[{ color: UI.color.greyWhite }, text2Style]}
      text2NumberOfLines={3}
    />
  ),

  /* --------------------------------- / info --------------------------------- */
  /* ---------------------------------- error --------------------------------- */

  error: ({ text1Style, text2Style, ...props }) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: UI.color.deepOrangeA700, backgroundColor: UI.color.black300 }}
      text1Style={[{ color: UI.color.white }, text1Style]}
      text2Style={[{ color: UI.color.greyWhite }, text2Style]}
      text2NumberOfLines={3}
    />
  ),

  /* --------------------------------- / error -------------------------------- */
};
