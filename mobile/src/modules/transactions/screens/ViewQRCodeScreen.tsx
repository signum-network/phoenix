import React, {useMemo} from 'react';
import {Clipboard, Share, StyleSheet, View} from 'react-native';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';
import {Button} from '../../../core/components/base/Button';
import {HeaderTitle} from '../../../core/components/header/HeaderTitle';
import {i18n} from '../../../core/i18n';
import {InjectedReduxProps} from '../../../core/interfaces';
import {FullHeightView} from '../../../core/layout/FullHeightView';
import {Screen} from '../../../core/layout/Screen';
import {AppReduxState} from '../../../core/store/app/reducer';
import {ApplicationState} from '../../../core/store/initialState';
import {Colors} from '../../../core/theme/colors';
import {defaultSideOffset, Sizes} from '../../../core/theme/sizes';
import {AuthReduxState} from '../../auth/store/reducer';
import {ReceiveAmountPayload} from '../store/actions';
import {TransactionsReduxState} from '../store/reducer';
import {transactions} from '../translations';
import {RouteProp, useRoute, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../auth/navigation/mainStack';
import {Amount, createDeeplink, EncoderFormat} from '@signumjs/util';
import {AddressPrefix, Address} from '@signumjs/core';
import QRCode from 'react-native-qrcode-svg';
import {LabeledTextField} from '../../../core/components/base/LabeledTextField';
import {isIOS} from '../../../core/utils/platform';
import { HeaderWithBackButton } from '../../../core/layout/HeaderWithBackButton';

type ScanRouteProps = RouteProp<RootStackParamList, 'Scan'>;

const styles = StyleSheet.create({
    col: {
        flex: 1
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    details: {
        paddingHorizontal: defaultSideOffset,
        display: 'flex',
        flexDirection: 'column',
        height: '95%'
    },
    imageWrapper: {
        flex: 3
    },
    buttonRow: {
        flex: 1
    },
    payload: {
        flex: 2,
    },
    alignCenter: {
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center'
    }
});

function buildPhoenixDeepLinkURL(requestPayload: ReceiveAmountPayload): string {

    const {amount, fee, recipient, immutable, message = ''} = requestPayload;

    let payload = {
        amountPlanck: Amount.fromSigna(amount).getPlanck(),
        feePlanck: Amount.fromSigna(fee).getPlanck(),
        recipient: recipient.replace(/^BURST-/, `${AddressPrefix.MainNet}-`),
        immutable
    };

    if (message) {
        // @ts-ignore
        payload = {...payload, message, messageIsText: true};
    }

    const deeplink = createDeeplink({
        encoderFormat: EncoderFormat.Base64,
        action: 'pay',
        payload
    });

    console.log('Created deeplink:', deeplink);
    return deeplink;
}


export const ViewQRCodeScreen: React.FC = () => {
    const route = useRoute<ScanRouteProps>();
    const navigation = useNavigation();

    const data = useMemo(() => ({
        fee: Amount.fromSigna(route.params.form.fee),
        amount: Amount.fromSigna(route.params.form.amount),
        recipient: Address.create(route.params.form.recipient),
        immutable: route.params.form.immutable,
        message: route.params.form.message,
    }), [route]);

    const deeplinkUrl = useMemo(() => buildPhoenixDeepLinkURL(route.params.form), [route]);

    const handleShare = async () => {
        const androidLink = isIOS ? '' : `Your Link: ${deeplinkUrl}`;
        try {
            await Share.share({
                message: `
Signa Payment Requested from ${data.recipient.getReedSolomonAddress()} for ${data.amount} (+${data.fee})

${androidLink}

Pay using the Phoenix Wallet from https://phoenix-wallet.rocks
`,
                title: `Signum Payment Request`,
                url: deeplinkUrl
            }, {
                dialogTitle: `Signum Payment Request`,
                subject: `Signum Payment Request from ${data.recipient.getReedSolomonAddress()}`
            });
        } catch (error) {
            console.log('Sharing error', error);
        }
    };

    const handleCopy = () => {
        Clipboard.setString(deeplinkUrl);
    };

    return (
        <Screen>
            <FullHeightView>
                <HeaderWithBackButton
                    title={i18n.t(transactions.screens.receive.title)}
                    backgroundColor={Colors.TRANSPARENT}
                    noMargin
                />
                <View style={styles.details}>
                    <View style={[styles.row, styles.imageWrapper]}>
                        <View style={[styles.col, styles.alignCenter]}>
                            <QRCode
                                size={200}
                                value={deeplinkUrl}
                                backgroundColor={Colors.WHITE}
                                color={Colors.BLUE_DARKER}
                                quietZone={8}
                            />
                        </View>
                    </View>
                    <View style={[styles.row, styles.buttonRow]}>
                        <View style={styles.col}>
                            <Button onPress={handleShare}>
                                Share
                            </Button>
                        </View>
                        <View style={styles.col}>
                            <Button onPress={handleCopy}>
                                Copy
                            </Button>
                        </View>
                    </View>
                    <View style={[styles.payload]}>
                        <LabeledTextField
                            label={i18n.t(transactions.screens.receive.recipient)}
                            text={data.recipient.getReedSolomonAddress()}
                            color={Colors.WHITE}
                        />
                        <View style={styles.row}>
                            <LabeledTextField
                                label={i18n.t(transactions.screens.send.amountNQT)}
                                text={data.amount.toString()}
                                color={Colors.WHITE}
                            />
                            <LabeledTextField
                                label={i18n.t(transactions.screens.send.feeNQT)}
                                text={data.fee.toString()}
                                color={Colors.WHITE}
                            />
                        </View>

                        {data.message &&
                            <LabeledTextField
                                label={i18n.t(transactions.screens.receive.message)}
                                text={data.message}
                                color={Colors.WHITE}
                            />
                        }
                        <LabeledTextField
                            label={i18n.t(transactions.screens.receive.immutable)}
                            text={data.immutable ? 'Yes' : 'No'}
                            color={Colors.WHITE}
                        />
                    </View>

                </View>
            </FullHeightView>
        </Screen>
    );
};
