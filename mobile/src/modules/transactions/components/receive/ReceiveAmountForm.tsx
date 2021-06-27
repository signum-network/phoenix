import { Account, SuggestedFees } from '@signumjs/core';
import React from 'react';
import { View } from 'react-native';
import { BInput, KeyboardTypes } from '../../../../core/components/base/BInput';
import { BSelect, SelectItem } from '../../../../core/components/base/BSelect';
import { Button as BButton } from '../../../../core/components/base/Button';
import { SwitchItem } from '../../../../core/components/base/SwitchItem';
import { Text as BText } from '../../../../core/components/base/Text';
import { i18n } from '../../../../core/i18n';
import { Colors } from '../../../../core/theme/colors';
import { amountToString } from '../../../../core/utils/numbers';
import { ReceiveAmountPayload } from '../../store/actions';
import { transactions } from '../../translations';
import { FeeSlider } from '../fee-slider/FeeSlider';
import {Amount} from '@signumjs/util';
import {trimAddressPrefix} from '../../../../core/utils/account';

interface Props {
  onSubmit: (form: ReceiveAmountPayload) => void;
  accounts: Account[];
  suggestedFees: SuggestedFees | null;
}

interface State {
  recipient: Account | null;
  amount: string;
  fee: string;
  immutable: boolean;
}

const styles: any = {
  wrapper: {
    height: '90%'
  },
  form: {
    display: 'flex',
    flex: 1
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
  },
  slider: {
    width: '100%',
    height: 40
  },
  total: {
    marginTop: 10
  }
};

export class ReceiveAmountForm extends React.PureComponent<Props, State> {
  state = {
    recipient: null,
    amount: '',
    fee: this.props.suggestedFees && Amount.fromPlanck(this.props.suggestedFees.standard).getSigna() || '',
    immutable: false
  };

  getAccounts = (): Array<SelectItem<string>> => {
    return this.props.accounts
      .filter(({ keys }) => keys && keys.publicKey)
      .map((account) => ({
        value: account.accountRS,
        label: trimAddressPrefix(account.accountRS),
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
        // @ts-ignore - ts bug I think
        recipient,
        amount,
        fee,
        immutable
      });
    }
  }

  handleFeeChangeFromSlider = (fee: number) => {
    this.setState({ fee: amountToString(fee) });
  }

  render () {
    const { immutable, recipient, amount, fee } = this.state;
    const total = Number(amount) + Number(fee);
    const { suggestedFees } = this.props;

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
          {suggestedFees &&
           <FeeSlider
            fee={parseFloat(fee) || 0}
            onSlidingComplete={this.handleFeeChangeFromSlider}
            suggestedFees={suggestedFees}
           />}
            <SwitchItem
              text={(
                <BText bebasFont color={Colors.WHITE}>{i18n.t(transactions.screens.receive.immutable)}</BText>
              )}
              value={immutable}
              onChange={this.handleImmutableChange}
            />
          <View style={styles.total}>
            <BText bebasFont color={Colors.WHITE}>
              {i18n.t(transactions.screens.send.total, { value: amountToString(total) })}
            </BText>
          </View>
          <BButton disabled={!this.isSubmitEnabled()} onPress={this.handleSubmit}>
            {i18n.t(transactions.screens.receive.generate)}
          </BButton>
        </View>
      </View>
    );
  }
}
