import React from 'react';
import { View } from 'react-native';
import { Avatar, Button, HelperText, Text } from 'react-native-paper';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import type { DAL } from '@nono-art/dal';
import { UI } from '@nono-art/ui-mobile';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const UserSection = React.memo<Props>(({ user, signOut }) => (
  <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 4 }}>
    <View style={{ flexGrow: 1 }}>
      <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
        <Avatar.Text size={26} label={user.login.substring(0, 1).toUpperCase()} labelStyle={{ fontWeight: 900 }} />

        <View>
          <Text style={{ fontSize: 18, fontWeight: 700 }}>{user.login}</Text>

          <Text style={{ fontSize: 10, fontWeight: 100, color: UI.color.grey600, marginTop: -2 }}>{user.role}</Text>
        </View>
      </View>

      <HelperText type="info" style={{ textAlign: 'center', fontSize: 10 }} selectable>
        {user.id}
      </HelperText>
    </View>

    <Button onPress={signOut} mode="contained-tonal" compact>
      <MaterialCommunityIcons name="exit-run" size={20} />
    </Button>
  </View>
));

/* -------------------------------------------------------------------------- */
/*                                 / COMPONENT                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

interface Props {
  readonly user: DAL.user.auth.User;
  readonly signOut: () => void;
}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
