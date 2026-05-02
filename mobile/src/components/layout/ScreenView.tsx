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

export const ScreenView: React.FC<Props> = ({ children, padding, gap, style, centered = false, ...props }) => (
  <View
    {...props}
    style={[
      styles.wrap,
      centered && styles.centered,
      padding !== undefined ? { padding } : styles.padding,
      gap !== undefined ? { gap } : styles.gap,
      style,
    ]}
  >
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
    backgroundColor: UI.color.black500,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  padding: {
    padding: 8,
  },
  gap: {
    gap: 8,
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
  readonly padding?: number;
  readonly gap?: number;
  readonly children?: React.ReactNode;
}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
