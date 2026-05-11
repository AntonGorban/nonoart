import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { AntDesign } from '@expo/vector-icons';

import type { D } from '@nono-art/domain';
import { UI } from '@nono-art/ui-mobile';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const LevelSocial = React.memo<Props>(({ likesCount, dislikesCount }) => (
  <View style={styles.wrap}>
    <View style={styles.socialWrap}>
      <Text>{likesCount}</Text>

      <AntDesign name="like" size={12} color={UI.color.greyWhite} />
    </View>

    <View style={styles.socialWrap}>
      <Text>{dislikesCount}</Text>

      <AntDesign name="dislike" size={12} color={UI.color.greyWhite} />
    </View>
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
    flexDirection: 'row',
    gap: 7,
  },
  socialWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
});

/* -------------------------------------------------------------------------- */
/*                                  / STYLES                                  */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

interface Props {
  readonly likesCount: D.Level.LikesCount;
  readonly dislikesCount: D.Level.DislikesCount;
}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
