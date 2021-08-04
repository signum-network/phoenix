import {Account} from '@signumjs/core';
import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {HeaderTitle} from '../../../core/components/header/HeaderTitle';
import {PlusHeaderButton} from '../../../core/components/header/PlusHeaderButton';
import {i18n} from '../../../core/i18n';
import {FullHeightView} from '../../../core/layout/FullHeightView';
import {Screen} from '../../../core/layout/Screen';
import {routes} from '../../../core/navigation/routes';
import {ApplicationState} from '../../../core/store/initialState';
import {core} from '../../../core/translations';
import {HomeStackedAreaChart} from '../../home/components/HomeStackedAreaChart';
import {loadHistoricalPriceApiData, selectCurrency} from '../../price-api/store/actions';
import {PriceInfoReduxState, PriceType} from '../../price-api/store/reducer';
import {AccountsList} from '../components/AccountsList';
import {AccountsListHeader} from '../components/AccountsListHeader';
import {TermsScreen} from '../components/terms/TermsScreen';
import {hydrateAccount, removeAccount} from '../store/actions';
import {agreeToTerms} from '../../../core/store/app/actions';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {selectAccounts} from '../store/selectors';
import {selectAgreedToTerms} from '../../../core/store/app/selectors';

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'column',
        top: 'auto',
        height: '100%',
        flex: 1
    },
    addAccount: {
        justifyContent: 'center',
        alignContent: 'center',
        flex: 3,
        paddingLeft: 20,
        paddingRight: 20
    },
    addAccountText: {
        marginBottom: 20
    },
});

const priceTypes = [PriceType.BURST, PriceType.BTC, PriceType.USD];


export const HomeScreen: React.FC = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [isTermsScreenVisible, setIsTermsScreenVisible] = useState(false);
    const [shouldUpdateAccounts, setShouldUpdateAccounts] = useState(true);
    const accounts = useSelector(selectAccounts);
    const agreedToTerms = useSelector(selectAgreedToTerms);
    // TODO: this should go into Context
    const priceApi = useSelector<ApplicationState, PriceInfoReduxState>(s => s.priceApi);

    useEffect(() => {
        setIsTermsScreenVisible(!agreedToTerms);
    }, []);

    useFocusEffect(() => {
            setShouldUpdateAccounts(true);
            return () => {
                setShouldUpdateAccounts(false);
            };
        }
    );

    useEffect(() => {
        if (shouldUpdateAccounts) {
            setTimeout(() => updateAllAccounts(), 500);
        }
    }, [shouldUpdateAccounts]);

    const updateAllAccounts = async () => {
        try {
            console.log('Updating Accounts...');
            await Promise.all(accounts.map((account) => {
                dispatch(hydrateAccount(account));
            }));
        } catch (e) {
            // ignored failures and not crashing the app
        }
    };

    const handleAccountPress = (account: Account) => {
        navigation.navigate(routes.accountDetails, {
            account: account.account
        });
    };

    const handleAddAccountPress = async () => {
        handleAddAccount();
    };

    const handleTermsAgreed = () => {
        dispatch(agreeToTerms());
        setIsTermsScreenVisible(false);
    };

    const handleAddAccount = () => {
        navigation.navigate(routes.addAccount);
    };

    const handleDelete = (account: Account) => {
        dispatch(removeAccount(account));
    };

    const handleAccountsListRefresh = () => {
        dispatch(loadHistoricalPriceApiData());
        return updateAllAccounts();
    };

    const handleSelectCurrency = () => {
        dispatch(
            selectCurrency(priceTypes[priceTypes.findIndex(
                (val) => val === priceApi.selectedCurrency
            ) + 1] || priceTypes[0]
            )
        );
    };

    const shouldShowChart = accounts.length && priceApi.priceInfo && priceApi.historicalPriceInfo;

    return (
        <Screen>
            <FullHeightView withoutPaddings>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1, alignItems: 'center', margin: 10}}>
                        <HeaderTitle>
                            {i18n.t(core.screens.home.title)}
                        </HeaderTitle>
                    </View>
                    <View style={{position: 'absolute', right: 10, top: 0}}>
                        <PlusHeaderButton onPress={handleAddAccountPress}/>
                    </View>
                </View>
                <AccountsListHeader priceApi={priceApi} accounts={accounts}/>
                <View style={styles.wrapper}>
                    {shouldShowChart && <HomeStackedAreaChart
                        priceApi={priceApi}
                        accounts={accounts}
                        priceTypes={priceTypes}
                        selectCurrency={handleSelectCurrency}
                    /> || null}

                    <AccountsList
                        accounts={accounts}
                        onAccountPress={handleAccountPress}
                        onAddAccountPress={handleAddAccountPress}
                        onDelete={handleDelete}
                        priceApi={priceApi}
                        onRefresh={handleAccountsListRefresh}
                    />
                    {isTermsScreenVisible && <TermsScreen
                        visible={isTermsScreenVisible}
                        onAgree={handleTermsAgreed}
                    />}
                </View>
            </FullHeightView>
        </Screen>
    );
};

