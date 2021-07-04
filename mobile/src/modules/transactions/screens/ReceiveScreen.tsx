import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {HeaderTitle} from '../../../core/components/header/HeaderTitle';
import {i18n} from '../../../core/i18n';
import {FullHeightView} from '../../../core/layout/FullHeightView';
import {Screen} from '../../../core/layout/Screen';
import {routes} from '../../../core/navigation/routes';
import {ReceiveAmountForm} from '../components/receive/ReceiveAmountForm';
import {ReceiveAmountPayload} from '../store/actions';
import {transactions} from '../translations';
import {useNavigation} from '@react-navigation/native';
import {selectAccounts} from '../../auth/store/selectors';
import {selectSuggestedFees} from '../../network/store/selectors';

export const ReceiveScreen: React.FC = () => {
    const navigation = useNavigation();
    const accounts = useSelector(selectAccounts);
    const suggestedFees = useSelector(selectSuggestedFees);

    const handleSubmit = (form: ReceiveAmountPayload) => {
        // @ts-ignore
        navigation.navigate(routes.viewQRCode, {form});
    };

    return (
        <Screen>
            <FullHeightView>
                <HeaderTitle>{i18n.t(transactions.screens.receive.title)}</HeaderTitle>
                <View>
                    <ReceiveAmountForm
                        accounts={accounts}
                        onSubmit={handleSubmit}
                        suggestedFees={suggestedFees}
                    />
                </View>
            </FullHeightView>
        </Screen>
    );
};


// class Receive extends React.PureComponent<Props, State> {
//   handleSubmit = (form: ReceiveAmountPayload) => {
//     this.props.navigation.navigate(routes.viewQRCode, { form });
//   }
//
//   render () {
//     const accounts: Account[] = this.props.auth.accounts || [];
//     const { suggestedFees } = this.props.network;
//
//     return (
//       <Screen>
//         <FullHeightView>
//           <HeaderTitle>{i18n.t(transactions.screens.receive.title)}</HeaderTitle>
//           <View>
//             <ReceiveAmountForm
//               accounts={accounts}
//               onSubmit={this.handleSubmit}
//               suggestedFees={suggestedFees}
//             />
//           </View>
//         </FullHeightView>
//       </Screen>
//     );
//   }
// }
// //
// function mapStateToProps (state: ApplicationState) {
//   return {
//     app: state.app,
//     auth: state.auth,
//     transactions: state.transactions,
//     network: state.network
//   };
// }
//
// export const ReceiveScreen = connect(mapStateToProps)(Receive);
