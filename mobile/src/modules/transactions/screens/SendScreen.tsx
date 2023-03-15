import {
  useNavigation,
  useRoute,
  useFocusEffect,
  CompositeNavigationProp,
} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Account, SuggestedFees, TransactionId} from '@signumjs/core';
import {Text, TextThemes} from '../../../core/components/base/Text';
import {HeaderTitle} from '../../../core/components/header/HeaderTitle';
import {i18n} from '../../../core/i18n';
import {AsyncParticle} from '../../../core/interfaces';
import {FullHeightView} from '../../../core/layout/FullHeightView';
import {Screen} from '../../../core/layout/Screen';
import {routes} from '../../../core/navigation/routes';
import {ApplicationState} from '../../../core/store/initialState';
import {isAsyncLoading} from '../../../core/utils/async';
import {
  getAccount,
  getAlias,
  getUnstoppableAddress,
} from '../../auth/store/actions';
import {SendForm, SendFormState} from '../components/send/SendForm';
import {
  sendMoney as sendMoneyAction,
  SendAmountPayload,
} from '../store/actions';
import {transactions} from '../translations';
import {NoActiveAccount} from '../components/send/NoActiveAccount';
import {stableParsePlanckAmount} from '../../../core/utils/amount';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  BottomTabNavigatorParamList,
  SendStackParamList,
} from '../../auth/navigation/mainStack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

type SendScreenNavProp = CompositeNavigationProp<
  StackNavigationProp<SendStackParamList, 'Send'>,
  BottomTabNavigationProp<BottomTabNavigatorParamList, 'SendStack'>
>;

interface SendDeeplinkParameters {
  recipient?: string;
  amountPlanck?: string;
  feePlanck?: string;
  encrypt?: boolean;
  immutable?: boolean;
  messageIsText?: boolean;
  message?: string;
}

export const SendScreen = () => {
  const route = useRoute();
  const navigation = useNavigation<SendScreenNavProp>();
  const dispatch = useDispatch();
  const [deeplinkData, setDeeplinkData] = useState<SendFormState>();
  const accounts = useSelector<ApplicationState, Account[]>(
    state => state.auth.accounts || [],
  );
  const [, setShouldUpdate] = useState(true);

  // TODO: refactoring is king here! - this is pretty uncommon pattern!
  const sendMoneyFn = useSelector<
    ApplicationState,
    AsyncParticle<TransactionId>
  >(state => state.transactions.sendMoney);
  const suggestedFees = useSelector<ApplicationState, SuggestedFees | null>(
    state => state.network.suggestedFees,
  );

  useEffect(() => {
    if (!route.params) {
      return;
    }

    console.log('SendScreen - Got Deeplink Params', route.params);
    // @ts-ignore
    const payload = route.params.payload as SendDeeplinkParameters;
    // @ts-ignore
    setDeeplinkData({
      sender: null,
      address: payload.recipient || undefined,
      fee: payload.feePlanck
        ? stableParsePlanckAmount(payload.feePlanck).getSigna()
        : undefined,
      amount: payload.amountPlanck
        ? stableParsePlanckAmount(payload.amountPlanck).getSigna()
        : undefined,
      message: payload.message,
      messageIsText:
        payload.messageIsText == null ? true : payload.messageIsText,
      encrypt: payload.encrypt === true,
      immutable: payload.immutable === true,
    });
  }, [route]);

  useFocusEffect(() => {
    // force update on enter :rolleyes
    setShouldUpdate(true);
    return () => {
      setShouldUpdate(false);
    };
  });

  const handleSubmit = (form: SendAmountPayload) => {
    dispatch(sendMoneyAction(form));
    setDeeplinkData(undefined);
    navigation.navigate('Home', {screen: 'Accounts'});
  };

  const handleReset = () => {
    setDeeplinkData(undefined);
  };

  const handleGetAccount = (id: string) => {
    return dispatch(getAccount(id));
  };

  const handleGetUnstoppableAddress = (id: string) => {
    return dispatch(getUnstoppableAddress(id));
  };

  const handleGetAlias = (id: string) => {
    return dispatch(getAlias(id));
  };

  const handleCameraIconPress = () => {
    navigation.navigate('Scan');
  };

  const {error} = sendMoneyFn;
  const isLoading = isAsyncLoading(sendMoneyFn);
  const hasActiveAccounts = accounts.some(({type}) => type !== 'offline');

  return (
    <Screen>
      <FullHeightView>
        <View>
          <HeaderTitle>{i18n.t(transactions.screens.send.title)}</HeaderTitle>
          {hasActiveAccounts ? (
            <SendForm
              accounts={accounts}
              loading={isLoading}
              onReset={handleReset}
              onSubmit={handleSubmit}
              onGetAccount={handleGetAccount}
              onGetAlias={handleGetAlias}
              onGetUnstoppableAddress={handleGetUnstoppableAddress}
              onCameraIconPress={handleCameraIconPress}
              deepLinkProps={deeplinkData}
              suggestedFees={suggestedFees}
            />
          ) : (
            <NoActiveAccount />
          )}
          {error && <Text theme={TextThemes.DANGER}>{error.message}</Text>}
        </View>
      </FullHeightView>
    </Screen>
  );
};
