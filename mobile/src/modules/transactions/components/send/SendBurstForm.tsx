import { Account } from '@burstjs/core';
import { isValid } from '@burstjs/util';
import { last } from 'lodash';
import React from 'react';
import { View } from 'react-native';
import { BInput, KeyboardTypes } from '../../../../core/components/base/BInput';
import { BSelect, SelectItem } from '../../../../core/components/base/BSelect';
import { Button as BButton } from '../../../../core/components/base/Button';
import { Text as BText } from '../../../../core/components/base/Text';
import { i18n } from '../../../../core/i18n';
import { Colors } from '../../../../core/theme/colors';
import { amountToString } from '../../../../core/utils/numbers';
import { SendMoneyPayload } from '../../store/actions';
import { transactions } from '../../translations';

interface Props {
  loading: boolean;
  onSubmit: (form: SendMoneyPayload) => void;
  accounts: Account[];
  deepLinkProps?: SendBurstFormState;
}

export interface SendBurstFormState {
  sender: null | Account;
  address: string;
  amount: string;
  fee: string;
  message?: string;
  messageIsText: boolean;
  encrypt: boolean;
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
  }
};

export class SendBurstForm extends React.PureComponent<Props, SendBurstFormState> {
  state = {
    sender: null,
    address: this.props.deepLinkProps && this.props.deepLinkProps.address || 'BURST-',
    amount: this.props.deepLinkProps && this.props.deepLinkProps.amount || '',
    fee: this.props.deepLinkProps && this.props.deepLinkProps.fee || '',
    message: this.props.deepLinkProps && this.props.deepLinkProps.message || undefined,
    messageIsText: this.props.deepLinkProps && this.props.deepLinkProps.messageIsText || true,
    encrypt: this.props.deepLinkProps && this.props.deepLinkProps.encrypt || false,
    immutable: this.props.deepLinkProps && this.props.deepLinkProps.immutable || false
  };

  getAccounts = (): Array<SelectItem<Account>> => {
    return this.props.accounts.map((account) => ({
      value: account,
      label: `...${last(account.accountRS.split('-'))}`
    }));
  }

  isSubmitEnabled = () => {
    const { sender, address, amount, fee } = this.state;
    const { loading } = this.props;

    return Boolean(
      Number(amount) &&
      Number(fee) &&
      sender &&
      isValid(address) &&
      !loading
    );
  }

  handleChangeFromAccount = (sender: null | Account) => {
    this.setState({ sender });
  }

  handleChangeAddress = (address: string) => {
    this.setState({ address });
  }

  handleAmountChange = (amount: string) => {
    this.setState({ amount });
  }

  handleFeeChange = (fee: string) => {
    this.setState({ fee });
  }

  handleSubmit = () => {
    const { address, amount, fee, sender, message, messageIsText, encrypt, immutable } = this.state;

    if (this.isSubmitEnabled()) {
      this.props.onSubmit({
        address,
        amount,
        fee,
        sender,
        message,
        messageIsText,
        immutable,
        encrypt
      });
    }
  }

  render () {
    const { sender, address, amount, fee } = this.state;
    const { loading } = this.props;
    const total = Number(amount) + Number(fee);

    return (
      <View style={styles.wrapper}>
        <View style={styles.form}>
          <BSelect
            value={sender}
            items={this.getAccounts()}
            onChange={this.handleChangeFromAccount}
            title={i18n.t(transactions.screens.send.from)}
            placeholder={i18n.t(transactions.screens.send.selectAccount)}
          />
          <BInput
            value={address}
            onChange={this.handleChangeAddress}
            // disabled={this.state.immutable}
            title={i18n.t(transactions.screens.send.to)}
            placeholder='BURST-____-____-____-_____'
          />
          <BInput
            value={amount}
            onChange={this.handleAmountChange}
            keyboard={KeyboardTypes.NUMERIC}
            // disabled={this.state.immutable}
            title={i18n.t(transactions.screens.send.amountNQT)}
            placeholder={'0'}
          />
          <BInput
            value={fee}
            onChange={this.handleFeeChange}
            keyboard={KeyboardTypes.NUMERIC}
            // disabled={this.state.immutable}
            title={i18n.t(transactions.screens.send.feeNQT)}
            placeholder={'0'}
          />
          <BText color={Colors.WHITE}>
            {i18n.t(transactions.screens.send.total, { value: amountToString(total) })}
          </BText>
        </View>
        <View>
          <BButton loading={loading} disabled={!this.isSubmitEnabled()} onPress={this.handleSubmit}>
            {i18n.t(transactions.screens.send.title)}
          </BButton>
        </View>
      </View>
    );
  }
}
