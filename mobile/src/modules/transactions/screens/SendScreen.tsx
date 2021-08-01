import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Account} from '@signumjs/core';
import {Text, TextThemes} from '../../../core/components/base/Text';
import {HeaderTitle} from '../../../core/components/header/HeaderTitle';
import {i18n} from '../../../core/i18n';
import {AsyncParticle} from '../../../core/interfaces';
import {FullHeightView} from '../../../core/layout/FullHeightView';
import {Screen} from '../../../core/layout/Screen';
import {routes} from '../../../core/navigation/routes';
import {ApplicationState} from '../../../core/store/initialState';
import {isAsyncLoading} from '../../../core/utils/async';
import {getAccount, getAlias, getZilAddress} from '../../auth/store/actions';
import {SendForm, SendFormState} from '../components/send/SendForm';
import {sendMoney as sendMoneyAction, SendAmountPayload} from '../store/actions';
import {transactions} from '../translations';
import {NoActiveAccount} from '../components/send/NoActiveAccount';
import {SuggestedFees, TransactionId} from '../../../../../lib/packages/core/src';
import {stableParsePlanckAmount} from '../../../core/utils/amount';

interface SendDeeplinkParameters {
    recipient?: string;
    amountPlanck?: string;
    feePlanck?: string;
    encrypt?: boolean;
    immutable?: boolean;
    messageIsText?: boolean;
    message?: string;
}

export const SendScreen: React.FC = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [deeplinkData, setDeeplinkData] = useState<undefined | SendFormState>();
    const accounts = useSelector<ApplicationState, Account[]>(state => state.auth.accounts || []);
    // TODO: refactoring is king here! - this is pretty uncommon pattern!
    const sendMoneyFn = useSelector<ApplicationState, AsyncParticle<TransactionId>>(state => state.transactions.sendMoney);
    const suggestedFees = useSelector<ApplicationState, SuggestedFees | null>(state => state.network.suggestedFees);

    useEffect(() => {
        if (!route.params) {
            return;
        }

        console.log('SendScreen - Got Deeplink Params', route.params);
        // @ts-ignore
        const payload = route.params.payload as SendDeeplinkParameters;
        setDeeplinkData({
            sender: null,
            address: payload.recipient || undefined,
            fee: payload.feePlanck ? stableParsePlanckAmount(payload.feePlanck).getSigna() : undefined,
            amount: payload.amountPlanck ? stableParsePlanckAmount(payload.amountPlanck).getSigna() : undefined,
            message: payload.message,
            messageIsText: payload.messageIsText === true,
            encrypt: payload.encrypt === true,
            immutable: payload.immutable === true
        });
    }, [route]);

    const handleSubmit = (form: SendAmountPayload) => {
        dispatch(sendMoneyAction(form));
    };

    const handleGetAccount = (id: string) => {
        return dispatch(getAccount(id));
    };

    const handleGetZilAddress = (id: string) => {
        return dispatch(getZilAddress(id));
    };

    const handleGetAlias = (id: string) => {
        return dispatch(getAlias(id));
    };

    const handleCameraIconPress = () => {
        navigation.navigate(routes.scan);
    };

    const {error} = sendMoneyFn;
    const isLoading = isAsyncLoading(sendMoneyFn);
    const hasActiveAccounts = accounts.some(({type}) => type !== 'offline');

    return (
        <Screen>
            <FullHeightView>
                <View>
                    <HeaderTitle>{i18n.t(transactions.screens.send.title)}</HeaderTitle>
                    {hasActiveAccounts
                        ? <SendForm
                            accounts={accounts}
                            loading={isLoading}
                            onSubmit={handleSubmit}
                            onGetAccount={handleGetAccount}
                            onGetAlias={handleGetAlias}
                            onGetZilAddress={handleGetZilAddress}
                            onCameraIconPress={handleCameraIconPress}
                            deepLinkProps={deeplinkData}
                            suggestedFees={suggestedFees}
                        />
                        : <NoActiveAccount/>
                    }
                    {error && <Text theme={TextThemes.DANGER}>{error.message}</Text>}
                </View>
            </FullHeightView>
        </Screen>
    );
};
