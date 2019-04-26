import React from 'react';
import { Button, TextInput, View } from 'react-native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { HeaderTitle } from '../../../core/components/header/HeaderTitle';
import { i18n } from '../../../core/i18n';
import { InjectedReduxProps } from '../../../core/interfaces';
import { FullHeightView } from '../../../core/layout/FullHeightView';
import { Screen } from '../../../core/layout/Screen';
import { ApplicationState } from '../../../core/store/initialState';
import { core } from '../../../core/translations';
import { AuthReduxState } from '../store/reducer';

interface IProps extends InjectedReduxProps {
  auth: AuthReduxState,
}
type Props = IProps & NavigationInjectedProps;

class Send extends React.PureComponent<Props> {
  static navigationOptions = {
    headerTitle: <HeaderTitle>{i18n.t(core.screens.send.title)}</HeaderTitle>
  };

  state = {
    amountNQT: 0,
    feeNQT: 0
  };

  render () {
    return (
      <Screen>
        <FullHeightView>
          <View>
            <TextInput
              style={{ height: 40 }}
              keyboardType='email-address'
              placeholder='BURST-____-____-____-_____'
              textContentType='none'
              onChangeText={this.handleBurstInputChange()}
              autoCorrect={false}
            />
            <TextInput
              style={{ height: 40 }}
              keyboardType='decimal-pad'
              textContentType='none'
              placeholder={i18n.t(core.screens.send.amountNQT)}
              onChangeText={this.handleInputChange('amountNQT')}
              autoCorrect={false}
            />
            <TextInput
              style={{ height: 40 }}
              keyboardType='decimal-pad'
              textContentType='none'
              placeholder={i18n.t(core.screens.send.feeNQT)}
              onChangeText={this.handleInputChange('feeNQT')}
              autoCorrect={false}
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

  private handleSubmit = () => {
    // console.log(this.state.amountNQT, this.state.feeNQT);
  }
  private handleInputChange (key: string): ((text: string) => void) | undefined {
    return (text) => this.setState({ [key]: text });
  }
  private handleBurstInputChange (): ((text: string) => void) | undefined {
    return (text) => this.setState({ text });
  }
}

function mapStateToProps (state: ApplicationState) {
  return {
    auth: state.auth
  };
}

export const SendScreen = connect(mapStateToProps)(withNavigation(Send));