// class Home extends React.PureComponent<IProps, State> {
//
//     state = {
//         isTermsScreenVisible: false,
//         selectedCurrency: priceTypes[0]
//     };
//
//     componentDidMount(): void {
//         console.log('Home mounted');
//         setTimeout(() => this.updateAllAccounts(), 500);
//         this.checkTermsScreen();
//     }
//
//     handleChangeAccount = () => {
//         this.props.navigation.navigate(routes.accounts);
//     }
//
//     updateAllAccounts = () => {
//         console.log('Updating Accounts...');
//         try {
//             return Promise.all(this.props.auth.accounts.map((account) => {
//                 this.props.dispatch(hydrateAccount(account));
//             }));
//         } catch (e) {
//         }
//     }
//
//     setPINModalVisible = (isPINModalVisible: boolean) => {
//         this.setState({isPINModalVisible});
//     }
//
//     checkTermsScreen = () => {
//         this.setTermsScreenVisible(!this.props.app.userSettings.agreedToTerms);
//     }
//
//     setTermsScreenVisible = (isTermsScreenVisible: boolean) => {
//         this.setState({isTermsScreenVisible});
//     }
//
//     handleAccountPress = (account: Account) => {
//         this.props.navigation.navigate(routes.accountDetails, {
//             account: account.account
//         });
//     }
//
//     handleAddAccountPress = async () => {
//         this.handleAddAccount();
//     }
//
//     handleTermsAgreed = () => {
//         this.props.dispatch(agreeToTerms());
//         this.setTermsScreenVisible(false);
//     }
//
//     handleAddAccount = () => {
//         this.props.navigation.navigate(routes.addAccount);
//     }
//
//     handleDelete = (account: Account) => {
//         this.props.dispatch(removeAccount(account));
//     }
//
//     handleAccountsListRefresh = () => {
//         this.props.dispatch(loadHistoricalPriceApiData());
//         return this.updateAllAccounts();
//     }
//
//     selectCurrency(): void {
//         this.props.dispatch(
//             selectCurrency(priceTypes[priceTypes.findIndex(
//                 (val) => val === this.props.priceApi.selectedCurrency
//             ) + 1] || priceTypes[0]
//             )
//         );
//     }
//
//     render() {
//         const accounts: Account[] = this.props.auth.accounts || [];
//         const priceApi = this.props.priceApi;
//         const shouldShowChart = accounts.length && priceApi.priceInfo && priceApi.historicalPriceInfo;
//
//         const {isTermsScreenVisible} = this.state;
//         return (
//             <Screen>
//                 <FullHeightView withoutPaddings>
//                     <View style={{flexDirection: 'row'}}>
//                         <View style={{flex: 1, alignItems: 'center', margin: 10}}>
//                             <HeaderTitle>
//                                 {i18n.t(core.screens.home.title)}
//                             </HeaderTitle>
//                         </View>
//                         <View style={{position: 'absolute', right: 10, top: 0}}>
//                             <PlusHeaderButton onPress={this.handleAddAccountPress}/>
//                         </View>
//                     </View>
//                     <AccountsListHeader priceApi={priceApi} accounts={accounts}/>
//                     <View style={styles.wrapper}>
//                         {shouldShowChart && <HomeStackedAreaChart
//                             priceApi={priceApi}
//                             accounts={accounts}
//                             priceTypes={priceTypes}
//                             selectCurrency={this.selectCurrency.bind(this)}
//                         /> || null}
//
//                         <AccountsList
//                             accounts={accounts}
//                             onAccountPress={this.handleAccountPress}
//                             onAddAccountPress={this.handleAddAccountPress}
//                             onDelete={this.handleDelete}
//                             priceApi={this.props.priceApi}
//                             onRefresh={this.handleAccountsListRefresh}
//                         />
//                         {isTermsScreenVisible && <TermsScreen
//                             visible={isTermsScreenVisible}
//                             onAgree={this.handleTermsAgreed}
//                         />}
//                     </View>
//                 </FullHeightView>
//             </Screen>
//         );
//     }
// }
//
// function mapStateToProps(state: ApplicationState) {
//     return {
//         app: state.app,
//         auth: state.auth,
//         priceApi: state.priceApi,
//     };
// }
//
// export const HomeScreen = connect(mapStateToProps)(Home);
