import React from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';

import QRCodeScanner, { Event } from 'react-native-qrcode-scanner';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { Colors } from '../../../core/theme/colors';
import { routes } from '../../../core/navigation/routes';

class ScanQRCodeScreenComponent extends React.PureComponent<NavigationInjectedProps> {
  onSuccess = (e: Event) => {
    this.props.navigation.navigate({
      routeName: routes.send,
      params: {
        url: e.data
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
            Scan Burst QR Code
          </Text>
        }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            <Text style={styles.centerText}>Done</Text>
          </TouchableOpacity>
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
