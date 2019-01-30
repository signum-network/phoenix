import { isString } from 'lodash';
import React from 'react';
import { StyleSheet, Switch, View } from 'react-native';
import { SpacingProps } from '../../interfaces';
import { ESpaces } from '../../theme/sizes';
import { Text } from './Text';

interface IProps {
  text: string | JSX.Element;
  value: boolean;
  onChange: (newValue: boolean) => void;
  disabled?: boolean;
}

type Props = IProps & SpacingProps;

const defaultMarginBottom = ESpaces.s;

export class SwitchItem extends React.PureComponent<Props> {
  getStyles = () => {
    const {
      marginTop,
      marginRight,
      marginBottom = defaultMarginBottom,
      marginLeft,
      marginHor,
      marginVert,
      margin,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
      paddingHor,
      paddingVert,
      padding
    } = this.props;

    return StyleSheet.create({
      mainView: {
        flexDirection: 'row',
        padding,
        marginHorizontal: marginHor,
        marginVertical: marginVert,
        margin,
        marginTop,
        marginRight,
        marginBottom,
        marginLeft,
        paddingHorizontal: paddingHor,
        paddingVertical: paddingVert,
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft
      },
      textView: {
        flex: 1,
        paddingRight: ESpaces.m,
        alignSelf: 'center'
      },
      switchView: {
        alignSelf: 'center',
        alignItems: 'flex-end'
      }
    });
  }

  handleSwitchChange = (newValue: boolean) => {
    const { disabled, onChange } = this.props;

    if (!disabled) {
      onChange(newValue);
    }
  }

  renderText = () => {
    const { text } = this.props;

    return isString(text) ? <Text>{text}</Text> : text;
  }

  renderSwitch = () => {
    const { value, disabled } = this.props;

    return (
      <Switch onValueChange={this.handleSwitchChange} value={value} disabled={disabled} />
    );
  }

  render () {
    const styles = this.getStyles();
    return (
      <View style={styles.mainView}>
        <View style={styles.textView}>
          {this.renderText()}
        </View>
        <View style={styles.switchView}>
          {this.renderSwitch()}
        </View>
      </View>
    );
  }
}
