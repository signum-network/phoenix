// @ts-ignore
import React, {useEffect, useState} from 'react';
import {Image, Linking, Alert} from 'react-native';
import 'react-native-gesture-handler';
import {addEventListener, removeEventListener} from 'react-native-localize';

import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {Store} from 'redux';
import {i18n} from './src/core/i18n';
import {ChangeLanguageEvent} from './src/core/interfaces';
import {RootView} from './src/core/layout/RootView';
import {routes} from './src/core/navigation/routes';
import {getStore} from './src/core/store/store';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {tabbarIcons} from './src/assets/icons';
import {Colors} from './src/core/theme/colors';
import {core} from './src/core/translations';
import {AccountDetailsScreen} from './src/modules/auth/screens/AccountDetailsScreen';
import {AddAccountScreen} from './src/modules/auth/screens/AddAccountScreen';
import {CreateAccountScreen} from './src/modules/auth/screens/CreateAccountScreen';
import {HomeScreen} from './src/modules/auth/screens/HomeScreen';
import {ImportAccountScreen} from './src/modules/auth/screens/ImportAccountScreen';
import {TransactionDetailsScreen} from './src/modules/auth/screens/TransactionDetailsScreen';
import {SettingsScreen} from './src/modules/settings/screens/SettingsScreen';
import {settings} from './src/modules/settings/translations';
import {ReceiveScreen} from './src/modules/transactions/screens/ReceiveScreen';
import {ScanQRCodeScreen} from './src/modules/transactions/screens/ScanQRCodeScreen';
import {SendScreen} from './src/modules/transactions/screens/SendScreen';
import {ViewQRCodeScreen} from './src/modules/transactions/screens/ViewQRCodeScreen';
import {transactions} from './src/modules/transactions/translations';
import {
  getDeeplinkInfo,
  SupportedDeeplinkActions,
} from './src/core/utils/deeplink';
import {
  BottomTabNavigatorParamList,
  ReceiveStackParamList,
  RootStackParamList,
  SendStackParamList,
} from './src/modules/auth/navigation/mainStack';

const store: Store = getStore();

export const App = () => {
  const navigationRef: React.RefObject<
    NavigationContainerRef<BottomTabNavigatorParamList>
  > = React.createRef();
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  const [navigatorReady, setNavigatorReady] = useState(false);
  const [linkUrl, setLinkUrl] = useState<string | null>(null);

  useEffect(() => {
    const handleLanguagesChange = (event: ChangeLanguageEvent) => {
      i18n.locale = event.language;
    };

    const handleOpenURL = (event: any) => {
      setLinkUrl(event.url);
    };

    addEventListener('change', handleLanguagesChange);
    const urlListener = Linking.addEventListener('url', handleOpenURL);
    Linking.getInitialURL().then(url => {
      setLinkUrl(url);
    });
    return () => {
      removeEventListener('change', handleLanguagesChange);
      urlListener.remove();
    };
  }, []);

  useEffect(() => {
    console.log('App Loaded', isAppLoaded);
    console.log('Initial link', linkUrl);
    console.log('Navigator Ready', navigatorReady);

    if (!(isAppLoaded && linkUrl && navigatorReady)) {
      return;
    }

    try {
      console.log('incoming deep link', linkUrl);
      const deeplinkInfo = getDeeplinkInfo(linkUrl);
      const isSendAction = deeplinkInfo.action === SupportedDeeplinkActions.Pay;

      if (navigationRef.current && isSendAction) {
        console.log('Navigate to Send Action', deeplinkInfo);
        navigationRef.current.navigate('SendStack', {
          screen: 'Send',
          params: {payload: deeplinkInfo},
        });
      }
    } catch (e: any) {
      Alert.alert(e.message);
    }
  }, [isAppLoaded, linkUrl, navigatorReady]);

  const getImageStyle = ({color}: {color: string}) => ({
    opacity: color === Colors.WHITE ? 1 : 0.5,
    width: 25,
    height: 25,
  });

  const RootTabStack = createBottomTabNavigator<BottomTabNavigatorParamList>();

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            setNavigatorReady(true);
          }}>
          <RootView
            onReady={() => {
              setIsAppLoaded(true);
            }}>
            <RootTabStack.Navigator
              screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Colors.WHITE,
                tabBarActiveBackgroundColor: Colors.BLUE_DARKER,
                tabBarInactiveTintColor: Colors.GREY,
                tabBarInactiveBackgroundColor: Colors.BLUE_DARKER,
                tabBarStyle: {
                  backgroundColor: Colors.BLUE_DARKER,
                  borderTopWidth: 0,
                },
              }}
              initialRouteName="Home">
              <RootTabStack.Screen
                options={{
                  tabBarLabel: i18n.t(core.screens.home.title) || '',
                  tabBarIcon: ({color}) => (
                    <Image
                      source={tabbarIcons.home}
                      style={getImageStyle({color})}
                    />
                  ),
                }}
                name="Home"
                component={MainStack}
              />
              <RootTabStack.Screen
                options={{
                  tabBarLabel: i18n.t(transactions.screens.send.title),
                  tabBarIcon: ({color}) => (
                    <Image
                      source={tabbarIcons.send}
                      style={getImageStyle({color})}
                    />
                  ),
                }}
                name="SendStack"
                component={SendStack}
              />
              <RootTabStack.Screen
                options={{
                  tabBarLabel: i18n.t(transactions.screens.receive.title),
                  tabBarIcon: ({color}) => (
                    <Image
                      source={tabbarIcons.receive}
                      style={getImageStyle({color})}
                    />
                  ),
                }}
                name="ReceiveStack"
                component={ReceiveStack}
              />
              <RootTabStack.Screen
                options={{
                  tabBarLabel: i18n.t(settings.screens.settings.title),
                  tabBarIcon: ({color}) => (
                    <Image
                      source={tabbarIcons.settings}
                      style={getImageStyle({color})}
                    />
                  ),
                }}
                name="Settings"
                component={SettingsScreen}
              />
            </RootTabStack.Navigator>
          </RootView>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

const Stack = createStackNavigator<RootStackParamList>();

export const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Accounts" component={HomeScreen} />
      <Stack.Screen name="AddAccount" component={AddAccountScreen} />
      <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
      <Stack.Screen name="ImportAccount" component={ImportAccountScreen} />
      <Stack.Screen name="AccountDetails" component={AccountDetailsScreen} />
      <Stack.Screen
        name="TransactionDetails"
        component={TransactionDetailsScreen}
      />
    </Stack.Navigator>
  );
};

const SendNavStack = createStackNavigator<SendStackParamList>();

export const SendStack = () => {
  return (
    <SendNavStack.Navigator screenOptions={{headerShown: false}}>
      <SendNavStack.Screen name="Send" component={SendScreen} />
      <SendNavStack.Screen name="Scan" component={ScanQRCodeScreen} />
    </SendNavStack.Navigator>
  );
};

const ReceiveNavStack = createStackNavigator<ReceiveStackParamList>();

export const ReceiveStack = () => {
  return (
    <ReceiveNavStack.Navigator screenOptions={{headerShown: false}}>
      <ReceiveNavStack.Screen name="Receive" component={ReceiveScreen} />
      <ReceiveNavStack.Screen name="ViewQRCode" component={ViewQRCodeScreen} />
    </ReceiveNavStack.Navigator>
  );
};
