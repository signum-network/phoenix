import { isString } from 'lodash';
import React from 'react';
import {
  StyleSheet,
  Switch,
  TouchableOpacity,
  View
} from 'react-native';
import { Sizes } from '../../theme/sizes';
import { Text } from './Text';
import { Colors } from '../../theme/colors';

interface IProps {
  text: string | JSX.Element;
  value: boolean;
  onChange: (newValue: boolean) => void;
  disabled?: boolean;
  labelColor?: any;
}

type Props = IProps;

const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row'
  },
  textView: {
    flex: 1,
    paddingRight: Sizes.MEDIUM,
    alignSelf: 'center'
  },
  switchView: {
    alignSelf: 'center',
    alignItems: 'flex-end'
  }
});

export const SwitchItem: React.FunctionComponent<Props> = (props) => {
  const { text, disabled, onChange, value, labelColor = Colors.BLACK } = props;

  const handleSwitchChange = () => {
    if (!disabled) {
      onChange(!value);
    }
  };

  return (
    <TouchableOpacity activeOpacity={1} onPress={handleSwitchChange} style={styles.mainView}>
      <View style={[styles.textView]}>
        {isString(text) ? <Text color={labelColor}>{text}</Text> : text}
      </View>
      <View style={styles.switchView}>
        <Switch
          onValueChange={handleSwitchChange}
          trackColor={{true: Colors.GREEN, false: Colors.BLUE_DARKEST}}
          value={value}
          disabled={disabled}
        />
      </View>
    </TouchableOpacity>
  );
};
