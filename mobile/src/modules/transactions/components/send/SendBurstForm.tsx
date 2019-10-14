import { Account, SuggestedFees } from '@burstjs/core';
import {
  convertAddressToNumericId,
  convertNQTStringToNumber,
  convertNumericIdToAddress,
  isBurstAddress,
  isValid
} from '@burstjs/util';
import { last } from 'lodash';
import React from 'react';
import { Image, NativeSyntheticEvent, StyleSheet, TextInputFocusEventData, View } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { transactionIcons } from '../../../../assets/icons';
import { BInput, KeyboardTypes } from '../../../../core/components/base/BInput';
import { BSelect, SelectItem } from '../../../../core/components/base/BSelect';
import { Button as BButton } from '../../../../core/components/base/Button';
import { Text as BText } from '../../../../core/components/base/Text';
import { i18n } from '../../../../core/i18n';
import { Colors } from '../../../../core/theme/colors';
import { amountToString } from '../../../../core/utils/numbers';
import { SendMoneyPayload } from '../../store/actions';
import { Recipient, RecipientType, RecipientValidationStatus } from '../../store/utils';
import { transactions } from '../../translations';
import { FeeSlider } from '../fee-slider/FeeSlider';
import { AccountStatusPill } from './AccountStatusPill';

const burstPrefix = 'BURST-';

interface Props {
  loading: boolean;
  onSubmit: (form: SendMoneyPayload) => void;
  onCameraIconPress: () => void;
  onGetAccount: (id: string) => Promise<Account>;
  onGetAlias: (id: string) => Promise<Account>;
  accounts: Account[];
  deepLinkProps?: SendBurstFormState;
  suggestedFees: SuggestedFees | null;
}

export interface SendBurstFormState {
  sender: null | Account;
  amount: string;
  address?: string;
  fee: string;
  message?: string;
  messageIsText: boolean;
  encrypt: boolean;
  immutable: boolean;
  recipient?: Recipient;
  recipientType?: string;
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
  scan: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  },
  cameraIcon: {
    marginTop: 3,
    marginRight: 2,
    width: 20,
    height: 20,
    backgroundColor: Colors.BLACK
  },
  total: {
    marginTop: 10
  }
});

export class SendBurstForm extends React.Component<Props, SendBurstFormState> {

  setupState = (props?: SendBurstFormState) => {
    return {
      sender: null,
      amount: props && props.amount || '',
      fee: props && props.fee ||
           this.props.suggestedFees &&
           convertNQTStringToNumber(this.props.suggestedFees.standard.toString()).toString() || '',
      message: props && props.message || undefined,
      messageIsText: props && props.messageIsText || true,
      encrypt: props && props.encrypt || false,
      immutable: props && props.immutable || false,
      recipient: new Recipient(props && props.address || 'BURST-', props && props.address || '')
    };
  }

  state = this.setupState(this.props.deepLinkProps);

  componentWillReceiveProps = ({ deepLinkProps }: Props) => {
    this.setState(this.setupState(deepLinkProps));
  }

  getAccounts = (): Array<SelectItem<Account>> => {
    return this.props.accounts.filter(({ keys }) => keys && keys.publicKey).map((account) => ({
      value: account,
      label: `...${last(account.accountRS.split('-'))}`
    }));
  }

  applyRecipientType (recipient: string): void {
    const r = recipient.trim();
    let type: RecipientType;

    if (r.length === 0) {
      type = RecipientType.UNKNOWN;
    } else if (r.startsWith(burstPrefix)) {
      type = RecipientType.ADDRESS;
    } else if (/^\d+$/.test(r)) {
      type = RecipientType.ID;
    } else {
      type = RecipientType.ALIAS;
    }

    this.setState({
      recipient: {
        addressRaw: r,
        addressRS: '',
        status: RecipientValidationStatus.UNKNOWN,
        type
      }
    });

    this.validateRecipient(recipient, type);
  }

  async validateRecipient (recipient: string, type: RecipientType): Promise<void> {
    let accountFetchFn;

    switch (type) {
      case RecipientType.ALIAS:
        accountFetchFn = this.props.onGetAlias;
        break;
      case RecipientType.ADDRESS:
        recipient = convertAddressToNumericId(recipient);
      // tslint:disable-next-line:no-switch-case-fall-through
      case RecipientType.ID:
        accountFetchFn = this.props.onGetAccount;
        break;
      default:
      // no op
    }

    if (!accountFetchFn || !recipient) {
      return;
    }

    try {
      const { accountRS } = await accountFetchFn(recipient);
      this.setState({
        recipient: {
          ...this.state.recipient,
          addressRS: accountRS,
          status: RecipientValidationStatus.VALID
        }});
    } catch (e) {
      this.setState({
        recipient: {
          ...this.state.recipient,
          addressRS: (isBurstAddress(recipient)) ?
          recipient : convertNumericIdToAddress(recipient),
          status: RecipientValidationStatus.INVALID
        }
      });
    }
  }

  isSubmitEnabled = () => {
    const { sender, recipient, amount, fee } = this.state;
    const { loading } = this.props;

    return Boolean(
      Number(amount) &&
      Number(fee) &&
      sender &&
      isValid(recipient.addressRS) &&
      !loading
    );
  }

  handleChangeFromAccount = (sender: null | Account) => {
    this.setState({ sender });
  }

  handleChangeAddress = (address: string) => {
    this.setState({
      recipient: {
        ...this.state.recipient,
        addressRaw: address
      }
    });
  }

  handleAddressBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    this.applyRecipientType(e.nativeEvent.text);
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
    const { recipient, amount, fee, sender, message, messageIsText, encrypt, immutable } = this.state;
    const address = recipient.addressRS;

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
    const { sender, recipient, amount, fee } = this.state;
    const { loading, suggestedFees } = this.props;
    const total = Number(amount) + Number(fee);

    const recipientRightIcons = (
      <View style={{ flexDirection: 'row' }}>
        {recipient.addressRaw !== burstPrefix && <AccountStatusPill type={recipient.type} status={recipient.status} />}
        <TouchableHighlight onPress={this.props.onCameraIconPress}>
          <Image source={transactionIcons.camera} style={styles.cameraIcon} />
        </TouchableHighlight>
      </View>
    );

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
            value={recipient.addressRaw}
            onChange={this.handleChangeAddress}
            onBlur={this.handleAddressBlur}
            // disabled={this.state.immutable}
            title={i18n.t(transactions.screens.send.to)}
            placeholder='BURST-____-____-____-_____'
            rightIcons={recipientRightIcons}
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
           <View style={styles.total}>
            <BText bebasFont color={Colors.WHITE}>
              {i18n.t(transactions.screens.send.total, { value: amountToString(total) })}
            </BText>
           </View>
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
