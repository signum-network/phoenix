import { SuggestedFees } from '@burstjs/core';
import { convertNQTStringToNumber } from '@burstjs/util';
import Slider from '@react-native-community/slider';
import React from 'react';
import { Colors } from '../../../../core/theme/colors';
import { amountToString } from '../../../../core/utils/numbers';

interface Props {
  onSlidingComplete: (value: number) => void;
  suggestedFees: SuggestedFees;
  fee: number;
}

const styles: any = {
  slider: {
    width: '100%',
    height: 40
  }
};

export class FeeSlider extends React.PureComponent<Props> {

  getMinTrackTintColor = (value: number) => {
    if (value < convertNQTStringToNumber(this.props.suggestedFees.standard.toString())) {
      return Colors.ORANGE;
    }
    if (value < convertNQTStringToNumber(this.props.suggestedFees.priority.toString())) {
      return Colors.YELLOW;
    }
    return Colors.GREEN;
  }

  render () {
    return (
      <Slider
        value={this.props.fee}
        style={styles.slider}
        minimumValue={convertNQTStringToNumber(this.props.suggestedFees.minimum.toString())}
        maximumValue={convertNQTStringToNumber(this.props.suggestedFees.priority.toString())}
        onSlidingComplete={this.props.onSlidingComplete}
        minimumTrackTintColor={this.getMinTrackTintColor(this.props.fee)}
        maximumTrackTintColor={Colors.GREY_DARK}
      />
    );
  }
}
