import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';

import { UI } from '@nono-art/ui-mobile';

import { useStoreSelectors } from '@/src/store';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const ScreenHeader = React.memo<Props>(({ title, icon, isBackButton = false }) => {
  const {
    config: { appHeaderTitle },
  } = useStoreSelectors();

  const navigation = useNavigation();

  const { top } = useSafeAreaInsets();

  /* --------------------------------- RETURN --------------------------------- */

  return (
    <Appbar dark mode="center-aligned" style={styles.appBar} safeAreaInsets={{ top }}>
      {isBackButton && <Appbar.BackAction onPress={navigation.goBack} />}

      <Appbar.Content
        title={
          <View style={styles.wrap}>
            {!!icon && icon}

            <Text variant="titleLarge" style={styles.title}>
              {title || appHeaderTitle}
            </Text>
          </View>
        }
      />
    </Appbar>
  );
});

/* -------------------------------------------------------------------------- */
/*                                 / COMPONENT                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                   STYLES                                   */
/* -------------------------------------------------------------------------- */

const styles = StyleSheet.create({
  appBar: {
    shadowColor: UI.color.primary,
    elevation: 1,
    height: 80,
  },
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },
  title: {
    fontSize: 20,
  },
});

/* -------------------------------------------------------------------------- */
/*                                  / STYLES                                  */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

interface Props {
  readonly title: string;
  readonly icon?: React.ReactNode;
  readonly isBackButton?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
