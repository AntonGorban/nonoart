import React, { type ComponentProps } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import type { D } from '@nono-art/domain';
import { UI } from '@nono-art/ui-mobile';
import { f } from '@nono-art/utils';

import { Level, ScreenView } from '@/components';
import type { MyLevelList, MyLevel as MyLevelType } from '@/store';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const MyLevelsPresentation = React.memo<Props>(({ myLevelList, createMyLevel, navToDesigner, ...props }) => (
  <ScreenView padding={0} style={styles.globalWrap}>
    <View style={styles.headerWrap}>
      <View style={{ alignItems: 'center' }}>
        <Text>{f.number(myLevelList.length)}</Text>

        <Text style={{ color: UI.color.grey }}>{f.declOfNumDictionary['уровень'](myLevelList.length)}</Text>
      </View>

      <Button
        onPress={createMyLevel}
        mode="contained"
        icon="plus-thick"
        rippleColor={UI.color.primary}
        style={styles.headerButton}
        uppercase
      >
        Новый уровень
      </Button>
    </View>

    <UI.Layout.Divider margin={0} />

    <FlatList
      data={myLevelList}
      style={styles.flatList}
      contentContainerStyle={styles.wrap}
      renderItem={({ item: level }) => (
        <Level
          {...props}
          id={level.id}
          name={level.name}
          createdAt={level.createdAt}
          colors={level.colors}
          status={level.status}
          grid={level.grid}
          gridWidth={level.gridWidth}
          gridHeight={level.gridHeight}
          complexity={level.complexity}
          likesCount={level.likesCount}
          dislikesCount={level.dislikesCount}
          showArtIconPlug={false}
          onPress={navToDesigner}
        />
      )}
      keyExtractor={(level) => level.id}
      extraData={props}
    />
  </ScreenView>
));

/* -------------------------------------------------------------------------- */
/*                                 / COMPONENT                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                   STYLES                                   */
/* -------------------------------------------------------------------------- */

const styles = StyleSheet.create({
  globalWrap: { paddingTop: 8 },
  headerWrap: {
    width: '100%',
    paddingHorizontal: 8,
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  headerButton: {},
  flatList: { width: '100%', paddingHorizontal: 8 },
  wrap: { gap: 8, paddingVertical: 8 },
});

/* -------------------------------------------------------------------------- */
/*                                  / STYLES                                  */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

type MyLevelProps = ComponentProps<typeof Level>;

interface Props extends Omit<MyLevelProps, keyof MyLevelType | 'showArtIconPlug' | 'onPress'> {
  readonly myLevelList: MyLevelList;
  readonly createMyLevel: () => void;
  readonly navToDesigner: (id: D.Level.Id) => void;
}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
