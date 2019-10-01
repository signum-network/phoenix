import React from 'react';

import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';

import QRCodeScanner, { Event } from 'react-native-qrcode-scanner';
import { Colors } from '../../../core/theme/colors';

export class ScanQRCodeScreen extends React.PureComponent {
  onSuccess = (e: Event) => {
    Linking
      .openURL(e.data)
      .catch((err) => console.error('An error occured', err));
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
