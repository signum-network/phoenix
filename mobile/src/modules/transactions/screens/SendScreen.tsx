import { Account, SuggestedFees } from '@burstjs/core';
import { convertNQTStringToNumber } from '@burstjs/util';
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
import { routes } from '../../../core/navigation/routes';
import { AppReduxState } from '../../../core/store/app/reducer';
import { ApplicationState } from '../../../core/store/initialState';
import { isAsyncLoading } from '../../../core/utils/async';
import { EnterPasscodeModal } from '../../auth/components/passcode/EnterPasscodeModal';
import { AuthReduxState } from '../../auth/store/reducer';
import { shouldEnterPIN } from '../../auth/store/utils';
import { NetworkReduxState } from '../../network/store/reducer';
import { SendBurstForm, SendBurstFormState } from '../components/send/SendBurstForm';
import { sendMoney, SendMoneyPayload } from '../store/actions';
import { TransactionsReduxState } from '../store/reducer';
import { parseURLParams } from '../store/utils';
import { transactions } from '../translations';

interface IProps extends InjectedReduxProps {
  app: AppReduxState;
  auth: AuthReduxState;
  transactions: TransactionsReduxState;
  network: NetworkReduxState;
}

type Props = IProps & NavigationInjectedProps;

interface State {
  isPINModalVisible: boolean
}

class Send extends React.PureComponent<Props, State> {

  static navigationOptions = {
    headerTitle: <HeaderTitle>{i18n.t(transactions.screens.send.title)}</HeaderTitle>
  };

  state = {
    isPINModalVisible: false,
    deepLink: false
  };

  deepLinkProps?: SendBurstFormState;

  componentWillMount () {
    const deepLink = this.props.navigation.getParam('url');
    if (deepLink) {
      const params = parseURLParams(deepLink);

      this.deepLinkProps = {
        sender: null,
        address: params.receiver,
        fee: this.getFee(params.feeNQT, params.feeSuggestionType),
        amount: convertNQTStringToNumber(params.amountNQT).toString(),
        message: params.message,
        messageIsText: params.messageIsText === 'false' ? false : true,
        encrypt: params.encrypt,
        immutable: params.immutable === 'false' ? false : true
      };
    }
  }

  getFee (feeNQT: string, feeSuggestionType: string) {
    let fee = convertNQTStringToNumber(feeNQT);
    if (feeSuggestionType && feeSuggestionType !== 'undefined' && this.props.network.suggestedFees) {
      // @ts-ignore
      fee = convertNQTStringToNumber(this.props.network.suggestedFees[feeSuggestionType]);
    }
    return fee.toString();
  }

  handleSubmit = (form: SendMoneyPayload) => {
    const { passcodeEnteredTime } = this.props.auth;
    const { passcodeTime } = this.props.app.appSettings;

    if (shouldEnterPIN(passcodeTime, passcodeEnteredTime)) {
      this.setState({
        isPINModalVisible: true
      });
    } else {
      this.props.dispatch(sendMoney(form));
      this.props.navigation.navigate(routes.home);
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
    const accounts: Account[] = this.props.auth.accounts || [];
    const { data, error } = this.props.transactions.sendMoney;
    const isLoading = isAsyncLoading(this.props.transactions.sendMoney);

    return (
      <Screen>
        <FullHeightView>
          <View>
            <SendBurstForm
              accounts={accounts}
              loading={isLoading}
              onSubmit={this.handleSubmit}
              deepLinkProps={this.deepLinkProps}
              suggestedFees={this.props.network.suggestedFees}
            />
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
    transactions: state.transactions,
    network: state.network
  };
}

export const SendScreen = connect(mapStateToProps)(withNavigation(Send));
