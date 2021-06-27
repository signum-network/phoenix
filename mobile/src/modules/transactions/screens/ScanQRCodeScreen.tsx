import React from 'react';

import {
  Alert,
  StyleSheet,
  TouchableOpacity,
  View,
  Image
} from 'react-native';

import { isBurstAddress } from '@burstjs/util';
import QRCodeScanner, { Event } from 'react-native-qrcode-scanner';
import { connect } from 'react-redux';
import { i18n } from '../../../core/i18n';
import { routes } from '../../../core/navigation/routes';
import { Colors } from '../../../core/theme/colors';
import { transactions } from '../translations';
import { RootStackParamList } from '../../auth/navigation/mainStack';
import { StackNavigationProp } from '@react-navigation/stack';
import { InjectedReduxProps } from '../../../core/interfaces';
import { Screen } from '../../../core/layout/Screen';
import { FullHeightView } from '../../../core/layout/FullHeightView';
import { actionIcons } from '../../../assets/icons';
import { core } from '../../../core/translations';
import { Text } from '../../../core/components/base/Text';
import { HeaderTitle } from '../../../core/components/header/HeaderTitle';

type ScanNavProp = StackNavigationProp<RootStackParamList, 'Scan'>;

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

interface Props extends InjectedReduxProps {
  navigation: ScanNavProp;
}

class ScanQRCodeScreenComponent extends React.PureComponent<Props> {
  onSuccess = (e: Event) => {
    if (e.data.indexOf('requestBurst') === -1 && !isBurstAddress(e.data)) {
      return Alert.alert('Error scanning QR code');
    }
    let url = e.data;
    if (isBurstAddress(e.data)) {
      url = `requestBurst?receiver=${e.data}`;
    }
    this.props.navigation.navigate(routes.send, {
      url
    });
  }

  render () {
    return (
      <Screen>
        <FullHeightView withoutPaddings>
          <View>
            <View style={{ backgroundColor: Colors.BLUE_DARKER, flexDirection: 'row' }}>
            <TouchableOpacity
              style={{ flexDirection: 'row', position: 'absolute', zIndex: 1, left: 10, top: 10 }}
              onPress={this.props.navigation.goBack}>
              <Image source={actionIcons.chevronLeft} style={{ width: 30, height: 30 }} />
              <Text color={Colors.WHITE}>{i18n.t(core.actions.back)}</Text>
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: 'center', margin: 10 }}>
              <HeaderTitle>
                {i18n.t(transactions.screens.scan.title)}
              </HeaderTitle>
            </View>
          </View>
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
          </View>
        </FullHeightView>
      </Screen>
    );
  }
}

function mapStateToProps () {
  return {};
}

export const ScanQRCodeScreen = connect(mapStateToProps)(ScanQRCodeScreenComponent);
