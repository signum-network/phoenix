// @ts-ignore
import React, {useEffect, useState} from 'react';
import {Image, Linking, Alert} from 'react-native';
import 'react-native-gesture-handler';
import {addEventListener, removeEventListener} from 'react-native-localize';

import {NavigationContainer, NavigationContainerRef} from '@react-navigation/native';
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
import {getDeeplinkInfo, SupportedDeeplinkActions} from './src/core/utils/deeplink';

const store: Store = getStore();

const rootTabStackConfig = {
    initialRouteName: routes.home,
    tabBarOptions: {
        activeTintColor: Colors.WHITE,
        activeBackgroundColor: Colors.BLUE_DARKER,
        inactiveTintColor: Colors.GREY,
        inactiveBackgroundColor: Colors.BLUE_DARKER,
        showIcon: true,
        style: {
            backgroundColor: Colors.BLUE_DARKER,
            borderTopWidth: 0
        }
    }
};

// export const navigationRef: React.RefObject<NavigationContainerRef> = React.createRef();

export const App: React.FC = () => {
    const navigationRef: React.RefObject<NavigationContainerRef> = React.createRef();
    const [isAppLoaded, setIsAppLoaded] = useState(false);
    const [navigatorReady, setNavigatorReady] = useState(false);
    const [linkUrl, setLinkUrl] = useState<string | null>(null);

    useEffect(() => {

        const handleLanguagesChange = (event: ChangeLanguageEvent) => {
            i18n.locale = event.language;
            // TODO: check the way to force a rerender
            // we need to re-render whole tree
            // forceUpdate();
        };

        const handleOpenURL = (event: any) => {
            console.log('initial Url - event');
            setLinkUrl(event.url);
        };

        addEventListener('change', handleLanguagesChange);
        Linking.addEventListener('url', handleOpenURL);
        Linking.getInitialURL().then((url) => {
            console.log('initial Url', url);
            setLinkUrl(url);
        });
        return () => {
            removeEventListener('change', handleLanguagesChange);
            Linking.removeEventListener('url', handleOpenURL);
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
                navigationRef.current.navigate(routes.send, {
                        screen: routes.send,
                        params: {payload: deeplinkInfo.decodedPayload}
                    }
                );
            }
        } catch (e) {
            Alert.alert(e.message);
        }
    }, [isAppLoaded, linkUrl, navigatorReady]);

    const getImageStyle = ({color}: { color: string }) => ({
        opacity: color === Colors.WHITE ? 1 : .5,
        width: 25,
        height: 25
    });

    const RootTabStack = createBottomTabNavigator();

    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <NavigationContainer ref={navigationRef} onReady={() => {
                    setNavigatorReady(true);
                }}>
                    <RootView onReady={() => {
                        setIsAppLoaded(true);
                    }}>
                        <RootTabStack.Navigator
                            tabBarOptions={rootTabStackConfig.tabBarOptions}
                            initialRouteName={rootTabStackConfig.initialRouteName}>
                            <RootTabStack.Screen
                                options={{
                                    tabBarLabel: i18n.t(core.screens.home.title) || '',
                                    tabBarIcon: ({color}) => (
                                        <Image
                                            source={tabbarIcons.home}
                                            style={getImageStyle({color})}
                                        />
                                    )
                                }}
                                name={routes.home}
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
                                    )
                                }} name={routes.send} component={SendStack}/>
                            <RootTabStack.Screen
                                options={{
                                    tabBarLabel: i18n.t(transactions.screens.receive.title),
                                    tabBarIcon: ({color}) => (
                                        <Image
                                            source={tabbarIcons.receive}
                                            style={getImageStyle({color})}
                                        />
                                    )
                                }} name={routes.receive} component={ReceiveStack}/>
                            <RootTabStack.Screen
                                options={{
                                    tabBarLabel: i18n.t(settings.screens.settings.title),
                                    tabBarIcon: ({color}) => (
                                        <Image
                                            source={tabbarIcons.settings}
                                            style={getImageStyle({color})}
                                        />
                                    )
                                }} name={routes.settings} component={SettingsScreen}/>
                        </RootTabStack.Navigator>
                    </RootView>
                </NavigationContainer>
            </SafeAreaProvider>
        </Provider>
    );
};

const Stack = createStackNavigator();

export const MainStack = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name={routes.home} component={HomeScreen}/>
            <Stack.Screen name={routes.addAccount} component={AddAccountScreen}/>
            <Stack.Screen name={routes.createAccount} component={CreateAccountScreen}/>
            <Stack.Screen name={routes.importAccount} component={ImportAccountScreen}/>
            <Stack.Screen name={routes.accountDetails} component={AccountDetailsScreen}/>
            <Stack.Screen name={routes.transactionDetails} component={TransactionDetailsScreen}/>
        </Stack.Navigator>
    );
};

export const SendStack = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name={routes.send} component={SendScreen}/>
            <Stack.Screen name={routes.scan} component={ScanQRCodeScreen}/>
        </Stack.Navigator>
    );
};

export const ReceiveStack = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name={routes.receive} component={ReceiveScreen}/>
            <Stack.Screen name={routes.viewQRCode} component={ViewQRCodeScreen}/>
        </Stack.Navigator>
    );
};
