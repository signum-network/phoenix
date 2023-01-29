import React, {useEffect} from 'react';

import {Alert, StyleSheet, TouchableOpacity, View, Image} from 'react-native';

import {i18n} from '../../../core/i18n';
import {routes} from '../../../core/navigation/routes';
import {Colors} from '../../../core/theme/colors';
import {transactions} from '../translations';
import {Screen} from '../../../core/layout/Screen';
import {FullHeightView} from '../../../core/layout/FullHeightView';
import {actionIcons} from '../../../assets/icons';
import {HeaderTitle} from '../../../core/components/header/HeaderTitle';
import {
  getDeeplinkInfo,
  SupportedDeeplinkActions,
} from '../../../core/utils/deeplink';
import {useNavigation} from '@react-navigation/native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {BarcodeFormat, useScanBarcodes} from 'vision-camera-code-scanner';

const styles = StyleSheet.create({
  topView: {
    backgroundColor: Colors.BLUE_DARKER,
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: Colors.WHITE,
  },
  buttonTouchable: {
    padding: 16,
  },
});

export const ScanQRCodeScreen: React.FC = () => {
  const navigation = useNavigation();
  const devices = useCameraDevices();
  const device = devices.back;

  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });

  useEffect(() => {
    if (barcodes && barcodes[0].displayValue) {
      try {
        const {action, decodedPayload} = getDeeplinkInfo(
          barcodes[0].displayValue,
        );

        if (action !== SupportedDeeplinkActions.Pay) {
          return Alert.alert(`Unsupported Deeplink Action: ${action}`);
        }
        // @ts-ignore
        navigation.navigate(routes.send, {payload: decodedPayload});
      } catch (e) {
        return Alert.alert('Unknown QR Code');
      }
    }
  }, []);

  if (device == null)
    return (
      <Screen>
        <View></View>
      </Screen>
    );

  return (
    <Screen>
      <FullHeightView withoutPaddings>
        <View>
          <View
            style={{
              backgroundColor: Colors.BLUE_DARKER,
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                position: 'absolute',
                zIndex: 1,
                left: 10,
                top: 10,
              }}
              onPress={() => navigation.goBack()}>
              <Image
                source={actionIcons.chevronLeft}
                style={{width: 30, height: 30}}
              />
            </TouchableOpacity>
            <View style={{flex: 1, alignItems: 'center', margin: 10}}>
              <HeaderTitle>
                {i18n.t(transactions.screens.scan.title)}
              </HeaderTitle>
            </View>
          </View>
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            frameProcessor={frameProcessor}
            frameProcessorFps={5}
          />
        </View>
      </FullHeightView>
    </Screen>
  );
};
