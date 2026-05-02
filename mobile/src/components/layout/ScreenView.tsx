import type React from 'react';
import { StyleSheet, View, type ViewProps } from 'react-native';

import { UI } from '@nono-art/ui-mobile';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

// export const ScreenView: React.FC<Props> = ({ children, style, centered = false, ...props }) => (
//   <SafeAreaView {...props} style={[styles.wrap, centered && styles.centered, style]}>
//     {children}
//   </SafeAreaView>
// );

export const ScreenView: React.FC<Props> = ({ children, style, centered = false, ...props }) => (
  <View {...props} style={[styles.wrap, centered && styles.centered, style]}>
    {children}
  </View>
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
    padding: 8,
    gap: 8,
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

// interface Props extends SafeAreaViewProps {
interface Props extends ViewProps {
  readonly centered?: boolean;
  readonly children?: React.ReactNode;
}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
