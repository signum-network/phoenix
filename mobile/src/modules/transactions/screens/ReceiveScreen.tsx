import { Account } from '@burstjs/core';
import React from 'react';
import { View } from 'react-native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
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
import { generateQRAddress, ReceiveBurstPayload, sendMoney, SendMoneyPayload } from '../store/actions';
import { actionTypes } from '../store/actionTypes';
import { transactions } from '../translations';
import { ReceiveBurstForm } from '../components/receive/ReceiveBurstForm';

interface IProps extends InjectedReduxProps {
  app: AppReduxState;
  auth: AuthReduxState;
}

type Props = IProps & NavigationInjectedProps;

interface State {
  isPINModalVisible: boolean;
}

class Receive extends React.PureComponent<Props, State> {
  static navigationOptions = {
    headerTitle: <HeaderTitle>{i18n.t(transactions.screens.receive.title)}</HeaderTitle>
  };

  state = {
    isPINModalVisible: false
  };

  handleSubmit = (form: ReceiveBurstPayload) => {
    this.props.dispatch(generateQRAddress(form));
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

    return (
      <Screen>
        <FullHeightView>
          <View>
            <ReceiveBurstForm
              accounts={accounts}
              onSubmit={this.handleSubmit}
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
    transactions: state.transactions
  };
}

export const ReceiveScreen = connect(mapStateToProps)(withNavigation(Receive));
