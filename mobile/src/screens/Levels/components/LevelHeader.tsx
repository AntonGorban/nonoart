import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { D } from '@nono-art/domain';
import { UI } from '@nono-art/ui-mobile';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const LevelHeader = React.memo<Props>(({ name, authorName, status }) => (
  <View style={styles.wrap}>
    <View style={styles.nameWrap}>
      {status === D.Level.Status.new && <MaterialCommunityIcons name="new-box" size={18} color={UI.color.secondary} />}

      {status === D.Level.Status.progress && (
        <MaterialCommunityIcons name="progress-question" size={18} color={UI.color.yellowA400} />
      )}

      {status === D.Level.Status.done && (
        <MaterialCommunityIcons name="check-decagram-outline" size={18} color={UI.color.primary} />
      )}

      <Text variant="labelLarge">{name}</Text>
    </View>

    <Text variant="labelSmall" style={styles.authorWrap}>
      @{authorName}
    </Text>
  </View>
));

/* -------------------------------------------------------------------------- */
/*                                 / COMPONENT                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                   STYLES                                   */
/* -------------------------------------------------------------------------- */

const styles = StyleSheet.create({
  wrap: {
    gap: 2,
    flex: 1,
  },
  nameWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 5,
  },
  authorWrap: {
    color: UI.color.greyWhite,
  },
});

/* -------------------------------------------------------------------------- */
/*                                  / STYLES                                  */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

interface Props {
  readonly name: D.Level.Name;
  readonly authorName: D.Level.AuthorName;
  readonly status: D.Level.Status;
}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
