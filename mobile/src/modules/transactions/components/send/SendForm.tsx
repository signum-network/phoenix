import {Account, Address, SuggestedFees} from '@signumjs/core';
import {Amount} from '@signumjs/util';
import React, {createRef} from 'react';
import {Image, NativeSyntheticEvent, ScrollView, StyleSheet, TextInputEndEditingEventData, TouchableOpacity, View} from 'react-native';
import SwipeButton from 'rn-swipe-button';
import {actionIcons, transactionIcons} from '../../../../assets/icons';
import {BInput, KeyboardTypes} from '../../../../core/components/base/BInput';
import {BSelect, SelectItem} from '../../../../core/components/base/BSelect';
import {Text, Text as BText, TextAlign} from '../../../../core/components/base/Text';
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
import {FontSizes, Sizes} from '../../../../core/theme/sizes';
import {AmountText} from '../../../../core/components/base/Amount';
import {DangerBox} from './DangerBox';
import {AccountBalances, getBalancesFromAccount, ZeroAcountBalances} from '../../../../core/utils/balance/getBalancesFromAccount';

const AddressPrefix = 'S-';

interface Props {
    loading: boolean;
    onSubmit: (form: SendAmountPayload) => void;
    onCameraIconPress: () => void;
    onGetAccount: (id: string) => Promise<Account>;
    onGetAlias: (id: string) => Promise<Account>;
    onGetZilAddress: (id: string) => Promise<string | null>;
    accounts: Account[];
    suggestedFees: SuggestedFees | null;
    deepLinkProps?: SendFormState;
}

export interface SendFormState {
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
    confirmedRisk?: boolean;
    balances?: AccountBalances;
}

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        height: '58%',
    },
    form: {
        display: 'flex',
        // flexGrow: 1,
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
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10
    },
    chevron: {
        width: 25,
        height: 25,
        marginTop: 3,
        transform: [{rotate: '-90deg' }],
    },
    balance: {
        marginTop: 3,
        marginRight: 5
    },
    sendIcon: {
        fontSize: FontSizes.SMALL,
        width: 8,
        height: 8,
        color: Colors.RED
    }
});

const subBalanceStyles = StyleSheet.create({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: Sizes.MEDIUM,
    },
});

const Balances: React.FC<{ balances?: AccountBalances}> = ({balances = ZeroAcountBalances}) => (
    <View style={subBalanceStyles.root}>
        <Text color={Colors.GREY} size={FontSizes.SMALL}>Available:</Text>
        <AmountText color={Colors.GREY} size={FontSizes.SMALL} amount={balances.availableBalance}/>
        <Text color={Colors.GREY} size={FontSizes.SMALL}>Locked:</Text>
        <AmountText color={Colors.GREY} size={FontSizes.SMALL} amount={balances.lockedBalance}/>
    </View>
);


export class SendForm extends React.Component<Props, SendFormState> {
    private scrollViewRef = createRef<ScrollView>();

    constructor(props) {
        super(props);
        this.state = this.setupState(props.deepLinkProps);
    }

    getAccounts = (): Array<SelectItem<string>> => {
        return this.props.accounts
            .filter(({type}) => type !== 'offline')
            .map(({accountRS, name}) => ({
                value: accountRS,
                label: name || accountRS
            }));
    }

    getAccount = (address: string): Account | null => {
        return this.props.accounts
            .find(({accountRS}) => accountRS === address) || null;
    }

    setupState = (deeplinkProps?: SendFormState) => {
        const accounts = this.getAccounts();
        const sender = accounts.length === 1 ? this.getAccount(accounts[0].value) : null;
        const balances = getBalancesFromAccount(sender);
        return {
            sender,
            amount: deeplinkProps && deeplinkProps.amount || '0',
            fee: deeplinkProps && deeplinkProps.fee ||
                this.props.suggestedFees &&
                Amount.fromPlanck(this.props.suggestedFees.standard).getSigna() || '0',
            message: deeplinkProps && deeplinkProps.message || undefined,
            messageIsText: deeplinkProps && typeof deeplinkProps.messageIsText !== 'undefined' ? deeplinkProps.messageIsText : true,
            encrypt: deeplinkProps && deeplinkProps.encrypt || false,
            immutable: deeplinkProps && deeplinkProps.immutable || false,
            recipient: new Recipient(deeplinkProps && deeplinkProps.address || AddressPrefix, deeplinkProps && deeplinkProps.address || ''),
            showSubmitButton: true,
            addMessage: deeplinkProps && !!deeplinkProps.message || false,
            confirmedRisk: false,
            balances,
        };
    }

