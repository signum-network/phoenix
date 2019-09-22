import { Account } from '@burstjs/core';
import { last } from 'lodash';
import React from 'react';
import { Switch, View } from 'react-native';
import { BInput, KeyboardTypes } from '../../../../core/components/base/BInput';
import { BSelect, SelectItem } from '../../../../core/components/base/BSelect';
import { Button as BButton } from '../../../../core/components/base/Button';
import { Text as BText } from '../../../../core/components/base/Text';
import { i18n } from '../../../../core/i18n';
import { Colors } from '../../../../core/theme/colors';
import { amountToString } from '../../../../core/utils/numbers';
import { ReceiveBurstPayload } from '../../store/actions';
import { transactions } from '../../translations';

interface Props {
  onSubmit: (form: ReceiveBurstPayload) => void;
  accounts: Account[];
}

interface State {
  recipient: Account | null;
  amount: string;
  fee: string;
  immutable: boolean;
}

const styles: any = {
  wrapper: {
    display: 'flex',
    height: '100%'
  },
  form: {
    display: 'flex',
    flexGrow: 1
  },
  col: {
    flex: 1
  },
  row: {
    marginTop: 10,
    flex: 1,
    display: 'flex',
    flexDirection: 'row'
  },
  label: {
    flex: 3
  }
};

export class ReceiveBurstForm extends React.PureComponent<Props, State> {
  state = {
    recipient: null,
    amount: '',
    fee: '',
    immutable: false
  };

  getAccounts = (): Array<SelectItem<Account>> => {
    return this.props.accounts.map((account) => ({
      value: account,
      label: `...${last(account.accountRS.split('-'))}`
    }));
  }

  isSubmitEnabled = () => {
    const { recipient, amount, fee } = this.state;

    return Boolean(
      Number(amount) &&
      Number(fee) &&
      recipient
    );
  }

  handleChangeFromAccount = (recipient: null | Account) => {
    this.setState({ recipient });
  }

  handleAmountChange = (amount: string) => {
    this.setState({ amount });
  }

  handleFeeChange = (fee: string) => {
    this.setState({ fee });
  }

  handleImmutableChange = (immutable: boolean) => {
    this.setState({ immutable });
  }

  handleSubmit = () => {
    const { recipient, amount, fee, immutable } = this.state;

    if (this.isSubmitEnabled()) {
      this.props.onSubmit({
        recipient,
        amount,
        fee,
        immutable
      });
    }
  }

  render () {
    const { immutable, recipient, amount, fee } = this.state;
    const total = Number(amount) + Number(fee);

    return (
      <View style={styles.wrapper}>
        <View style={styles.form}>
        <BSelect
            value={recipient}
            items={this.getAccounts()}
            onChange={this.handleChangeFromAccount}
            title={i18n.t(transactions.screens.receive.recipient)}
            placeholder={i18n.t(transactions.screens.send.selectAccount)}
          />
          <BInput
            value={amount}
            onChange={this.handleAmountChange}
            keyboard={KeyboardTypes.NUMERIC}
            title={i18n.t(transactions.screens.send.amountNQT)}
            placeholder={'0'}
          />
          <BInput
            value={fee}
            onChange={this.handleFeeChange}
            keyboard={KeyboardTypes.NUMERIC}
            title={i18n.t(transactions.screens.send.feeNQT)}
            placeholder={'0'}
          />
          <View style={styles.row}>
            <View style={styles.col}>
              <Switch
                value={immutable}
                onValueChange={this.handleImmutableChange}
              />
            </View>

            <View style={[styles.col, styles.label]}>
                <BText color={Colors.WHITE}>
                  {i18n.t(transactions.screens.receive.immutable)}
                </BText>
            </View>
          </View>
          <BText color={Colors.WHITE}>
            {i18n.t(transactions.screens.send.total, { value: amountToString(total) })}
          </BText>
        </View>
        <View>
          <BButton disabled={!this.isSubmitEnabled()} onPress={this.handleSubmit}>
            {i18n.t(transactions.screens.receive.generate)}
          </BButton>
        </View>
      </View>
    );
  }
}
