import {Transaction} from '@signumjs/core';
import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  ListRenderItem,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Clipboard,
} from 'react-native';
import {Text, TextAlign} from '../../../../../core/components/base/Text';
import {Colors} from '../../../../../core/theme/colors';
import {LabeledTextField} from '../../../../../core/components/base/LabeledTextField';
import {mapTxData, TxKeyValue} from './mapTxData';
import {mountTxTypeString} from './mountTxTypeString';
import {FontSizes} from '../../../../../core/theme/sizes';
import {i18n} from '../../../../../core/i18n';
import {auth} from '../../../translations';

interface Props {
  transaction: Transaction;
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: 8,
  },
  header: {},
  data: {
    height: '84%',
    backgroundColor: Colors.TRANSPARENT,
    color: Colors.WHITE,
  },
});

export const TransactionDetails: React.FC<Props> = ({transaction}) => {
  const [data, setData] = useState<TxKeyValue[]>([]);

  useEffect(() => {
    const txData = mapTxData(transaction);
    setData(txData);
  }, [transaction]);

  const touchedItem = (v: string = '') => {
    const value = v.trim();
    if (!value) {
      return;
    }

    Clipboard.setString(value);
    Alert.alert(i18n.t(auth.transactionDetails.copiedSuccessfully, {value}));
  };

  // TODO: show messages here also
  const TouchableLineItem: ListRenderItem<TxKeyValue> = ({item}) => (
    <TouchableOpacity onPress={() => touchedItem(item.value)}>
      <LabeledTextField
        label={item.key}
        text={item.value}
        color={Colors.WHITE}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => touchedItem(transaction.transaction)}>
          <Text
            color={Colors.WHITE}
            textAlign={
              TextAlign.CENTER
            }>{`Id: ${transaction.transaction}`}</Text>
        </TouchableOpacity>
        <Text
          size={FontSizes.SMALL}
          color={Colors.GREY}
          textAlign={TextAlign.CENTER}>
          {mountTxTypeString(transaction)}
        </Text>
      </View>
      <View style={styles.data}>
        <FlatList data={data} renderItem={TouchableLineItem} />
      </View>
    </View>
  );
};
