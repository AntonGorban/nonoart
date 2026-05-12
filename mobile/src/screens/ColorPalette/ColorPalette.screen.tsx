import { View } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { UI } from '@nono-art/ui-mobile';

import { ScreenView } from '@/components';
import { useSetAppHeader } from '@/hooks';

import type { RootStackParamList } from '../routes';

import { ColorBox, LabelBox } from './components';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

// TODO: refactor
export const ColorPaletteScreen: React.FC<Props> = () => {
  useSetAppHeader({
    title: 'Палитра цветов',
    icon: <MaterialCommunityIcons name="palette" size={20} color={UI.color.white} />,
    actionList: null,
  });

  return (
    <ScreenView padding={0} gap={0}>
      <View style={{ flexGrow: 1, flex: 1, flexDirection: 'row' }}>
        <LabelBox label="black" />
        <ColorBox colorCode="black100" />
        <ColorBox colorCode="black300" />
        <ColorBox colorCode="black500" />
        <ColorBox colorCode="black700" />
        <ColorBox colorCode="black900" />
        <ColorBox colorCode="black999" />
        <ColorBox colorCode="white" viewFullColorCode />
        <ColorBox colorCode="white1" viewFullColorCode />
        <ColorBox colorCode="primary" viewFullColorCode />
        <ColorBox colorCode="secondary" viewFullColorCode />
        <ColorBox colorCode="grey" viewFullColorCode />
        <ColorBox colorCode="greyWhite" viewFullColorCode />
        <ColorBox colorCode="greyBlack" viewFullColorCode />
      </View>

      <View style={{ flexGrow: 1, flex: 1, flexDirection: 'row' }}>
        <LabelBox label="red" />
        <ColorBox colorCode="red100" />
        <ColorBox colorCode="red200" />
        <ColorBox colorCode="red300" />
        <ColorBox colorCode="red400" />
        <ColorBox colorCode="red500" />
        <ColorBox colorCode="red600" />
        <ColorBox colorCode="red700" />
        <ColorBox colorCode="red800" />
        <ColorBox colorCode="red900" />
        <ColorBox colorCode="redA100" />
        <ColorBox colorCode="redA200" />
        <ColorBox colorCode="redA400" />
        <ColorBox colorCode="redA700" />
      </View>

      <View style={{ flexGrow: 1, flex: 1, flexDirection: 'row' }}>
        <LabelBox label="pink" />
        <ColorBox colorCode="pink100" />
        <ColorBox colorCode="pink200" />
        <ColorBox colorCode="pink300" />
        <ColorBox colorCode="pink400" />
        <ColorBox colorCode="pink500" />
        <ColorBox colorCode="pink600" />
        <ColorBox colorCode="pink700" />
        <ColorBox colorCode="pink800" />
        <ColorBox colorCode="pink900" />
        <ColorBox colorCode="pinkA100" />
        <ColorBox colorCode="pinkA200" />
        <ColorBox colorCode="pinkA400" />
        <ColorBox colorCode="pinkA700" />
      </View>

      <View style={{ flexGrow: 1, flex: 1, flexDirection: 'row' }}>
        <LabelBox label="purple" />
        <ColorBox colorCode="purple100" />
        <ColorBox colorCode="purple200" />
        <ColorBox colorCode="purple300" />
        <ColorBox colorCode="purple400" />
        <ColorBox colorCode="purple500" />
        <ColorBox colorCode="purple600" />
        <ColorBox colorCode="purple700" />
        <ColorBox colorCode="purple800" />
        <ColorBox colorCode="purple900" />
        <ColorBox colorCode="purpleA100" />
        <ColorBox colorCode="purpleA200" />
        <ColorBox colorCode="purpleA400" />
        <ColorBox colorCode="purpleA700" />
      </View>

      <View style={{ flexGrow: 1, flex: 1, flexDirection: 'row' }}>
        <LabelBox label="deepPurple" />
        <ColorBox colorCode="deepPurple100" />
        <ColorBox colorCode="deepPurple200" />
        <ColorBox colorCode="deepPurple300" />
        <ColorBox colorCode="deepPurple400" />
        <ColorBox colorCode="deepPurple500" />
        <ColorBox colorCode="deepPurple600" />
        <ColorBox colorCode="deepPurple700" />
        <ColorBox colorCode="deepPurple800" />
        <ColorBox colorCode="deepPurple900" />
        <ColorBox colorCode="deepPurpleA100" />
        <ColorBox colorCode="deepPurpleA200" />
        <ColorBox colorCode="deepPurpleA400" />
        <ColorBox colorCode="deepPurpleA700" />
      </View>

      <View style={{ flexGrow: 1, flex: 1, flexDirection: 'row' }}>
        <LabelBox label="indigo" />
        <ColorBox colorCode="indigo100" />
        <ColorBox colorCode="indigo200" />
        <ColorBox colorCode="indigo300" />
        <ColorBox colorCode="indigo400" />
        <ColorBox colorCode="indigo500" />
        <ColorBox colorCode="indigo600" />
        <ColorBox colorCode="indigo700" />
        <ColorBox colorCode="indigo800" />
        <ColorBox colorCode="indigo900" />
        <ColorBox colorCode="indigoA100" />
        <ColorBox colorCode="indigoA200" />
        <ColorBox colorCode="indigoA400" />
        <ColorBox colorCode="indigoA700" />
      </View>

      <View style={{ flexGrow: 1, flex: 1, flexDirection: 'row' }}>
        <LabelBox label="blue" />
        <ColorBox colorCode="blue100" />
        <ColorBox colorCode="blue200" />
        <ColorBox colorCode="blue300" />
        <ColorBox colorCode="blue400" />
        <ColorBox colorCode="blue500" />
        <ColorBox colorCode="blue600" />
        <ColorBox colorCode="blue700" />
        <ColorBox colorCode="blue800" />
        <ColorBox colorCode="blue900" />
        <ColorBox colorCode="blueA100" />
        <ColorBox colorCode="blueA200" />
        <ColorBox colorCode="blueA400" />
        <ColorBox colorCode="blueA700" />
      </View>

      <View style={{ flexGrow: 1, flex: 1, flexDirection: 'row' }}>
        <LabelBox label="lightBlue" />
        <ColorBox colorCode="lightBlue100" />
        <ColorBox colorCode="lightBlue200" />
        <ColorBox colorCode="lightBlue300" />
        <ColorBox colorCode="lightBlue400" />
        <ColorBox colorCode="lightBlue500" />
        <ColorBox colorCode="lightBlue600" />
        <ColorBox colorCode="lightBlue700" />
        <ColorBox colorCode="lightBlue800" />
        <ColorBox colorCode="lightBlue900" />
        <ColorBox colorCode="lightBlueA100" />
        <ColorBox colorCode="lightBlueA200" />
        <ColorBox colorCode="lightBlueA400" />
        <ColorBox colorCode="lightBlueA700" />
      </View>

      <View style={{ flexGrow: 1, flex: 1, flexDirection: 'row' }}>
        <LabelBox label="cyan" />
        <ColorBox colorCode="cyan100" />
        <ColorBox colorCode="cyan200" />
        <ColorBox colorCode="cyan300" />
        <ColorBox colorCode="cyan400" />
        <ColorBox colorCode="cyan500" />
        <ColorBox colorCode="cyan600" />
        <ColorBox colorCode="cyan700" />
        <ColorBox colorCode="cyan800" />
        <ColorBox colorCode="cyan900" />
        <ColorBox colorCode="cyanA100" />
        <ColorBox colorCode="cyanA200" />
        <ColorBox colorCode="cyanA400" />
        <ColorBox colorCode="cyanA700" />
      </View>

      <View style={{ flexGrow: 1, flex: 1, flexDirection: 'row' }}>
        <LabelBox label="teal" />
        <ColorBox colorCode="teal100" />
        <ColorBox colorCode="teal200" />
        <ColorBox colorCode="teal300" />
        <ColorBox colorCode="teal400" />
        <ColorBox colorCode="teal500" />
        <ColorBox colorCode="teal600" />
        <ColorBox colorCode="teal700" />
        <ColorBox colorCode="teal800" />
        <ColorBox colorCode="teal900" />
        <ColorBox colorCode="tealA100" />
        <ColorBox colorCode="tealA200" />
        <ColorBox colorCode="tealA400" />
        <ColorBox colorCode="tealA700" />
      </View>

      <View style={{ flexGrow: 1, flex: 1, flexDirection: 'row' }}>
        <LabelBox label="green" />
        <ColorBox colorCode="green100" />
        <ColorBox colorCode="green200" />
        <ColorBox colorCode="green300" />
        <ColorBox colorCode="green400" />
        <ColorBox colorCode="green500" />
        <ColorBox colorCode="green600" />
        <ColorBox colorCode="green700" />
        <ColorBox colorCode="green800" />
        <ColorBox colorCode="green900" />
        <ColorBox colorCode="greenA100" />
        <ColorBox colorCode="greenA200" />
        <ColorBox colorCode="greenA400" />
        <ColorBox colorCode="greenA700" />
      </View>

      <View style={{ flexGrow: 1, flex: 1, flexDirection: 'row' }}>
        <LabelBox label="lightGreen" />
        <ColorBox colorCode="lightGreen100" />
        <ColorBox colorCode="lightGreen200" />
        <ColorBox colorCode="lightGreen300" />
        <ColorBox colorCode="lightGreen400" />
        <ColorBox colorCode="lightGreen500" />
        <ColorBox colorCode="lightGreen600" />
        <ColorBox colorCode="lightGreen700" />
        <ColorBox colorCode="lightGreen800" />
        <ColorBox colorCode="lightGreen900" />
        <ColorBox colorCode="lightGreenA100" />
        <ColorBox colorCode="lightGreenA200" />
        <ColorBox colorCode="lightGreenA400" />
        <ColorBox colorCode="lightGreenA700" />
      </View>

      <View style={{ flexGrow: 1, flex: 1, flexDirection: 'row' }}>
        <LabelBox label="lime" />
        <ColorBox colorCode="lime100" />
        <ColorBox colorCode="lime200" />
        <ColorBox colorCode="lime300" />
        <ColorBox colorCode="lime400" />
        <ColorBox colorCode="lime500" />
        <ColorBox colorCode="lime600" />
        <ColorBox colorCode="lime700" />
        <ColorBox colorCode="lime800" />
        <ColorBox colorCode="lime900" />
        <ColorBox colorCode="limeA100" />
        <ColorBox colorCode="limeA200" />
        <ColorBox colorCode="limeA400" />
        <ColorBox colorCode="limeA700" />
      </View>

      <View style={{ flexGrow: 1, flex: 1, flexDirection: 'row' }}>
        <LabelBox label="yellow" />
        <ColorBox colorCode="yellow100" />
        <ColorBox colorCode="yellow200" />
        <ColorBox colorCode="yellow300" />
        <ColorBox colorCode="yellow400" />
        <ColorBox colorCode="yellow500" />
        <ColorBox colorCode="yellow600" />
        <ColorBox colorCode="yellow700" />
        <ColorBox colorCode="yellow800" />
        <ColorBox colorCode="yellow900" />
        <ColorBox colorCode="yellowA100" />
        <ColorBox colorCode="yellowA200" />
        <ColorBox colorCode="yellowA400" />
        <ColorBox colorCode="yellowA700" />
      </View>

      <View style={{ flexGrow: 1, flex: 1, flexDirection: 'row' }}>
        <LabelBox label="amber" />
        <ColorBox colorCode="amber100" />
        <ColorBox colorCode="amber200" />
        <ColorBox colorCode="amber300" />
        <ColorBox colorCode="amber400" />
        <ColorBox colorCode="amber500" />
        <ColorBox colorCode="amber600" />
        <ColorBox colorCode="amber700" />
        <ColorBox colorCode="amber800" />
        <ColorBox colorCode="amber900" />
        <ColorBox colorCode="amberA100" />
        <ColorBox colorCode="amberA200" />
        <ColorBox colorCode="amberA400" />
        <ColorBox colorCode="amberA700" />
      </View>

      <View style={{ flexGrow: 1, flex: 1, flexDirection: 'row' }}>
        <LabelBox label="orange" />
        <ColorBox colorCode="orange100" />
        <ColorBox colorCode="orange200" />
        <ColorBox colorCode="orange300" />
        <ColorBox colorCode="orange400" />
        <ColorBox colorCode="orange500" />
        <ColorBox colorCode="orange600" />
        <ColorBox colorCode="orange700" />
        <ColorBox colorCode="orange800" />
        <ColorBox colorCode="orange900" />
        <ColorBox colorCode="orangeA100" />
        <ColorBox colorCode="orangeA200" />
        <ColorBox colorCode="orangeA400" />
        <ColorBox colorCode="orangeA700" />
      </View>

      <View style={{ flexGrow: 1, flex: 1, flexDirection: 'row' }}>
        <LabelBox label="deepOrange" />
        <ColorBox colorCode="deepOrange100" />
        <ColorBox colorCode="deepOrange200" />
        <ColorBox colorCode="deepOrange300" />
        <ColorBox colorCode="deepOrange400" />
        <ColorBox colorCode="deepOrange500" />
        <ColorBox colorCode="deepOrange600" />
        <ColorBox colorCode="deepOrange700" />
        <ColorBox colorCode="deepOrange800" />
        <ColorBox colorCode="deepOrange900" />
        <ColorBox colorCode="deepOrangeA100" />
        <ColorBox colorCode="deepOrangeA200" />
        <ColorBox colorCode="deepOrangeA400" />
        <ColorBox colorCode="deepOrangeA700" />
      </View>

      <View style={{ flexGrow: 1, flex: 1, flexDirection: 'row' }}>
        <LabelBox label="brown" />
        <ColorBox colorCode="brown100" />
        <ColorBox colorCode="brown200" />
        <ColorBox colorCode="brown300" />
        <ColorBox colorCode="brown400" />
        <ColorBox colorCode="brown500" />
        <ColorBox colorCode="brown600" />
        <ColorBox colorCode="brown700" />
        <ColorBox colorCode="brown800" />
        <ColorBox colorCode="brown900" />
        <ColorBox colorCode="brownA100" />
        <ColorBox colorCode="brownA200" />
        <ColorBox colorCode="brownA400" />
        <ColorBox colorCode="brownA700" />
      </View>

      <View style={{ flexGrow: 1, flex: 1, flexDirection: 'row' }}>
        <LabelBox label="grey" />
        <ColorBox colorCode="grey100" />
        <ColorBox colorCode="grey200" />
        <ColorBox colorCode="grey300" />
        <ColorBox colorCode="grey400" />
        <ColorBox colorCode="grey500" />
        <ColorBox colorCode="grey600" />
        <ColorBox colorCode="grey700" />
        <ColorBox colorCode="grey800" />
        <ColorBox colorCode="grey900" />
        <ColorBox colorCode="greyA100" />
        <ColorBox colorCode="greyA200" />
        <ColorBox colorCode="greyA400" />
        <ColorBox colorCode="greyA700" />
      </View>

      <View style={{ flexGrow: 1, flex: 1, flexDirection: 'row' }}>
        <LabelBox label="blueGrey" />
        <ColorBox colorCode="blueGrey100" />
        <ColorBox colorCode="blueGrey200" />
        <ColorBox colorCode="blueGrey300" />
        <ColorBox colorCode="blueGrey400" />
        <ColorBox colorCode="blueGrey500" />
        <ColorBox colorCode="blueGrey600" />
        <ColorBox colorCode="blueGrey700" />
        <ColorBox colorCode="blueGrey800" />
        <ColorBox colorCode="blueGrey900" />
        <ColorBox colorCode="blueGreyA100" />
        <ColorBox colorCode="blueGreyA200" />
        <ColorBox colorCode="blueGreyA400" />
        <ColorBox colorCode="blueGreyA700" />
      </View>
    </ScreenView>
  );
};

/* -------------------------------------------------------------------------- */
/*                                 / COMPONENT                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

interface Props extends NativeStackScreenProps<RootStackParamList, 'ColorPalette'> {}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
