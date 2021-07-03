import {Address, Account, SuggestedFees} from '@signumjs/core';
import {Amount} from '@signumjs/util';
import React, {createRef} from 'react';
import {
    Image,
    NativeSyntheticEvent,
    ScrollView,
    StyleSheet,
    TextInputEndEditingEventData,
    TouchableOpacity,
    View,
    SafeAreaView
} from 'react-native';
import SwipeButton from 'rn-swipe-button';
import {actionIcons, transactionIcons} from '../../../../assets/icons';
import {BInput, KeyboardTypes} from '../../../../core/components/base/BInput';
import {BSelect, SelectItem} from '../../../../core/components/base/BSelect';
import {Text as BText} from '../../../../core/components/base/Text';
import {i18n} from '../../../../core/i18n';
import {Colors} from '../../../../core/theme/colors';
import {amountToString} from '../../../../core/utils/numbers';
import {SendAmountPayload} from '../../store/actions';
import {Recipient, RecipientType, RecipientValidationStatus} from '../../store/utils';
import {transactions} from '../../translations';
import {FeeSlider} from '../fee-slider/FeeSlider';
import {AccountStatusPill} from './AccountStatusPill';
import {isValidReedSolomonAddress, shortenRSAddress} from '../../../../core/utils/account';
import {BCheckbox} from '../../../../core/components/base/BCheckbox';

const AddressPrefix = 'S-';

