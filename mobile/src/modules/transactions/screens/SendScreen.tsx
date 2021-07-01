import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {Text, TextThemes} from '../../../core/components/base/Text';
import {HeaderTitle} from '../../../core/components/header/HeaderTitle';
import {i18n} from '../../../core/i18n';
import {InjectedReduxProps} from '../../../core/interfaces';
import {FullHeightView} from '../../../core/layout/FullHeightView';
import {Screen} from '../../../core/layout/Screen';
import {routes} from '../../../core/navigation/routes';
import {AppReduxState} from '../../../core/store/app/reducer';
import {ApplicationState} from '../../../core/store/initialState';
import {isAsyncLoading} from '../../../core/utils/async';
import {EnterPasscodeModal} from '../../auth/components/passcode/EnterPasscodeModal';
import {RootStackParamList} from '../../auth/navigation/mainStack';
import {getAccount, getAlias, getZilAddress} from '../../auth/store/actions';
import {AuthReduxState} from '../../auth/store/reducer';
import {shouldEnterPIN} from '../../auth/store/utils';
import {NetworkReduxState} from '../../network/store/reducer';
import {SendBurstForm, SendBurstFormState} from '../components/send/SendBurstForm';
import {sendMoney, SendAmountPayload} from '../store/actions';
import {TransactionsReduxState} from '../store/reducer';
import {parseURLParams} from '../store/utils';
import {transactions} from '../translations';
import {withNavigation} from 'react-navigation';
import {Amount} from '@signumjs/util';
import {Address, Account} from '@signumjs/core';
import {NoActiveAccount} from '../components/send/NoActiveAccount';

type SendNavProp = StackNavigationProp<RootStackParamList, 'send'>;
type SendRouteProp = RouteProp<RootStackParamList, 'send'>;

interface IProps extends InjectedReduxProps {
    app: AppReduxState;
    auth: AuthReduxState;
    transactions: TransactionsReduxState;
    network: NetworkReduxState;
    navigation: SendNavProp;
    route: SendRouteProp;
}

interface State {
    isPINModalVisible: boolean;
    deepLinkProps?: SendBurstFormState;
}

class Send extends React.PureComponent<IProps, State> {

    state = {
        isPINModalVisible: false,
        deepLinkProps: undefined
    };

    constructor(props) {
        super(props);
        this.props.navigation.addListener('focus', this.willFocus);
        this.props.navigation.addListener('blur', this.willBlur);
    }

    willFocus = () => {
        setTimeout(() => {
            const deepLink = this.props.route.params?.url;

            console.log(deepLink);
            if (deepLink) {
                const params = parseURLParams(deepLink);
                this.setState({
                    deepLinkProps: {
                        sender: null,
                        address: Address.create(params.receiver).getReedSolomonAddress(),
                        fee: params.feeNQT ? this.getFee(params.feeNQT, params.feeSuggestionType) : undefined,
                        amount: params.amountNQT ? Amount.fromPlanck(params.amountNQT).getSigna() : undefined,
                        message: params.message,
                        messageIsText: params.messageIsText !== 'false',
                        encrypt: params.encrypt === 'true',
                        immutable: params.immutable === 'true'
                    }
                });
            }
        }, 500);
    };

    componentDidMount() {
        this.forceUpdate();
    }

    willBlur = () => {
        const deepLink = this.props.navigation.dangerouslyGetParent();
        if (deepLink) {
            deepLink.setParams({url: undefined});
        }
        this.props.navigation.setParams({url: undefined});
        this.setState({
            deepLinkProps: undefined
        });
    };

    getFee(feeNQT: string, feeSuggestionType: string): string {
        let fee = Amount.fromPlanck(feeNQT);
        if (feeSuggestionType && feeSuggestionType !== 'undefined' && this.props.network.suggestedFees) {
            // @ts-ignore
            fee = Amount.fromPlanck(this.props.network.suggestedFees[feeSuggestionType]);
        }
        return fee.getSigna();
    }

    handleSubmit = (form: SendAmountPayload) => {
        const {passcodeEnteredTime} = this.props.auth;
        const {passcodeTime} = this.props.app.appSettings;

        if (shouldEnterPIN(passcodeTime, passcodeEnteredTime)) {
            this.setState({
                isPINModalVisible: true
            });
        } else {
            this.props.dispatch(sendMoney(form));
            this.props.navigation.navigate(routes.home);
        }
    };

    handlePINEntered = () => {
        this.setState({
            isPINModalVisible: false
        });
    };

    handlePINCancel = () => {
        this.setState({
            isPINModalVisible: false
        });
    };

    handleGetAccount = (id: string) => {
        return this.props.dispatch(getAccount(id));
    };

    handleGetZilAddress = (id: string) => {
        return this.props.dispatch(getZilAddress(id));
    };

    handleGetAlias = (id: string) => {
        return this.props.dispatch(getAlias(id));
    };

    handleCameraIconPress = () => {
        this.props.navigation.navigate(routes.scan);
    };

    componentWillUnmount() {
        this.props.navigation.removeListener('focus', this.willFocus);
        this.props.navigation.removeListener('blur', this.willBlur);
    }

    render() {
        const accounts: Account[] = this.props.auth.accounts || [];
        const {data, error} = this.props.transactions.sendMoney;
        const isLoading = isAsyncLoading(this.props.transactions.sendMoney);

        const hasActiveAccounts = accounts.some(({type}) => type !== 'offline');

        return (
            <Screen>
                <FullHeightView>
                    <View>
                        <HeaderTitle>{i18n.t(transactions.screens.send.title)}</HeaderTitle>
                        {hasActiveAccounts
                            ? <SendBurstForm
                                accounts={accounts}
                                loading={isLoading}
                                onSubmit={this.handleSubmit}
                                onGetAccount={this.handleGetAccount}
                                onGetAlias={this.handleGetAlias}
                                onGetZilAddress={this.handleGetZilAddress}
                                onCameraIconPress={this.handleCameraIconPress}
                                deepLinkProps={this.state.deepLinkProps}
                                suggestedFees={this.props.network.suggestedFees}
                            />
                            : <NoActiveAccount/>
                        }
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

function mapStateToProps(state: ApplicationState) {
    return {
        app: state.app,
        auth: state.auth,
        transactions: state.transactions,
        network: state.network
    };
}

export const SendScreen = connect(mapStateToProps)(withNavigation(Send));
