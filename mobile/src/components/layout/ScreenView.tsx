import type React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView, type SafeAreaViewProps } from 'react-native-safe-area-context';

import { UI } from '@nono-art/ui-mobile';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const ScreenView: React.FC<Props> = ({ children, style, centered = false, ...props }) => (
  <SafeAreaView {...props} style={[styles.wrap, centered && styles.centered, style]}>
    {children}
  </SafeAreaView>
);

/* -------------------------------------------------------------------------- */
/*                                 / COMPONENT                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                   STYLES                                   */
/* -------------------------------------------------------------------------- */

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    padding: 7,
    backgroundColor: UI.color.black500,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

/* -------------------------------------------------------------------------- */
/*                                  / STYLES                                  */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

interface Props extends SafeAreaViewProps {
  readonly centered?: boolean;
  readonly children?: React.ReactNode;
}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
