import React from 'react';
import { View } from 'react-native';
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
}

type State = SendMoneyPayload;

export class SendBurstForm extends React.PureComponent<Props, State> {
  state = {
    address: '',
    amount: '0',
    fee: '0'
  };

  isSubmitDisabled = (): boolean => {
    const { address, amount, fee } = this.state;
    const { loading } = this.props;

    return loading
      || !address
      || !amount
      || !fee;
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

  render () {
    const { address, amount, fee } = this.state;

    return (
      <View>
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
