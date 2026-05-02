import Color from 'color';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { ActivityIndicator, Divider, IconButton, List, ProgressBar, Text } from 'react-native-paper';

import AsyncStorage from '@react-native-async-storage/async-storage';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useIsLoadingFlag } from '@nono-art/hooks';
import { UI } from '@nono-art/ui-mobile';
import { f } from '@nono-art/utils';

import { ScreenView } from '@/components';
import type { RootStackParamList } from '@/screens/routes';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const AsyncStorageScreen: React.FC<Props> = () => {
  /* -------------------------------- isLoading ------------------------------- */

  const { isLoading, enableIsLoading, disableIsLoading } = useIsLoadingFlag(false);

  /* ------------------------------- / isLoading ------------------------------ */

  /* ---------------------------------- data ---------------------------------- */

  const [rawData, setRawData] = useState<Record<string, number | null>>({});

  const refresh = useCallback(async () => {
    enableIsLoading();
    setRawData({});

    const keyList = await AsyncStorage.getAllKeys();

    for await (const key of keyList) {
      const data = await AsyncStorage.getItem(key);
      setRawData((p) => ({ ...p, [key]: data?.length ?? null }));
    }

    disableIsLoading();
  }, [enableIsLoading, disableIsLoading]);

  const data = useMemo(() => Object.entries(rawData).map(([key, data]) => ({ key, data })), [rawData]);

  /* --------------------------------- / data --------------------------------- */

  useEffect(() => {
    refresh();
  }, [refresh]);

  /* --------------------------------- RETURN --------------------------------- */

  return (
    <ScreenView>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}
      >
        <View style={{ alignItems: 'center' }}>
          <Text>
            {data.length} {f.declOfNumDictionary['пара'](data.length)}
          </Text>

          <Text style={{ color: UI.color.grey }}>ключ-значение</Text>
        </View>

        <IconButton onPress={refresh} icon="refresh" mode="contained" loading={isLoading} disabled={isLoading} />
      </View>

      <Divider />

      <ScrollView style={{ width: '100%' }}>
        <List.Section>
          {data.map(({ key, data }) => (
            <List.Item
              key={key}
              title={key}
              description={
                <View>
                  <Text style={{ color: UI.color.grey }}>
                    {data !== null
                      ? `${f.number(data)} ${f.declOfNum(data, ['символ', 'символа', 'символов'])}`
                      : 'null'}
                  </Text>
                </View>
              }
              right={({ color }) => (
                <View>
                  <View style={{ flexDirection: 'row' }}>
                    {data !== null && (
                      <>
                        <Text>{(data / 1024 / 1024).toFixed(5) + ' '}</Text>

                        <Text style={{ color }}>mb</Text>
                      </>
                    )}
                  </View>

                  <ProgressBar
                    progress={(data || 1) / 1024 / 1024 / 2}
                    color={Color(UI.color.primary)
                      .mix(Color(UI.color.redA700), (data || 1) / 1024 / 1024 / 2)
                      .string()}
                  />
                </View>
              )}
            />
          ))}
        </List.Section>

        {isLoading && <ActivityIndicator animating />}
      </ScrollView>
    </ScreenView>
  );
};

/* -------------------------------------------------------------------------- */
/*                                 / COMPONENT                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

interface Props extends NativeStackScreenProps<RootStackParamList, 'AsyncStorage'> {}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