    UNSAFE_componentWillReceiveProps = ({deepLinkProps}: Props) => {
        if (!deepLinkProps) return;
        this.setState(this.setupState(deepLinkProps), () => this.applyRecipientType(this.state.recipient.addressRaw));
    }

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
            const {accountRS} = await accountFetchFn(formattedAddress);
            this.setState({
                confirmedRisk: true,
                recipient: {
                    ...this.state.recipient,
                    addressRS: accountRS,
                    status: RecipientValidationStatus.VALID
                }
            });
        } catch (e) {
            let addressRS = '<Invalid Address>';
            try{
                addressRS = this.state.recipient.type === RecipientType.ZIL
                    ? recipient : Address.create(recipient).getReedSolomonAddress();
            }catch(e){
                // no op
            }
            console.log('Invalid/Unknown Address', recipient);

            this.setState({
                confirmedRisk: false,
                recipient: {
                    ...this.state.recipient,
                    addressRS,
                    status: RecipientValidationStatus.INVALID
                }
            });
        }
    }

    hasSufficientBalance = (): boolean => {
        const {amount, balances} = this.state;
        return balances.availableBalance.greaterOrEqual(Amount.fromSigna(amount || 0));
    }

    isSubmitEnabled = () => {
        const {sender, recipient, amount, fee, confirmedRisk} = this.state;
        const {loading} = this.props;

        return Boolean(
            Number(amount) &&
            Number(fee) &&
            sender &&
            isValidReedSolomonAddress(recipient?.addressRS) &&
            !loading &&
            confirmedRisk &&
            this.hasSufficientBalance()
        );
    }

    handleChangeFromAccount = (sender: string) => {
        const account = this.getAccount(sender);
        const balances = getBalancesFromAccount(account);

        this.setState({sender: account, balances });
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
        this.setState({amount: amount.replace(',', '.')});
    }

    handleFeeChange = (fee: string) => {
        this.setState({fee: fee.replace(',', '.')});
    }

    handleMessageChange = (message: string) => {
        this.setState({message});
    }

    setEncryptMessage(encrypt: boolean): void {
        this.setState({
            encrypt
        });
    }

    setConfirmedRisk = (confirmedRisk: boolean) => {
        console.log('setConfirmedRisk', confirmedRisk)
        this.setState({confirmedRisk});
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
    }

    onSpendAll = () => {
        const  {sender, fee} = this.state;
        if (!sender) {
            return;
        }

        const balancesFromAccount = getBalancesFromAccount(sender);
        const maxAmount = balancesFromAccount.availableBalance.subtract(Amount.fromSigna(fee || 0));
        this.handleAmountChange(maxAmount.less(Amount.Zero()) ? '0' : maxAmount.getSigna());
    }

    handleSubmit = () => {

        if (!this.isSubmitEnabled()) {
            return;
        }

        const {recipient, amount, fee, sender, message, messageIsText, encrypt, immutable} = this.state;
        const address = recipient.addressRS;
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
        this.setState({showSubmitButton: false});
    }

    shouldShowAliasWarning = (): boolean => {
        const {type, status} = this.state.recipient;
        return type === RecipientType.ALIAS && status === RecipientValidationStatus.INVALID;

    }

    shouldConfirmRisk = (): boolean => {
        const {recipient, confirmedRisk} = this.state;
        return !confirmedRisk
            && recipient.type !== RecipientType.UNKNOWN
            && recipient.type !== RecipientType.ALIAS
            && recipient.status === RecipientValidationStatus.INVALID;
    }



    render() {
        const {
            addMessage,
            amount,
            balances,
            confirmedRisk,
            encrypt,
            fee,
            message,
            recipient,
            sender,
            showSubmitButton,
        } = this.state;
        const {suggestedFees} = this.props;
        const total = Amount.fromSigna(amount || '0').add(Amount.fromSigna(fee || '0'));
        const senderRS = sender && sender.accountRS || null;
        const isSubmitEnabled = this.isSubmitEnabled();
        const swipeButtonTitle = isSubmitEnabled
            ? i18n.t(transactions.screens.send.button.enabled)
            : i18n.t(transactions.screens.send.button.disabled);

        const SenderRightElement = (
            <View style={{flexDirection: 'row'}}>
                {this.state.sender &&
                <View style={styles.balance}>
                    <AmountText
                        amount={Amount.fromPlanck(this.state.sender.balanceNQT)}
                        color={Colors.GREY_LIGHT}
                    />
                </View>}
                <Image source={actionIcons.chevron} style={styles.chevron}/>
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

        const isSubmitSwipeVisible =  !this.shouldShowAliasWarning() &&
            !this.shouldConfirmRisk() &&
            this.hasSufficientBalance()
            && showSubmitButton ;

        return (
            <View>
                <View>
                    <BSelect
                        value={senderRS}
                        items={this.getAccounts()}
                        onChange={this.handleChangeFromAccount}
                        title={i18n.t(transactions.screens.send.from)}
                        placeholder={i18n.t(transactions.screens.send.selectAccount)}
                        rightElement={SenderRightElement}
                    />
                    <Balances balances={balances}/>
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
                            fee={parseFloat(fee || '0')}
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
                            {i18n.t(transactions.screens.send.total)}
                        </BText>
                        <AmountText amount={total}/>
                    </View>
                    {!this.hasSufficientBalance() && (
                        <DangerBox>
                            <BText bebasFont color={Colors.WHITE} textAlign={TextAlign.CENTER}>
                                {i18n.t(transactions.screens.send.insufficientFunds)}
                            </BText>
                        </DangerBox>
                        )
                    }

                    {this.shouldShowAliasWarning() && (
                        <DangerBox>
                            <BText bebasFont color={Colors.WHITE} textAlign={TextAlign.CENTER}>
                                {i18n.t(transactions.screens.send.invalidAlias)}
                            </BText>
                        </DangerBox>
                        )
                    }

                    { this.shouldConfirmRisk() && (
                        <DangerBox>
                            <BCheckbox
                                label={i18n.t(transactions.screens.send.confirmRisk, {address:recipient?.addressRS})}
                                labelFontSize={FontSizes.SMALL}
                                value={confirmedRisk || false}
                                onCheck={this.setConfirmedRisk}
                            />
                        </DangerBox>
                        )
                    }

                    {isSubmitSwipeVisible &&
                    <SwipeButton
                        disabledRailBackgroundColor={Colors.PINK}
                        disabledThumbIconBackgroundColor={Colors.GREY}
                        disabledThumbIconBorderColor={Colors.BLUE_DARKER}
                        disabledThumb={Colors.BLUE_DARKER}
                        thumbIconBackgroundColor={Colors.WHITE}
                        thumbIconImageSource={actionIcons.send}
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
            </View>
        );
    }
}
