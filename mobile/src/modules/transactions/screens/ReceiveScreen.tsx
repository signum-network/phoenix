import { Account } from '@burstjs/core';
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { HeaderTitle } from '../../../core/components/header/HeaderTitle';
import { i18n } from '../../../core/i18n';
import { InjectedReduxProps } from '../../../core/interfaces';
import { FullHeightView } from '../../../core/layout/FullHeightView';
import { Screen } from '../../../core/layout/Screen';
import { routes } from '../../../core/navigation/routes';
import { AppReduxState } from '../../../core/store/app/reducer';
import { ApplicationState } from '../../../core/store/initialState';
import { EnterPasscodeModal } from '../../auth/components/passcode/EnterPasscodeModal';
import { AuthReduxState } from '../../auth/store/reducer';
import { NetworkReduxState } from '../../network/store/reducer';
import { ReceiveAmountForm } from '../components/receive/ReceiveAmountForm';
import { ReceiveAmountPayload } from '../store/actions';
import { transactions } from '../translations';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../auth/navigation/mainStack';

type ReceiveNavProps = StackNavigationProp<RootStackParamList, 'Receive'>;

interface Props extends InjectedReduxProps {
  app: AppReduxState;
  auth: AuthReduxState;
  network: NetworkReduxState;
  navigation: ReceiveNavProps;
}

interface State {
  isPINModalVisible: boolean;
}

class Receive extends React.PureComponent<Props, State> {
  state = {
    isPINModalVisible: false
  };

  handleSubmit = (form: ReceiveAmountPayload) => {
    this.props.navigation.navigate(routes.viewQRCode, { form });
  }

  handlePINEntered = () => {
    this.setState({
      isPINModalVisible: false
    });
  }

  handlePINCancel = () => {
    this.setState({
      isPINModalVisible: false
    });
  }

  render () {
    const accounts: Account[] = this.props.auth.accounts || [];
    const { suggestedFees } = this.props.network;

    return (
      <Screen>
        <FullHeightView>
          <HeaderTitle>{i18n.t(transactions.screens.receive.title)}</HeaderTitle>
          <View>
            <ReceiveAmountForm
              accounts={accounts}
              onSubmit={this.handleSubmit}
              suggestedFees={suggestedFees}
            />
          </View>
          <EnterPasscodeModal
            visible={this.state.isPINModalVisible}
            onSuccess={this.handlePINEntered}
            onCancel={this.handlePINCancel}
          />
        </FullHeightView>
      </Screen>
    );
  }
}

function mapStateToProps (state: ApplicationState) {
  return {
    app: state.app,
    auth: state.auth,
    transactions: state.transactions,
    network: state.network
  };
}

export const ReceiveScreen = connect(mapStateToProps)(Receive);
