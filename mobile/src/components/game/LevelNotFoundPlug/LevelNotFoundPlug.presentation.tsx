import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

import { AntDesign } from '@expo/vector-icons';

import { UI } from '@nono-art/ui-mobile';

import { ScreenView } from '../../layout';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const LevelNotFoundPlugPresentation = React.memo<Props>(() => (
  <ScreenView centered gap={16}>
    <UI.Layout.Divider />

    <AntDesign name="file-unknown" size={150} color={UI.color.greyWhite} />

    <Text variant="headlineSmall" style={styles.text}>
      Уровень не найден
    </Text>

    <UI.Layout.Divider />
  </ScreenView>
));

/* -------------------------------------------------------------------------- */
/*                                 / COMPONENT                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                   STYLES                                   */
/* -------------------------------------------------------------------------- */

const styles = StyleSheet.create({
  text: { color: UI.color.red700 },
});

/* -------------------------------------------------------------------------- */
/*                                  / STYLES                                  */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

interface Props {}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
