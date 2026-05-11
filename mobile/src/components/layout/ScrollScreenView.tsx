import type React from 'react';
import type { ComponentProps } from 'react';
import { StyleSheet, type ViewStyle } from 'react-native';

// import Animated, { useAnimatedRef } from 'react-native-reanimated';

import { ScreenView } from './ScreenView';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

/** @deprecated */
export const ScrollViewScreen: React.FC<Props> = ({
  children,
  contentContainerStyle,
  scrollEventThrottle = 16,
  showsVerticalScrollIndicator = false,
  ...props
}) => {
  // const scrollRef = useAnimatedRef<Animated.ScrollView>();

  return (
    <ScreenView {...props}>
      {/* <Animated.ScrollView
        ref={scrollRef}
        style={styles.container}
        contentContainerStyle={[styles.content, contentContainerStyle]}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        scrollEventThrottle={scrollEventThrottle}
      > */}
      {children}
      {/* </Animated.ScrollView> */}
    </ScreenView>
  );
};

/* -------------------------------------------------------------------------- */
/*                                 / COMPONENT                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                   STYLES                                   */
/* -------------------------------------------------------------------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    gap: 10,
  },
});

/* -------------------------------------------------------------------------- */
/*                                  / STYLES                                  */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

interface Props extends ComponentProps<typeof ScreenView> {
  children?: React.ReactNode;
  scrollEventThrottle?: number;
  showsVerticalScrollIndicator?: boolean;
  contentContainerStyle?: ViewStyle;
}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
