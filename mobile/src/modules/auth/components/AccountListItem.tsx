import { Account } from '@burstjs/core';
import { convertNQTStringToNumber } from '@burstjs/util';
import { last, toNumber } from 'lodash';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import Swipeout from 'react-native-swipeout';
import { actionIcons } from '../../../assets/icons';
import { Text, TextAlign } from '../../../core/components/base/Text';
import { i18n } from '../../../core/i18n';
import { Colors } from '../../../core/theme/colors';
import { defaultSideOffset, FontSizes, Sizes } from '../../../core/theme/sizes';
import { core } from '../../../core/translations';
import { PriceInfoReduxState } from '../../cmc/store/reducer';

interface IProps {
  onPress: (account: Account) => void;
  onDelete: (account: Account) => void;
  account: Account;
  cmc?: PriceInfoReduxState;
}

type Props = IProps;

const styles: any = {
  view: {
    paddingHorizontal: defaultSideOffset,
    paddingVertical: Sizes.MEDIUM,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between'
  },
  col: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  row: {
    display: 'flex',
    width: '100%'
  },
  del: {
    alignSelf: 'center',
    marginTop: Sizes.SMALL
  }
};

export class AccountListItem extends React.PureComponent<Props> {
  handlePress = () => {
    const { onPress, account } = this.props;
    onPress(account);
  }

  handleDelete = () => {
    const { onDelete, account } = this.props;
    onDelete(account);
  }

  getSwipeButtons = () => [
    {
      component: <Image source={actionIcons.del} style={styles.del} />,
      backgroundColor: Colors.RED,
      underlayColor: Colors.GREY,
      onPress: this.handleDelete
    }
  ]

  render () {
    // TODO: add name to account creating and so on
    const { accountRS = '', balanceNQT = '', name = 'unnamed' } = this.props.account;
    const { cmc } = this.props;

    const address = `...${last(accountRS.split('-'))}`;
    const balanceBURST = convertNQTStringToNumber(balanceNQT);
    const balanceBTC = cmc
        ? toNumber(cmc.price_btc) * balanceBURST
        : 0;

    return (
      <Swipeout
        right={this.getSwipeButtons()}
        autoClose={true}
        backgroundColor='transparent'
      >
        <TouchableOpacity style={styles.view} onPress={this.handlePress}>
          <View style={styles.col}>
            <View style={styles.row}>
              <Text bold bebasFont color={Colors.WHITE}>{address}</Text>
            </View>
            {name && (
              <View style={styles.row}>
                <Text color={Colors.WHITE} size={FontSizes.SMALL}>{name}</Text>
              </View>
            )}
          </View>
          <View style={styles.col}>
            <View style={styles.row}>
              <Text bold bebasFont textAlign={TextAlign.RIGHT} color={Colors.WHITE}>
                {i18n.t(core.currency.BURST.value, { value: balanceBURST })}
              </Text>
            </View>
            {cmc && (
              <View style={styles.row}>
                <Text size={FontSizes.SMALL} textAlign={TextAlign.RIGHT} color={Colors.WHITE}>
                  {i18n.t(core.currency.BTC.value, { value: balanceBTC })}
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </Swipeout>
    );
  }
}
