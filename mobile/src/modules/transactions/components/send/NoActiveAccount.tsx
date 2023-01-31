import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, TextAlign} from '../../../../core/components/base/Text';
import {Colors} from '../../../../core/theme/colors';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {routes} from '../../../../core/navigation/routes';
import {i18n} from '../../../../core/i18n';
import {FontSizes} from '../../../../core/theme/sizes';
import {transactions} from '../../translations';
import {Button, ButtonThemes} from '../../../../core/components/base/Button';
import {StackNavigationProp} from '@react-navigation/stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {
  BottomTabNavigatorParamList,
  SendStackParamList,
} from '../../../auth/navigation/mainStack';

const styles = StyleSheet.create({
  view: {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
  },
});

type NoActiveAccountNavProp = CompositeNavigationProp<
  StackNavigationProp<SendStackParamList, 'Send'>,
  BottomTabNavigationProp<BottomTabNavigatorParamList, 'SendStack'>
>;

export const NoActiveAccount = () => {
  const navigation = useNavigation<NoActiveAccountNavProp>();

  // @ts-ignore
  const t = (item: string): string =>
    i18n.t(transactions.screens.send.noActiveAccount[item]);

  const gotoAddAccountScreen = () => {
    navigation.navigate('Home', {screen: 'AddAccount'});
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.view}
      onPress={gotoAddAccountScreen}>
      <Text
        color={Colors.WHITE}
        size={FontSizes.LARGE}
        textAlign={TextAlign.CENTER}
        bebasFont>
        {t('title')}
      </Text>
      <Text color={Colors.WHITE} textAlign={TextAlign.CENTER}>
        {t('hint')}
      </Text>
      <Button theme={ButtonThemes.ACCENT} onPress={gotoAddAccountScreen}>
        {t('button')}
      </Button>
    </TouchableOpacity>
  );
};
