import type { PropsWithChildren } from 'react';
import type React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedRef } from 'react-native-reanimated';

import { UI } from '@nono-art/ui-mobile';

import { ThemedView } from './ThemedView';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const ParallaxScrollView: React.FC<Props> = ({ children }) => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  return (
    <Animated.ScrollView ref={scrollRef} style={{ flex: 1 }} scrollEventThrottle={16}>
      <ThemedView style={styles.content}>{children}</ThemedView>
    </Animated.ScrollView>
  );
};

/* -------------------------------------------------------------------------- */
/*                                 / COMPONENT                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

interface Props extends PropsWithChildren {}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */

const styles = StyleSheet.create({
  content: {
    backgroundColor: UI.color.black500,
    flex: 1,
    padding: 16,
    gap: 16,
    overflow: 'hidden',
  },
});
