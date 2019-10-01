import { Account, SuggestedFees } from '@burstjs/core';
import { convertNQTStringToNumber, isValid } from '@burstjs/util';
import Slider from '@react-native-community/slider';
import { last } from 'lodash';
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { BInput, KeyboardTypes } from '../../../../core/components/base/BInput';
import { BSelect, SelectItem } from '../../../../core/components/base/BSelect';
import { Button as BButton } from '../../../../core/components/base/Button';
import { Text as BText } from '../../../../core/components/base/Text';
import { i18n } from '../../../../core/i18n';
import { Colors } from '../../../../core/theme/colors';
import { amountToString } from '../../../../core/utils/numbers';
import { SendMoneyPayload } from '../../store/actions';
import { transactions } from '../../translations';
import { FeeSlider } from '../fee-slider/FeeSlider';
import { transactionIcons } from '../../../../assets/icons';
import { TouchableHighlight } from 'react-native-gesture-handler';

interface Props {
  loading: boolean;
  onSubmit: (form: SendMoneyPayload) => void;
  onCameraIconPress: () => void;
  accounts: Account[];
  deepLinkProps?: SendBurstFormState;
  suggestedFees: SuggestedFees | null;
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

const styles = StyleSheet.create({
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  scan: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  }
});

export class SendBurstForm extends React.Component<Props, SendBurstFormState> {

  setupState = (props?: SendBurstFormState) => {
    return {
      sender: null,
      address: props && props.address || 'BURST-',
      amount: props && props.amount || '',
      fee: props && props.fee ||
           this.props.suggestedFees &&
           convertNQTStringToNumber(this.props.suggestedFees.standard.toString()).toString() || '',
      message: props && props.message || undefined,
      messageIsText: props && props.messageIsText || true,
      encrypt: props && props.encrypt || false,
      immutable: props && props.immutable || false
    };
  }

  state = this.setupState(this.props.deepLinkProps);

  componentWillReceiveProps = ({ deepLinkProps }: Props) => {
    this.setState(this.setupState(deepLinkProps));
  }

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

  handleFeeChangeFromSlider = (fee: number) => {
    this.setState({ fee: amountToString(fee) });
  }

  handleSubmit = () => {
    const { address, amount, fee, sender, message, messageIsText, encrypt, immutable } = this.state;

    if (this.isSubmitEnabled()) {
      this.props.onSubmit({
        address,
        amount,
        fee,
         // @ts-ignore
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
    const { loading, suggestedFees } = this.props;
    const total = Number(amount) + Number(fee);

    return (
      <View style={styles.wrapper}>
        <View style={styles.form}>
          <View style={styles.row}>
            <View style={styles.col}>
              <BSelect
                value={sender}
                items={this.getAccounts()}
                onChange={this.handleChangeFromAccount}
                title={i18n.t(transactions.screens.send.from)}
                placeholder={i18n.t(transactions.screens.send.selectAccount)}
              />
            </View>
            <View style={styles.scan}>
              <TouchableHighlight onPress={this.props.onCameraIconPress}>
                <Image source={transactionIcons.camera} style={{ backgroundColor: Colors.BLUE_DARKER }} />
              </TouchableHighlight>
            </View>
          </View>
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
          {suggestedFees &&
           <FeeSlider
            fee={parseFloat(fee) || 0}
            onSlidingComplete={this.handleFeeChangeFromSlider}
            suggestedFees={suggestedFees}
           />}
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
