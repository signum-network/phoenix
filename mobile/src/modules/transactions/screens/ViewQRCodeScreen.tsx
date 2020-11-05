import { convertNQTStringToNumber } from '@burstjs/util';
import React from 'react';
import { Clipboard, Image, Share, StyleSheet, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { Button } from '../../../core/components/base/Button';
import { Text, TextAlign } from '../../../core/components/base/Text';
import { HeaderTitle } from '../../../core/components/header/HeaderTitle';
import { i18n } from '../../../core/i18n';
import { InjectedReduxProps } from '../../../core/interfaces';
import { FullHeightView } from '../../../core/layout/FullHeightView';
import { Screen } from '../../../core/layout/Screen';
import { AppReduxState } from '../../../core/store/app/reducer';
import { ApplicationState } from '../../../core/store/initialState';
import { Colors } from '../../../core/theme/colors';
import { defaultSideOffset, FontSizes, Sizes } from '../../../core/theme/sizes';
import { EnterPasscodeModal } from '../../auth/components/passcode/EnterPasscodeModal';
import { AuthReduxState } from '../../auth/store/reducer';
import { ReceiveBurstPayload } from '../store/actions';
import { TransactionsReduxState } from '../store/reducer';
import { transactions } from '../translations';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../auth/navigation/mainStack';

type ScanRouteProps = RouteProp<RootStackParamList, 'Scan'>;

interface IProps extends InjectedReduxProps {
  app: AppReduxState;
  auth: AuthReduxState;
  transactions: TransactionsReduxState;
  route: ScanRouteProps;
}

type Props = ReceiveBurstPayload & IProps;

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
  qrImage: {
    width: 200,
    height: 200,
    alignSelf: 'center'
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

interface State {
  isPINModalVisible: boolean;
}

class ViewQRCode extends React.PureComponent<Props, State> {

  state = {
    isPINModalVisible: false
  };

  handlePINEntered = () => {
    this.setState({
      isPINModalVisible: false
    });
  }

  handlePINCancel = () => {
    this.setState({
      isPINModalVisible: false
    });
  }

  handleShare = async () => {
    const { amount, fee, recipient } = this.props.route.params.form;
    try {
      await Share.share({
        message: `BURST Payment Requested from ` +
           `${recipient} for ` +
           `${convertNQTStringToNumber(amount)} (+${convertNQTStringToNumber(fee)}).

           Pay using the Phoenix Wallet from burstwallet.io`,
        title: `BURST Request for ${amount}`,
        url: this.buildPhoenixDeepLinkURL()
      });
    // tslint:disable-next-line: no-empty
    } catch (error) {}
  }

  handleCopy = () => {
    Clipboard.setString(this.buildPhoenixDeepLinkURL());
  }

  private buildQRCodeImageURL () {
    return `${this.props.app.appSettings.burstSettings.nodeHost}${this.props.transactions.imageUrl}`;
  }

  private buildPhoenixDeepLinkURL () {
    const { amount, fee, recipient, immutable, feeSuggestionType } = this.props.route.params.form;

    return `burst://requestBurst?receiver=${recipient}` +
           `&amountNQT=${amount}` +
           `&feeNQT=${fee}` +
           `&feeSuggestionType=${feeSuggestionType}` +
           `&immutable=${immutable.toString()}`;
  }

  render () {

    const { amount, fee, recipient, immutable } = this.props.route.params.form;

    const imageUrl = this.props.transactions.imageUrl ?
      this.buildQRCodeImageURL() : false;

    return (
      <Screen>
        <FullHeightView>
          <HeaderTitle>{i18n.t(transactions.screens.receive.title)}</HeaderTitle>
          <View style={styles.details}>
            {imageUrl &&
              <View style={[styles.row, styles.qrImage, styles.imageWrapper]}>
                <View style={[styles.col, styles.alignCenter]}>
                  <Image source={{ uri: imageUrl }} style={styles.qrImage} />
                </View>
              </View>
            }
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
              <View style={styles.col}>
                <Text bold bebasFont color={Colors.WHITE}>
                  {i18n.t(transactions.screens.receive.recipient)}
                </Text>
              </View>
              <View style={[styles.col, styles.valueCol]}>
                <Text
                  bebasFont
                  textAlign={TextAlign.RIGHT}
                  color={Colors.WHITE}
                  size={FontSizes.MEDIUM}
                  numberOfLines={1}
                >
                  {recipient}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text bold bebasFont color={Colors.WHITE}>
                  {i18n.t(transactions.screens.send.amountNQT)}
                </Text>
              </View>
              <View style={[styles.col, styles.valueCol]}>
                <Text
                  bebasFont
                  textAlign={TextAlign.RIGHT}
                  color={Colors.WHITE}
                  size={FontSizes.MEDIUM}
                >
                  {convertNQTStringToNumber(amount).toString()}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text bold bebasFont color={Colors.WHITE}>
                  {i18n.t(transactions.screens.send.feeNQT)}
                </Text>
              </View>
              <View style={[styles.col, styles.valueCol]}>
                <Text
                  bebasFont
                  textAlign={TextAlign.RIGHT}
                  color={Colors.WHITE}
                  size={FontSizes.MEDIUM}
                >
                  {convertNQTStringToNumber(fee).toString()}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text bold bebasFont color={Colors.WHITE}>
                  {i18n.t(transactions.screens.receive.immutable)}
                </Text>
              </View>
              <View style={[styles.col, styles.valueCol]}>
                <Text
                  bebasFont
                  textAlign={TextAlign.RIGHT}
                  color={Colors.WHITE}
                  size={FontSizes.MEDIUM}
                >
                  {immutable ? 'Yes' : 'No'}
                </Text>
              </View>
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

function mapStateToProps (state: ApplicationState) {
  return {
    app: state.app,
    auth: state.auth,
    transactions: state.transactions
  };
}

export const ViewQRCodeScreen = connect(mapStateToProps)(withNavigation(ViewQRCode));
