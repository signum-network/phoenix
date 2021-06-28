import React from 'react';
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
import {EnterPasscodeModal} from '../../auth/components/passcode/EnterPasscodeModal';
import {AuthReduxState} from '../../auth/store/reducer';
import {ReceiveAmountPayload} from '../store/actions';
import {TransactionsReduxState} from '../store/reducer';
import {transactions} from '../translations';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../auth/navigation/mainStack';
import {Amount, createDeeplink, EncoderFormat} from '@signumjs/util';
import {AddressPrefix, Address} from '@signumjs/core';
import QRCode from 'react-native-qrcode-svg';
import {LabeledTextField} from '../../../core/components/base/LabeledTextField';
import {isIOS} from '../../../core/utils/platform';

type ScanRouteProps = RouteProp<RootStackParamList, 'Scan'>;

interface IProps extends InjectedReduxProps {
    app: AppReduxState;
    auth: AuthReduxState;
    transactions: TransactionsReduxState;
    route: ScanRouteProps;
}

type Props = ReceiveAmountPayload & IProps;

const styles = StyleSheet.create({
    col: {
        flex: 1
    },
    row: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row'
    },
    details: {
        paddingHorizontal: defaultSideOffset,
        paddingVertical: Sizes.MEDIUM,
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
    imageWrapper: {
        flex: 5
    },
    valueCol: {
        flex: 3
    },
    buttonRow: {
        flex: 2,
        marginTop: 30
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


interface State {
    isPINModalVisible: boolean;
}

class ViewQRCode extends React.PureComponent<Props, State> {

    private fee: Amount;
    private amount: Amount;
    private recipient: Address;
    private immutable: boolean;
    private message: string;

    state = {
        isPINModalVisible: false
    };

    constructor(props) {
        super(props);
        this.fee = Amount.fromSigna(this.props.route.params.form.fee);
        this.amount = Amount.fromSigna(this.props.route.params.form.amount);
        this.recipient = Address.create(this.props.route.params.form.recipient);
        this.immutable = this.props.route.params.form.immutable;
        this.message = this.props.route.params.form.message;
    }

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

    handleShare = async () => {
        const deeplink = buildPhoenixDeepLinkURL(this.props.route.params.form);
        const androidLink = isIOS ? '' : `Your Link: ${deeplink}`;
        try {
            await Share.share({
                message: `
Signa Payment Requested from ${this.recipient.getReedSolomonAddress()} for ${this.amount} (+${this.fee})

${androidLink}

Pay using the Phoenix Wallet from https://phoenix-wallet.rocks
`,
                title: `Signa Payment Request`,
                url: deeplink
            }, {
                dialogTitle: `Signa Payment Request`,
                subject: `Signa Payment Request from ${this.recipient.getReedSolomonAddress()}`
            });
        } catch (error) {
            console.log('Sharing error', error);
        }
    };

    handleCopy = () => {
        Clipboard.setString(buildPhoenixDeepLinkURL(this.props.route.params.form));
    };

    render() {
        return (
            <Screen>
                <FullHeightView>
                    <HeaderTitle>{i18n.t(transactions.screens.receive.title)}</HeaderTitle>
                    <View style={styles.details}>
                        <View style={[styles.row, styles.imageWrapper]}>
                            <View style={[styles.col, styles.alignCenter]}>
                                <QRCode
                                    size={200}
                                    value={buildPhoenixDeepLinkURL(this.props.route.params.form)}
                                    backgroundColor={Colors.WHITE}
                                    color={Colors.BLUE_DARKER}
                                    quietZone={8}
                                />
                            </View>
                        </View>
                        <View style={[styles.row, styles.buttonRow]}>
                            <View style={styles.col}>
                                <Button onPress={this.handleShare}>
                                    Share
                                </Button>
                            </View>
                            <View style={styles.col}>
                                <Button onPress={this.handleCopy}>
                                    Copy
                                </Button>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <LabeledTextField
                                label={i18n.t(transactions.screens.receive.recipient)}
                                text={this.recipient.getReedSolomonAddress(false)}
                                color={Colors.WHITE}
                            />
                        </View>
                        <View style={styles.row}>
                            <LabeledTextField
                                label={i18n.t(transactions.screens.send.amountNQT)}
                                text={this.amount.toString()}
                                color={Colors.WHITE}
                            />
                        </View>
                        <View style={styles.row}>
                            <LabeledTextField
                                label={i18n.t(transactions.screens.send.feeNQT)}
                                text={this.fee.toString()}
                                color={Colors.WHITE}
                            />
                        </View>
                        <View style={styles.row}>
                            <LabeledTextField
                                label={i18n.t(transactions.screens.receive.immutable)}
                                text={this.immutable ? 'Yes' : 'No'}
                                color={Colors.WHITE}
                            />
                        </View>

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
        transactions: state.transactions
    };
}

export const ViewQRCodeScreen = connect(mapStateToProps)(withNavigation(ViewQRCode));