interface Props {
    loading: boolean;
    onSubmit: (form: SendAmountPayload) => void;
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
        height: '62%',
    },
    form: {
        display: 'flex',
        flexGrow: 1,
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
    private scrollViewRef = createRef<ScrollView>();

    constructor(props) {
        super(props);
        this.state = this.setupState(props.deepLinkProps);
    }

    getAccounts = (): Array<SelectItem<string>> => {
        return this.props.accounts
            .filter(({type}) => type !== 'offline')
            .map(({accountRS}) => ({
                value: accountRS,
                label: shortenRSAddress(accountRS)
            }));
    }

    getAccount = (address: string): Account | null => {
        return this.props.accounts
            .find(({accountRS}) => accountRS === address) || null;
    }

    setupState = (deeplinkProps?: SendBurstFormState) => {
        const accounts = this.getAccounts();

        return {
            sender: accounts.length === 1 ? this.getAccount(accounts[0].value) : null,
            amount: deeplinkProps && deeplinkProps.amount || '',
            fee: deeplinkProps && deeplinkProps.fee ||
                this.props.suggestedFees &&
                Amount.fromPlanck(this.props.suggestedFees.standard).getSigna() || '',
            message: deeplinkProps && deeplinkProps.message || undefined,
            messageIsText: deeplinkProps && typeof deeplinkProps.messageIsText !== 'undefined' ? deeplinkProps.messageIsText : true,
            encrypt: deeplinkProps && deeplinkProps.encrypt || false,
            immutable: deeplinkProps && deeplinkProps.immutable || false,
            recipient: new Recipient(deeplinkProps && deeplinkProps.address || AddressPrefix, deeplinkProps && deeplinkProps.address || ''),
            showSubmitButton: true,
            addMessage: deeplinkProps && !!deeplinkProps.message || false
        };
    };

    UNSAFE_componentWillReceiveProps = ({deepLinkProps}: Props) => {
        this.setState(this.setupState(deepLinkProps), () => this.applyRecipientType(this.state.recipient.addressRaw));
    };

    applyRecipientType(recipient: string): void {
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

    async validateRecipient(recipient: string, type: RecipientType): Promise<void> {
        let accountFetchFn;
        let formattedAddress: string | null = recipient;

        switch (type) {
            case RecipientType.ALIAS:
                accountFetchFn = this.props.onGetAlias;
                break;
            case RecipientType.ADDRESS:
                formattedAddress = Address.fromReedSolomonAddress(recipient).getNumericId();
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
            console.log('Trying address', formattedAddress);
            const {accountRS} = await accountFetchFn(formattedAddress);
            this.setState({
                recipient: {
                    ...this.state.recipient,
                    addressRS: accountRS,
                    status: RecipientValidationStatus.VALID
                }
            });
            console.log('Valid', accountRS)
        } catch (e) {

            console.log('Invalid', recipient)

            this.setState({
                recipient: {
                    ...this.state.recipient,
                    addressRS: (recipient.startsWith(AddressPrefix) || this.state.recipient?.type === RecipientType.ZIL)
                        ? recipient
                        : Address.fromNumericId(recipient).getReedSolomonAddress(),
                    status: RecipientValidationStatus.INVALID
                }
            });
        }
    }


    isSubmitEnabled = () => {
        const {sender, recipient, amount, fee} = this.state;
        const {loading} = this.props;

        return Boolean(
            Number(amount) &&
            Number(fee) &&
            sender &&
            isValidReedSolomonAddress(recipient.addressRS) &&
            !loading
        );
    };

    handleChangeFromAccount = (sender: string) => {
        this.setState({sender: this.getAccount(sender)});
    };

    handleChangeAddress = (address: string) => {
        this.setState({
            recipient: {
                ...this.state.recipient,
                addressRaw: address
            }
        });
    };

    handleAddressBlur = (e: NativeSyntheticEvent<TextInputEndEditingEventData>) => {
        this.applyRecipientType(e.nativeEvent.text);
    };

    handleAmountChange = (amount: string) => {
        this.setState({amount: amount.replace(',', '.')});
    };

    handleFeeChange = (fee: string) => {
        this.setState({fee: fee.replace(',', '.')});
    };

    handleMessageChange = (message: string) => {
        this.setState({message});
    };

    setEncryptMessage(encrypt: boolean): void {
        this.setState({
            encrypt
        });
    }

    setAddMessage(addMessage: boolean): void {
        this.setState({
            addMessage
        }, () => {
            setTimeout(() => {
                // @ts-ignore
                this.scrollViewRef.current.scrollToEnd();
            }, 100);
        });
    }

    handleFeeChangeFromSlider = (fee: number) => {
        this.setState({fee: amountToString(fee)});
    };

    onSpendAll = () => {
        if (!this.state.sender) {
            return;
        }

        const maxAmount = Amount.fromPlanck(this.state.sender.balanceNQT)
            .add(Amount.fromSigna(this.state.fee || 0));

        this.handleAmountChange(maxAmount.greater(Amount.Zero()) ? maxAmount.getSigna() : '0');
    };

    handleSubmit = () => {

        if (!this.isSubmitEnabled()) {
            return;
        }

        const {recipient, amount, fee, sender, message, messageIsText, encrypt, immutable} = this.state;
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
        this.setState({showSubmitButton: false});
    };

    render() {
        const {sender, recipient, amount, fee, encrypt, addMessage, message} = this.state;
        const {suggestedFees} = this.props;
        const total = Amount.fromSigna(amount || '0').add(Amount.fromSigna(fee || '0'));
        const senderRS = sender && sender.accountRS || null;
        const isSubmitEnabled = this.isSubmitEnabled();
        const swipeButtonTitle = isSubmitEnabled
            ? i18n.t(transactions.screens.send.button.enabled)
            : i18n.t(transactions.screens.send.button.disabled);


        const SenderRightIcons = (
            <View style={{flexDirection: 'row'}}>
                {this.state.sender &&
                <View style={styles.balance}>
                    <BText bebasFont color={Colors.GREY_LIGHT}>
                        {Amount.fromPlanck(this.state.sender.balanceNQT).toString()}
                    </BText>
                </View>}
                <Image source={actionIcons.chevronDown} style={styles.chevron}/>
            </View>
        );

        const RecipientRightIcons = (
            <View style={{flexDirection: 'row'}}>
                {recipient.addressRaw !== AddressPrefix &&
                <AccountStatusPill address={recipient.addressRS} type={recipient.type} status={recipient.status}/>}
                <TouchableOpacity onPress={this.props.onCameraIconPress}>
                    <Image source={transactionIcons.camera} style={styles.inputIcon}/>
                </TouchableOpacity>
            </View>
        );

        const AmountRightIcons = (
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={this.onSpendAll}>
                    <Image source={transactionIcons.sendAll} style={styles.inputIcon}/>
                </TouchableOpacity>
            </View>
        );

        return (
            <SafeAreaView>

                <View>
                    <BSelect
                        value={senderRS}
                        items={this.getAccounts()}
                        onChange={this.handleChangeFromAccount}
                        title={i18n.t(transactions.screens.send.from)}
                        placeholder={i18n.t(transactions.screens.send.selectAccount)}
                        rightElement={SenderRightIcons}
                    />
                </View>
                <ScrollView style={styles.wrapper} ref={this.scrollViewRef}>

                    <View style={styles.form}>
                        <BInput
                            // autoCapitalize='characters'
                            value={recipient.addressRaw}
                            onChange={this.handleChangeAddress}
                            onEndEditing={this.handleAddressBlur}
                            editable={!this.state.immutable}
                            title={i18n.t(transactions.screens.send.to)}
                            placeholder={i18n.t(transactions.screens.send.to)}
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

                        <BCheckbox
                            label={i18n.t(transactions.screens.send.addMessage)}
                            value={addMessage || false}
                            onCheck={(checked) => this.setAddMessage(checked)}
                        />

                        {addMessage && (
                            <>
                                <BInput
                                    value={message || ''}
                                    onChange={this.handleMessageChange}
                                    title={i18n.t(transactions.screens.send.message)}
                                />

                                <BCheckbox
                                    label={i18n.t(transactions.screens.send.encrypt)}
                                    value={encrypt || false}
                                    onCheck={(checked) => this.setEncryptMessage(checked)}
                                />
                            </>
                        )}
                    </View>
                </ScrollView>
                <View>
                    <View style={styles.total}>
                        <BText bebasFont color={Colors.WHITE}>
                            {i18n.t(transactions.screens.send.total, {value: total.getSigna()})}
                        </BText>
                    </View>
                    {this.state.showSubmitButton && <SwipeButton
                        disabledRailBackgroundColor={Colors.PINK}
                        disabledThumbIconBackgroundColor={Colors.GREY}
                        disabledThumbIconBorderColor={Colors.BLUE_DARKER}
                        thumbIconBackgroundColor={Colors.WHITE}
                        thumbIconImageSource={actionIcons.chevronRight}
                        onSwipeSuccess={this.handleSubmit}
                        shouldResetAfterSuccess={true}
                        title={swipeButtonTitle}
                        railBackgroundColor={Colors.GREEN_LIGHT}
                        railBorderColor={Colors.BLUE_DARKER}
                        railFillBackgroundColor={Colors.BLUE_DARKER}
                        railFillBorderColor={Colors.BLUE_DARKER}
                        titleColor={Colors.BLACK}
                        disabled={!isSubmitEnabled}
                    />}
                </View>
            </SafeAreaView>
        );
    }
}
