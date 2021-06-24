import { Account, SuggestedFees } from '@burstjs/core';
import {
  convertAddressToNumericId,
  convertNQTStringToNumber,
  convertNumberToNQTString,
  convertNumericIdToAddress,
  isBurstAddress,
  sumNQTStringToNumber
} from '@burstjs/util';
import { last } from 'lodash';
import React from 'react';
import {
  Image,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  TextInputEndEditingEventData,
  TouchableOpacity,
  View
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import SwipeButton from 'rn-swipe-button';
import { actionIcons, transactionIcons } from '../../../../assets/icons';
import { BInput, KeyboardTypes } from '../../../../core/components/base/BInput';
import { BSelect, SelectItem } from '../../../../core/components/base/BSelect';
import { Text as BText } from '../../../../core/components/base/Text';
import { i18n } from '../../../../core/i18n';
import { Colors } from '../../../../core/theme/colors';
import { amountToString } from '../../../../core/utils/numbers';
import { SendMoneyPayload } from '../../store/actions';
import { Recipient, RecipientType, RecipientValidationStatus } from '../../store/utils';
import { transactions } from '../../translations';
import { FeeSlider } from '../fee-slider/FeeSlider';
import { AccountStatusPill } from './AccountStatusPill';
import {Amount} from '@signumjs/util';
import {shortRSAddress} from '../../../../core/utils/account';

const AddressPrefix = 'S-';

interface Props {
  loading: boolean;
  onSubmit: (form: SendMoneyPayload) => void;
  onCameraIconPress: () => void;
  onGetAccount: (id: string) => Promise<Account>;
  onGetAlias: (id: string) => Promise<Account>;
  onGetZilAddress: (id: string) => Promise<string | null>;
  accounts: Account[];
  deepLinkProps?: SendBurstFormState;
  suggestedFees: SuggestedFees | null;
}

export interface SendBurstFormState {
  sender: null | Account;
  amount?: string;
  address?: string;
  fee?: string;
  message?: string;
  messageIsText: boolean;
  encrypt: boolean;
  immutable: boolean;
  recipient?: Recipient;
  recipientType?: string;
  showSubmitButton?: boolean;
  addMessage?: boolean;
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
  inputIcon: {
    marginTop: 3,
    marginRight: 2,
    width: 20,
    height: 20,
    backgroundColor: Colors.TRANSPARENT
  },
  total: {
    marginTop: 10
  },
  swipeButtonContainer: {
    marginTop: 20
  },
  chevron: {
    width: 25,
    height: 25,
    marginTop: 3
  },
  balance: {
    marginTop: 3,
    marginRight: 5
  }
});

export class SendBurstForm extends React.Component<Props, SendBurstFormState> {


  getAccounts = (): Array<SelectItem<string>> => {
    return this.props.accounts
      .filter(({ keys }) => keys && keys.publicKey)
      .map(({accountRS}) => ({
        value: accountRS,
        label: shortRSAddress(accountRS)
      }));
  }

  getAccount = (address: string): Account | null => {
    return this.props.accounts
      .find(({ accountRS }) => accountRS === address) || null;
  }

  setupState = (props?: SendBurstFormState) => {
    const accounts = this.getAccounts();
    return {
      sender: accounts.length === 1 ? this.getAccount(accounts[0].value) : null,
      amount: props && props.amount || '',
      fee: props && props.fee ||
           this.props.suggestedFees &&
           convertNQTStringToNumber(this.props.suggestedFees.standard.toString()).toString() || '',
      message: props && props.message || undefined,
      messageIsText: props && typeof props.messageIsText !== 'undefined' ? props.messageIsText : true,
      encrypt: props && props.encrypt || false,
      immutable: props && props.immutable || false,
      recipient: new Recipient(props && props.address || AddressPrefix, props && props.address || ''),
      // showSubmitButton: true,
      showSubmitButton: false,
      addMessage: props && !!props.message || false
    };
  }

  state = this.setupState(this.props.deepLinkProps);

  componentWillReceiveProps = ({ deepLinkProps }: Props) => {
    this.setState(this.setupState(deepLinkProps), () => this.applyRecipientType(this.state.recipient.addressRaw));
  }

