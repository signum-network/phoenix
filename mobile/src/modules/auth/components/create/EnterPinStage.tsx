import React from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import { Text, TextThemes } from '../../../../core/components/base/Text';
import { i18n } from '../../../../core/i18n';
import { flexGrowStyle } from '../../../../core/utils/styles';
import { PIN_LENGTH } from '../../consts';
import { auth } from '../../translations';
import { SimplePinInput } from '../SimplePinInput';

interface Props {
  onFinish: (pin: string) => void;
}

interface State {
  pin: string;
}

export class EnterPinStage extends React.PureComponent<Props, State> {
  state: State = {
    pin: ''
  };

  handlePinChange = (pin: string) => {
    this.setState({ pin });
    if (pin.length === PIN_LENGTH) {
      this.props.onFinish(pin);
    }
  }

  render () {
    return (
      <React.Fragment>
        <View style={flexGrowStyle}>
          <Text theme={TextThemes.HEADER}>{i18n.t(auth.createAccount.enterPin)}</Text>
        </View>
        <KeyboardAvoidingView behavior={'padding'} keyboardVerticalOffset={100}>
          <SimplePinInput value={this.state.pin} onChange={this.handlePinChange}/>
          <Text theme={TextThemes.HINT}>{i18n.t(auth.createAccount.enterPinHint)}</Text>
        </KeyboardAvoidingView>
      </React.Fragment>
    );
  }
}
