import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RoundButton } from './RoundButton';

interface Props {
  onPress: (key: string) => void;
  onDelPress: () => void;
  onTouchID?: () => void;
  touchIDReason?: string;
}

const styles = StyleSheet.create({
  keyboard: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  }
});

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export class NumericKeyboard extends React.PureComponent<Props> {
  handleButtonPress = (value: number) => {
    this.props.onPress(value.toString());
  }

  handleDelPress = () => {
    this.props.onDelPress();
  }

  handleTouchIDPress = () => {
    this.useTouchID();
  }

  useTouchID = () => {
    const { onTouchID } = this.props;

    onTouchID && onTouchID();
  }

  render () {
    const { onTouchID, touchIDReason } = this.props;
    const withTouchID = !!(onTouchID && touchIDReason);

    const baseNumbers = numbers.map((item) => {
      return (
        <RoundButton value={item} onPress={this.handleButtonPress} key={item}>
          {item.toString()}
        </RoundButton>
      );
    });

    // TODO: touchID and back images

    return (
      <View style={styles.keyboard}>
        {baseNumbers}
        <RoundButton onPress={this.handleDelPress}>{'<'}</RoundButton>
        <RoundButton value={0} onPress={this.handleButtonPress}>{'0'}</RoundButton>
        <RoundButton disabled={!withTouchID} onPress={this.handleTouchIDPress}>{'ID'}</RoundButton>
      </View>
    );
  }
}
