import React from 'react';
import { View } from 'react-native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { Text, TextThemes } from '../../../core/components/base/Text';
import { HeaderTitle } from '../../../core/components/header/HeaderTitle';
import { i18n } from '../../../core/i18n';
import { InjectedReduxProps } from '../../../core/interfaces';
import { FullHeightView } from '../../../core/layout/FullHeightView';
import { Screen } from '../../../core/layout/Screen';
import { AppReduxState } from '../../../core/store/app/reducer';
import { ApplicationState } from '../../../core/store/initialState';
import { isAsyncLoading } from '../../../core/utils/async';
import { EnterPasscodeModal } from '../../auth/components/passcode/EnterPasscodeModal';
import { AuthReduxState } from '../../auth/store/reducer';
import { shouldEnterPIN } from '../../auth/store/utils';
import { SendBurstForm } from '../components/send/SendBurstForm';
import { sendMoney, SendMoneyPayload } from '../store/actions';
import { TransactionsReduxState } from '../store/reducer';
import { transactions } from '../translations';

interface IProps extends InjectedReduxProps {
  app: AppReduxState;
  auth: AuthReduxState;
  transactions: TransactionsReduxState
}

type Props = IProps & NavigationInjectedProps;

interface State {
  isPINModalVisible: boolean;
}

class Send extends React.PureComponent<Props, State> {
  static navigationOptions = {
    headerTitle: <HeaderTitle>{i18n.t(transactions.screens.send.title)}</HeaderTitle>
  };

  state = {
    isPINModalVisible: false
  };

  handleSubmit = (form: SendMoneyPayload) => {
    const { passcodeEnteredTime } = this.props.auth;
    const { passcodeTime } = this.props.app.appSettings;

    if (shouldEnterPIN(passcodeTime, passcodeEnteredTime)) {
      this.setState({
        isPINModalVisible: true
      });
    } else {
      this.props.dispatch(sendMoney(form));
    }
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
    const { data, error } = this.props.transactions.sendMoney;
    const isLoading = isAsyncLoading(this.props.transactions.sendMoney);

    return (
      <Screen>
        <FullHeightView>
          <View>
            <SendBurstForm loading={isLoading} onSubmit={this.handleSubmit}/>
            {data && <Text theme={TextThemes.ACCENT}>{i18n.t(transactions.screens.send.sent)}</Text>}
            {error && <Text theme={TextThemes.DANGER}>{error.message}</Text>}
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

export const SendScreen = connect(mapStateToProps)(withNavigation(Send));
