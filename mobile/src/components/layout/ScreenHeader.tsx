import React from 'react';
import { View } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';

import { UI } from '@nono-art/ui-mobile';

// import { UI } from '@nono-art/ui';

// import { useStoreSelectors } from '../../store';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const ScreenHeader = React.memo<Props>(({ title, icon, isBackButton = false }) => {
  // const {
  //   settings: { appHeaderTitle },
  // } = useStoreSelectors();

  const navigation = useNavigation();

  const { top } = useSafeAreaInsets();

  /* --------------------------------- RETURN --------------------------------- */

  return (
    <Appbar
      dark
      mode="center-aligned"
      style={{ shadowColor: UI.color.primary, elevation: 1, height: 85 }}
      safeAreaInsets={{ top }}
    >
      {isBackButton && <Appbar.BackAction onPress={navigation.goBack} />}

      <Appbar.Content
        title={
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
            {!!icon && icon}

            {/* <Text variant="titleLarge">{title || appHeaderTitle}</Text> */}
            {!!title && <Text variant="titleLarge">{title}</Text>}
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
