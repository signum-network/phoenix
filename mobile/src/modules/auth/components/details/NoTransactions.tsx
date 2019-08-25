import React from 'react';
import { View } from 'react-native';
import { Text, TextAlign } from '../../../../core/components/base/Text';
import { i18n } from '../../../../core/i18n';
import { Colors } from '../../../../core/theme/colors';
import { FontSizes } from '../../../../core/theme/sizes';
import { auth } from '../../translations';

const styles: any = {
  view: {
    display: 'flex',
    justifyContent: 'center',
    minHeight: '100%'
  }
};

export class NoTransactions extends React.PureComponent {
  render () {
    return (
        <View style={styles.view}>
            <Text color={Colors.WHITE} size={FontSizes.LARGE} textAlign={TextAlign.CENTER} bebasFont>
                {i18n.t(auth.accountDetails.noTransactions.title)}
            </Text>
        </View>
    );
  }
}
