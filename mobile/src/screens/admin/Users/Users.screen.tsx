import { useCallback, useMemo } from 'react';
import { ScrollView, View } from 'react-native';
import { ActivityIndicator, Button, HelperText, Text } from 'react-native-paper';
import Toast from 'react-native-toast-message';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { getApiError } from '@nono-art/api';
import { useIsLoadingFlag } from '@nono-art/hooks';
import { UI } from '@nono-art/ui-mobile';
import { f } from '@nono-art/utils';

import { Divider, ScreenView } from '@/components';
import type { RootStackParamList } from '@/screens';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const UsersScreen: React.FC<Props> = () => {
  // const { userList, error, isLoading, count, refresh } = DAL.user.getVerbose.useGet();

  const userList: ReadonlyArray<unknown> = [];
  const error = null;
  const isLoading = false;
  const count = 1234567;
  const refresh = async () => {};

  const {
    isLoading: refreshIsLoading,
    enableIsLoading: enableRefreshIsLoading,
    disableIsLoading: disableRefreshIsLoading,
  } = useIsLoadingFlag(false);

  const refreshHandler = useCallback(async () => {
    enableRefreshIsLoading();
    try {
      await refresh();
    } catch (error) {
      const m = getApiError(error);
      Toast.show({
        type: 'error',
        text1: m.message,
      });
    } finally {
      disableRefreshIsLoading();
    }
  }, [disableRefreshIsLoading, enableRefreshIsLoading]);

  const totalIsLoading = useMemo(() => isLoading || refreshIsLoading, [isLoading, refreshIsLoading]);

  /* --------------------------------- RETURN --------------------------------- */

  return (
    <ScreenView>
      <View
        style={{
          width: '100%',
          gap: 7,
        }}
      >
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}
        >
          <View style={{ alignItems: 'center' }}>
            <Text>{totalIsLoading ? <ActivityIndicator size={8} animating /> : f.number(count)}</Text>

            <Text style={{ color: UI.color.grey }}>{f.declOfNumDictionary['пользователь'](count)}</Text>
          </View>

          <Button
            onPress={refreshHandler}
            loading={isLoading}
            disabled={isLoading}
            rippleColor={UI.color.black300}
            mode="outlined"
            icon="refresh"
            compact
          >
            Обновить
          </Button>
        </View>

        <Divider margin={0} />
      </View>

      {!totalIsLoading && !userList && !!error && <HelperText type="error">{error}</HelperText>}

      {totalIsLoading && <ActivityIndicator size="large" animating style={{ flexGrow: !!userList ? 0 : 1 }} />}

      {!!userList && (
        <ScrollView style={{ width: '100%' }}>
          <Text>{JSON.stringify(userList, null, 4)}</Text>
        </ScrollView>
      )}
    </ScreenView>
  );
};

/* -------------------------------------------------------------------------- */
/*                                 / COMPONENT                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

interface Props extends NativeStackScreenProps<RootStackParamList, 'Users'> {}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
