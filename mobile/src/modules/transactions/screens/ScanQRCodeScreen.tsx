import React from 'react';

import {
  Alert,
  StyleSheet,
  Text
} from 'react-native';

import { isBurstAddress } from '@burstjs/util';
import QRCodeScanner, { Event } from 'react-native-qrcode-scanner';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { i18n } from '../../../core/i18n';
import { routes } from '../../../core/navigation/routes';
import { Colors } from '../../../core/theme/colors';
import { transactions } from '../translations';

class ScanQRCodeScreenComponent extends React.PureComponent<NavigationInjectedProps> {
  onSuccess = (e: Event) => {
    if (e.data.indexOf('requestBurst') === -1 && !isBurstAddress(e.data)) {
      return Alert.alert('Error scanning QR code');
    }
    let url = e.data;
    if (isBurstAddress(e.data)) {
      url = `requestBurst?receiver=${e.data}`;
    }
    this.props.navigation.navigate({
      routeName: routes.send,
      params: {
        url
      }
    });
  }

  render () {
    return (
      <QRCodeScanner
        topViewStyle={styles.topView}
        bottomViewStyle={styles.topView}
        onRead={this.onSuccess}
        topContent={
          <Text style={styles.centerText}>
            {i18n.t(transactions.screens.scan.title)}
          </Text>
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  topView: {
    backgroundColor: Colors.BLUE_DARKER
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: Colors.GREY_LIGHT
  },
  buttonTouchable: {
    padding: 16
  }
});

function mapStateToProps () {
  return {};
}

export const ScanQRCodeScreen = connect(mapStateToProps)(withNavigation(ScanQRCodeScreenComponent));