  applyRecipientType (recipient: string): void {
    const r = recipient.trim();
    let type: RecipientType;

    if (r.length === 0) {
      type = RecipientType.UNKNOWN;
    } else if (r.toUpperCase().startsWith(AddressPrefix)) {
      type = RecipientType.ADDRESS;
    } else if (r.toUpperCase().endsWith('.ZIL') || r.toUpperCase().endsWith('.CRYPTO')) {
      type = RecipientType.ZIL;
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
    }, () => {
      this.validateRecipient(r, type);
    });

  }

  async validateRecipient (recipient: string, type: RecipientType): Promise<void> {
    let accountFetchFn;
    let formattedAddress: string | null = recipient;

    switch (type) {
      case RecipientType.ALIAS:
        accountFetchFn = this.props.onGetAlias;
        break;
      case RecipientType.ADDRESS:
        formattedAddress = convertAddressToNumericId(recipient);
        accountFetchFn = this.props.onGetAccount;
        break;
      case RecipientType.ZIL:
        try {
          formattedAddress = await this.props.onGetZilAddress(recipient);
          accountFetchFn = this.props.onGetAccount;

          if (formattedAddress === null) {
            this.setState({
              recipient: {
                ...this.state.recipient,
                status: RecipientValidationStatus.INVALID
              }
            });
          }
        } catch (e) {
          this.setState({
            recipient: {
              ...this.state.recipient,
              status: RecipientValidationStatus.ZIL_OUTAGE
            }
          });
        }
        break;
      case RecipientType.ID:
        accountFetchFn = this.props.onGetAccount;
        break;
      default:
      // no op
    }

    if (!accountFetchFn || !formattedAddress) {
      return;
    }

    try {
      const { accountRS } = await accountFetchFn(formattedAddress);
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
          addressRS: (recipient.startsWith(AddressPrefix) || this.state.recipient.type === RecipientType.ZIL) ?
          recipient : convertNumericIdToAddress(recipient),
          status: RecipientValidationStatus.INVALID
        }
      });
    }
  }

  isSubmitEnabled = () => {
    const { sender, recipient, amount, fee } = this.state;
    const { loading } = this.props;

    return true;
    // return Boolean(
    //   Number(amount) &&
    //   Number(fee) &&
    //   sender &&
    //   isValid(recipient.addressRS) &&
    //   !loading
    // );
  }

  handleChangeFromAccount = (sender: string) => {
    this.setState({ sender: this.getAccount(sender) });
  }

  handleChangeAddress = (address: string) => {
    this.setState({
      recipient: {
        ...this.state.recipient,
        addressRaw: address
      }
    });
  }

  handleAddressBlur = (e: NativeSyntheticEvent<TextInputEndEditingEventData>) => {
    this.applyRecipientType(e.nativeEvent.text);
  }

  handleAmountChange = (amount: string) => {
    this.setState({ amount: amount.replace(',', '.') });
  }

  handleFeeChange = (fee: string) => {
    this.setState({ fee: fee.replace(',', '.') });
  }

  handleMessageChange = (message: string) => {
    this.setState({ message });
  }

  setEncryptMessage (encrypt: boolean) {
    this.setState({
      encrypt
    })
  }

  setAddMessage (addMessage: boolean) {
    this.setState({
      addMessage
    })
  }

  handleFeeChangeFromSlider = (fee: number) => {
    this.setState({ fee: amountToString(fee) });
  }

  onSpendAll = () => {
    if (this.state.sender) {
      // @ts-ignore - old version of TS being dumb with nulls
      const maxAmount = sumNQTStringToNumber(this.state.sender.balanceNQT || 0,
        `-${convertNumberToNQTString(+this.state.fee || 0)}`);
      if (Math.sign(maxAmount) !== -1) {
        this.handleAmountChange(maxAmount.toString());
      } else {
        this.handleAmountChange('0');
      }
    }
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
      this.setState({ showSubmitButton: false });
    }
  }

  render () {
    const { sender, recipient, amount, fee, encrypt, addMessage, message } = this.state;
    const { suggestedFees } = this.props;
    const total = Number(amount) + Number(fee);
    // @ts-ignore
    const senderRS = sender && sender.accountRS || null;

    const SenderRightIcons = (
      <View style={{ flexDirection: 'row' }}>
        {this.state.sender &&
          <View style={styles.balance}>
            <BText bebasFont color={Colors.GREY_LIGHT}>
              {Amount.fromPlanck(this.state.sender.balanceNQT).toString()}
            </BText>
          </View>}
        <Image source={actionIcons.chevronDown} style={styles.chevron} />
      </View>
    );

    const RecipientRightIcons = (
      <View style={{ flexDirection: 'row' }}>
        {recipient.addressRaw !== AddressPrefix &&
          <AccountStatusPill address={recipient.addressRS} type={recipient.type} status={recipient.status} />}
        <TouchableOpacity onPress={this.props.onCameraIconPress}>
          <Image source={transactionIcons.camera} style={styles.inputIcon} />
        </TouchableOpacity>
      </View>
    );

    const AmountRightIcons = (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.onSpendAll}>
          <Image source={transactionIcons.sendAll} style={styles.inputIcon} />
        </TouchableOpacity>
      </View>
    );

    return (
      <ScrollView style={styles.wrapper}>
        <View style={styles.form}>
          <BSelect
            value={senderRS}
            items={this.getAccounts()}
            onChange={this.handleChangeFromAccount}
            title={i18n.t(transactions.screens.send.from)}
            placeholder={i18n.t(transactions.screens.send.selectAccount)}
            rightElement={SenderRightIcons}
          />
          <BInput
            autoCapitalize='characters'
            value={recipient.addressRaw}
            onChange={this.handleChangeAddress}
            onEndEditing={this.handleAddressBlur}
            editable={!this.state.immutable}
            title={i18n.t(transactions.screens.send.to)}
            placeholder='S-____-____-____-_____'
            rightIcons={RecipientRightIcons}
          />
          <BInput
            value={amount}
            onChange={this.handleAmountChange}
            keyboard={KeyboardTypes.NUMERIC}
            editable={!this.state.immutable}
            title={i18n.t(transactions.screens.send.amountNQT)}
            placeholder={'0'}
            rightIcons={AmountRightIcons}
          />
          <BInput
            value={fee}
            onChange={this.handleFeeChange}
            keyboard={KeyboardTypes.NUMERIC}
            editable={!this.state.immutable}
            title={i18n.t(transactions.screens.send.feeNQT)}
            placeholder={'0'}
          />
          {suggestedFees &&
           <FeeSlider
            disabled={this.state.immutable}
            fee={parseFloat(fee) || 0}
            onSlidingComplete={this.handleFeeChangeFromSlider}
            suggestedFees={suggestedFees}
           />}

          <View style={{flexDirection:'row', marginLeft: 5}}>
            <CheckBox
              disabled={false}
              value={addMessage}
              onValueChange={() => addMessage ? this.setAddMessage(false) : this.setAddMessage(true)}
            />
            <View style={{marginTop:10, marginLeft:10}}>
              <TouchableOpacity onPress={() => addMessage ? this.setAddMessage(false) : this.setAddMessage(true)}>
                <BText bebasFont color={Colors.GREY_LIGHT}>
                  {i18n.t(transactions.screens.send.addMessage)}
                </BText>
              </TouchableOpacity>
            </View>
          </View>

          {addMessage && (
              <>
                <BInput
                  value={message || ''}
                  onChange={this.handleMessageChange}
                  title={i18n.t(transactions.screens.send.message)}
                />

                <View style={{flexDirection:'row', marginTop:10, marginLeft: 5}}>
                  <CheckBox
                    disabled={false}
                    value={encrypt}
                    onValueChange={() => encrypt ? this.setEncryptMessage(false) : this.setEncryptMessage(true)}
                  />
                  <View style={{marginTop:10, marginLeft:10}}>
                    <TouchableOpacity onPress={() => encrypt ? this.setEncryptMessage(false) : this.setEncryptMessage(true)}>
                      <BText bebasFont color={Colors.GREY_LIGHT}>
                        {i18n.t(transactions.screens.send.encrypt)}
                      </BText>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
           <View style={styles.total}>
            <BText bebasFont color={Colors.WHITE}>
              {i18n.t(transactions.screens.send.total, { value: amountToString(total) })}
            </BText>
           </View>
        </View>
        <View style={styles.swipeButtonContainer}>
          {/*{this.state.showSubmitButton ? <SwipeButton*/}
          {/*  disabledRailBackgroundColor={Colors.GREY}*/}
          {/*  disabledThumbIconBackgroundColor={Colors.GREY}*/}
          {/*  disabledThumbIconBorderColor={Colors.BLUE_DARKER}*/}
          {/*  thumbIconBackgroundColor={Colors.WHITE}*/}
          {/*  thumbIconImageSource={actionIcons.chevronRight}*/}
          {/*  onSwipeSuccess={this.handleSubmit}*/}
          {/*  shouldResetAfterSuccess={true}*/}
          {/*  title={i18n.t(transactions.screens.send.button)}*/}
          {/*  railBackgroundColor={Colors.BLACK}*/}
          {/*  railBorderColor={Colors.BLUE_DARKER}*/}
          {/*  railFillBackgroundColor={Colors.BLUE_DARKER}*/}
          {/*  railFillBorderColor={Colors.BLUE_DARKER}*/}
          {/*  titleColor={this.isSubmitEnabled() ? Colors.WHITE : Colors.BLACK}*/}
          {/*  disabled={!this.isSubmitEnabled()}*/}
          {/*/> : null}*/}
        </View>
      </ScrollView>
    );
  }
}
