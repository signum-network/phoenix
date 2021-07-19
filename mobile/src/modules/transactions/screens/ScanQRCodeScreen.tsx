import React from 'react';

import {
    Alert,
    StyleSheet,
    TouchableOpacity,
    View,
    Image
} from 'react-native';

import QRCodeScanner, {Event} from 'react-native-qrcode-scanner';
import {i18n} from '../../../core/i18n';
import {routes} from '../../../core/navigation/routes';
import {Colors} from '../../../core/theme/colors';
import {transactions} from '../translations';
import {Screen} from '../../../core/layout/Screen';
import {FullHeightView} from '../../../core/layout/FullHeightView';
import {actionIcons} from '../../../assets/icons';
import {core} from '../../../core/translations';
import {Text} from '../../../core/components/base/Text';
import {HeaderTitle} from '../../../core/components/header/HeaderTitle';
import {getDeeplinkInfo, SupportedDeeplinkActions} from '../../../core/utils/deeplink';
import {useNavigation} from '@react-navigation/native';


const styles = StyleSheet.create({
    topView: {
        backgroundColor: Colors.BLUE_DARKER
    },
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: Colors.WHITE
    },
    buttonTouchable: {
        padding: 16
    }
});

export const ScanQRCodeScreen: React.FC = () => {

    const navigation = useNavigation();

    const onSuccess = (e: Event) => {
        try {
            const {action, decodedPayload} = getDeeplinkInfo(e.data);

            if (action !== SupportedDeeplinkActions.Pay) {
                return Alert.alert(`Unsupported Deeplink Action: ${action}`);
            }
            // @ts-ignore
            navigation.navigate(routes.send, {payload: decodedPayload});
        } catch (e) {
            return Alert.alert('Unknown QR Code');
        }
    };

    return (
        <Screen>
            <FullHeightView withoutPaddings>
                <View>
                    <View style={{backgroundColor: Colors.BLUE_DARKER, flexDirection: 'row'}}>
                        <TouchableOpacity
                            style={{flexDirection: 'row', position: 'absolute', zIndex: 1, left: 10, top: 10}}
                            onPress={() => navigation.goBack()}>
                            <Image source={actionIcons.chevronLeft} style={{width: 30, height: 30}}/>
                            <Text color={Colors.WHITE}>{i18n.t(core.actions.back)}</Text>
                        </TouchableOpacity>
                        <View style={{flex: 1, alignItems: 'center', margin: 10}}>
                            <HeaderTitle>
                                {i18n.t(transactions.screens.scan.title)}
                            </HeaderTitle>
                        </View>
                    </View>
                    <QRCodeScanner
                        topViewStyle={styles.topView}
                        bottomViewStyle={styles.topView}
                        onRead={onSuccess}
                        topContent={
                            <Text style={styles.centerText}>
                                {i18n.t(transactions.screens.scan.title)}
                            </Text>
                        }
                    />
                </View>
            </FullHeightView>
        </Screen>
    );
};
