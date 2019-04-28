import React from 'react';
import { Button, View } from 'react-native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { Input, KeyboardTypes } from '../../../core/components/base/Input';
import { HeaderTitle } from '../../../core/components/header/HeaderTitle';
import { i18n } from '../../../core/i18n';
import { InjectedReduxProps } from '../../../core/interfaces';
import { FullHeightView } from '../../../core/layout/FullHeightView';
import { Screen } from '../../../core/layout/Screen';
import { ApplicationState } from '../../../core/store/initialState';
import { core } from '../../../core/translations';
import { AuthReduxState } from '../store/reducer';

interface IProps extends InjectedReduxProps {
  auth: AuthReduxState;
}

interface SendBurstFormState {
  recipientAddress: string;
  amountNQT: string;
  feeNQT: string;
  showMessage: boolean;
  advanced: boolean;
  message: string;
  encrypt: boolean;
  deadline: string;
  pin: string;
}

type Props = IProps & NavigationInjectedProps;

class Send extends React.PureComponent<Props> {
  static navigationOptions = {
    headerTitle: <HeaderTitle>{i18n.t(core.screens.send.title)}</HeaderTitle>
  };

  state: SendBurstFormState = {
    recipientAddress: '',
    amountNQT: '0',
    feeNQT: '0',
    showMessage: false,
    advanced: false,
    message: '',
    encrypt: true,
    deadline: '24',
    pin: ''
  };

  private handleSubmit = () => {
    // console.log(this.state.recipientAddress, this.state.amountNQT, this.state.feeNQT);
  }
  private handleInputChange (key: keyof SendBurstFormState): ((text: string) => void) {
    return (text) => this.setState({ [key]: text });
  }
  private handleBurstInputChange (): ((text: string) => void) {
    return (text) => this.setState({ recipientAddress: text });
  }

  render () {
    return (
      <Screen>
        <FullHeightView>
          <View>
            <Input
              keyboardType={KeyboardTypes.EMAIL}
              placeholder='BURST-____-____-____-_____'
              onChangeText={this.handleBurstInputChange()}
              value={this.state.recipientAddress}
            />
            <Input
              keyboardType={KeyboardTypes.NUMERIC}
              placeholder={i18n.t(core.screens.send.amountNQT)}
              onChangeText={this.handleInputChange('amountNQT')}
              value={this.state.amountNQT}
            />
            <Input
              keyboardType={KeyboardTypes.NUMERIC}
              placeholder={i18n.t(core.screens.send.feeNQT)}
              onChangeText={this.handleInputChange('feeNQT')}
              value={this.state.feeNQT}
            />
            <Button
              title={i18n.t(core.actions.submit)}
              onPress={this.handleSubmit}
            />

          </View>
        </FullHeightView>
      </Screen>
    );
  }
}

function mapStateToProps (state: ApplicationState) {
  return {
    auth: state.auth
  };
}

export const SendScreen = connect(mapStateToProps)(withNavigation(Send));
