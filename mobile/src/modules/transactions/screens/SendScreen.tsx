import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {Amount} from '@signumjs/util';
import {Account} from '@signumjs/core';
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
import {RootStackParamList} from '../../auth/navigation/mainStack';
import {getAccount, getAlias, getZilAddress} from '../../auth/store/actions';
import {AuthReduxState} from '../../auth/store/reducer';
import {NetworkReduxState} from '../../network/store/reducer';
import {SendBurstForm, SendBurstFormState} from '../components/send/SendBurstForm';
import {sendMoney, SendAmountPayload} from '../store/actions';
import {TransactionsReduxState} from '../store/reducer';
import {transactions} from '../translations';
import {withNavigation} from 'react-navigation';
import {NoActiveAccount} from '../components/send/NoActiveAccount';
import {DeeplinkPayPayload} from '../../../core/utils/deeplink';

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
    deepLinkProps?: SendBurstFormState;
}

class Send extends React.PureComponent<IProps, State> {

    state = {
        deepLinkProps: undefined
    };

    constructor(props) {
        super(props);
        this.props.navigation.addListener('focus', this.willFocus);
        this.props.navigation.addListener('blur', this.willBlur);
    }

    willFocus = () => {
        setTimeout(() => {
            const payload = this.props.route.params?.payload as DeeplinkPayPayload
            console.log('Got send link', payload);
            if (payload) {
                this.setState({
                    deepLinkProps: {
                        sender: null,
                        address: payload.recipient || undefined,
                        fee: payload.feePlanck ? Amount.fromPlanck(payload.feePlanck).getSigna() : undefined,
                        amount: payload.amountPlanck ? Amount.fromPlanck(payload.amountPlanck).getSigna() : undefined,
                        message: payload.message,
                        messageIsText: payload.messageIsText === true,
                        encrypt: payload.encrypt === true,
                        immutable: payload.immutable === true
                    }
                });
            }
        }, 500);
    }

    componentDidMount(): void {
        this.forceUpdate();
    }

    willBlur = () => {
        const deepLink = this.props.navigation.dangerouslyGetParent();
        if (deepLink) {
            deepLink.setParams({payload: undefined});
        }
        this.props.navigation.setParams({payload: undefined});
        this.setState({
            deepLinkProps: undefined
        });
    }

    handleSubmit = (form: SendAmountPayload) => {
        this.props.dispatch(sendMoney(form));
        this.props.navigation.navigate(routes.home);
    }

    handleGetAccount = (id: string) => {
        return this.props.dispatch(getAccount(id));
    }

    handleGetZilAddress = (id: string) => {
        return this.props.dispatch(getZilAddress(id));
    }

    handleGetAlias = (id: string) => {
        return this.props.dispatch(getAlias(id));
    }

    handleCameraIconPress = () => {
        this.props.navigation.navigate(routes.scan);
    }

    componentWillUnmount(): void {
        this.props.navigation.removeListener('focus', this.willFocus);
        this.props.navigation.removeListener('blur', this.willBlur);
    }

    render() {
        const accounts: Account[] = this.props.auth.accounts || [];
        const {error} = this.props.transactions.sendMoney;
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
