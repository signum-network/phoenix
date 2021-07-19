import { SuggestedFees } from '@signumjs/core';
import { Amount } from '@signumjs/util';
import Slider from '@react-native-community/slider';
import React from 'react';
import { Colors } from '../../../../core/theme/colors';

interface Props {
  onSlidingComplete: (value: number) => void;
  suggestedFees: SuggestedFees;
  fee: number;
  disabled?: boolean;
}

const styles: any = {
  slider: {
    width: '100%',
    height: 40
  }
};

export class FeeSlider extends React.PureComponent<Props> {

  getMinTrackTintColor = (value: number) => {
    const currentFee = Amount.fromSigna(value);
    if (currentFee.less(Amount.fromPlanck(this.props.suggestedFees.standard))) {
      return Colors.ORANGE;
    }
    if (currentFee.less(Amount.fromPlanck(this.props.suggestedFees.priority))) {
      return Colors.YELLOW;
    }
    return Colors.GREEN;
  }

  render () {
    return (
      <Slider
        disabled={this.props.disabled}
        value={this.props.fee}
        style={styles.slider}
        minimumValue={Number(Amount.fromPlanck(this.props.suggestedFees.minimum).getSigna())}
        maximumValue={Number(Amount.fromPlanck(this.props.suggestedFees.priority).getSigna())}
        onSlidingComplete={this.props.onSlidingComplete}
        minimumTrackTintColor={this.getMinTrackTintColor(this.props.fee)}
        maximumTrackTintColor={Colors.GREY_DARK}
        thumbTintColor={Colors.WHITE}
      />
    );
  }
}
