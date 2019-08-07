import { Account } from '@burstjs/core';
import React from 'react';
import { Picker, View } from 'react-native';
import { Button } from '../../../../core/components/base/Button';
import { Input, KeyboardTypes } from '../../../../core/components/base/Input';
import { i18n } from '../../../../core/i18n';
import { core } from '../../../../core/translations';
import { auth } from '../../../auth/translations';
import { SendMoneyPayload } from '../../store/actions';
import { transactions } from '../../translations';

interface Props {
  loading: boolean;
  onSubmit: (form: SendMoneyPayload) => void;
  accounts: Account[];
}

type State = SendMoneyPayload;

export class SendBurstForm extends React.PureComponent<Props, State> {
  state = {
    address: '',
    amount: '0',
    fee: '0',
    sender: this.props.accounts[0]
  };

  isSubmitDisabled = (): boolean => {
    const { address, amount, fee, sender } = this.state;
    const { loading } = this.props;

    return loading
      || !address
      || !amount
      || !fee
      || !sender;
  }

  handleSubmit = async () => {
    if (!this.isSubmitDisabled()) {
      this.props.onSubmit(this.state);
    }
  }

  handleRecipientAddressChange = (address: string) => {
    this.setState({ address });
  }

  handleAmountChange = (amount: string) => {
    this.setState({ amount });
  }

  handleFeeChange = (fee: string) => {
    this.setState({ fee });
  }

  listAccounts () {
    return this.props.accounts.map((account, i) => {
      return (
        <Picker.Item label={account.accountRS} value={account} key={i} />
      );
    });
  }

  setSender (): ((itemValue: Account, itemPosition: number) => void) | undefined {
    return (itemValue, _itemIndex) => {
      return this.setState({ ...this.state, sender: itemValue });
    };
  }

  render () {
    const { address, amount, fee } = this.state;

    return (
      <View>
        <Picker
          selectedValue={this.state.address}
          style={{ height: 100, width: '100%', position: 'absolute', bottom: 0, backgroundColor: 'white' }}
          onValueChange={this.setSender()}
        >
            {this.listAccounts()}
        </Picker>
        <Input
          hint={i18n.t(auth.models.account.address)}
          keyboardType={KeyboardTypes.EMAIL}
          placeholder='BURST-____-____-____-_____'
          onChangeText={this.handleRecipientAddressChange}
          value={address}
        />
        <Input
          hint={i18n.t(transactions.screens.send.amountNQT)}
          keyboardType={KeyboardTypes.NUMERIC}
          placeholder={'0'}
          onChangeText={this.handleAmountChange}
          value={amount}
        />
        <Input
          hint={i18n.t(transactions.screens.send.feeNQT)}
          keyboardType={KeyboardTypes.NUMERIC}
          placeholder={'0'}
          onChangeText={this.handleFeeChange}
          value={fee}
        />
        <Button
          onPress={this.handleSubmit}
          loading={this.props.loading}
          disabled={this.isSubmitDisabled()}
        >
          {i18n.t(core.actions.submit)}
        </Button>
      </View>
    );
  }

}
