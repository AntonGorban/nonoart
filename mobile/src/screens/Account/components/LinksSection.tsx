import React from 'react';
import { ScrollView } from 'react-native';
import { List } from 'react-native-paper';

import { UI } from '@nono-art/ui-mobile';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const LinksSection = React.memo<Props>(
  ({ isAuth, isAdmin, navToUsers, navToColorPalette, navToAsyncStorage }) => (
    <ScrollView style={{ width: '100%' }}>
      <List.Section>
        {isAdmin && (
          <>
            <List.Subheader>Админка</List.Subheader>

            <List.Item
              title="Пользователи"
              description="Список пользователей"
              rippleColor={UI.color.black700}
              left={() => <List.Icon icon="account-group" />}
              onPress={navToUsers}
            />
          </>
        )}

        <List.Subheader>Утилиты разработки</List.Subheader>

        <List.Item
          title="Палитра цветов"
          description="ColorPalette"
          rippleColor={UI.color.black700}
          left={() => <List.Icon icon="palette" />}
          onPress={navToColorPalette}
        />

        <List.Item
          title="Хранилище"
          description="AsyncStorage"
          rippleColor={UI.color.black700}
          left={() => <List.Icon icon="database" />}
          onPress={navToAsyncStorage}
        />
      </List.Section>
    </ScrollView>
  ),
);

/* -------------------------------------------------------------------------- */
/*                                 / COMPONENT                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

interface Props {
  readonly isAuth: boolean;
  readonly isAdmin: boolean;
  readonly navToUsers: () => void;
  readonly navToColorPalette: () => void;
  readonly navToAsyncStorage: () => void;
}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
