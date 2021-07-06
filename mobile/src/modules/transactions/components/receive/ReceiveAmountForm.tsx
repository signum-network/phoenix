import {Account, SuggestedFees} from '@signumjs/core';
import {Amount} from '@signumjs/util';
import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {BInput, KeyboardTypes} from '../../../../core/components/base/BInput';
import {BSelect, SelectItem} from '../../../../core/components/base/BSelect';
import {Button as BButton} from '../../../../core/components/base/Button';
import {SwitchItem} from '../../../../core/components/base/SwitchItem';
import {Text as BText} from '../../../../core/components/base/Text';
import {i18n} from '../../../../core/i18n';
import {Colors} from '../../../../core/theme/colors';
import {ReceiveAmountPayload} from '../../store/actions';
import {transactions} from '../../translations';
import {FeeSlider} from '../fee-slider/FeeSlider';
import {trimAddressPrefix} from '../../../../core/utils/account';
import {core} from '../../../../core/translations';
import {AmountText} from '../../../../core/components/base/Amount';

interface Props {
    onSubmit: (form: ReceiveAmountPayload) => void;
    accounts: Account[];
    suggestedFees: SuggestedFees | null;
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
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
    }
};

export const ReceiveAmountForm: React.FC<Props> = (props) => {
    const [formData, setFormData] = useState<ReceiveAmountPayload>({
        amount: '',
        immutable: false,
        fee: props.suggestedFees ? Amount.fromPlanck(props.suggestedFees.standard).getSigna() : '',
        recipient: '',
        message: '',
    });
    const [submitEnabled, setSubmitEnabled] = useState(false);
    useEffect(() => {
        const {amount, fee, recipient} = formData as ReceiveAmountPayload;
        const isEnabled = Boolean(
            Number(amount) &&
            Number(fee) &&
            recipient
        );
        setSubmitEnabled(isEnabled);
    }, [formData]);

    const handleFormChange = (fieldName: string) => (data: any) => {

        if (typeof data === 'string') {
            data = data.trim();
        }

        const updated = {
            ...formData,
            [fieldName]: data,
        } as ReceiveAmountPayload;

        setFormData(updated);
    };

    const getAccounts = (): Array<SelectItem<string>> => {
        return props.accounts
            .map((account) => ({
                value: account.accountRS,
                label: trimAddressPrefix(account.accountRS),
            }));
    };

    const handleSubmit = () => {
        submitEnabled && props.onSubmit(formData);
    };

    const handleFeeChangeFromSlider = (fee: number) => {
        handleFormChange('fee')(fee);
    };

    const {immutable, recipient, amount, fee, message = ''} = formData;
    const total = Amount.fromSigna(amount || 0).add(Amount.fromSigna(fee || 0));
    const {suggestedFees} = props;

    return (
        <View style={styles.wrapper}>
            <View style={styles.form}>
                <BSelect
                    value={recipient}
                    items={getAccounts()}
                    onChange={handleFormChange('recipient')}
                    title={i18n.t(transactions.screens.receive.recipient)}
                    placeholder={i18n.t(transactions.screens.send.selectAccount)}
                />
                <BInput
                    value={amount}
                    onChange={handleFormChange('amount')}
                    keyboard={KeyboardTypes.NUMERIC}
                    title={i18n.t(transactions.screens.send.amountNQT)}
                    placeholder={'0'}
                />
                <BInput
                    value={fee}
                    onChange={handleFormChange('fee')}
                    keyboard={KeyboardTypes.NUMERIC}
                    title={i18n.t(transactions.screens.send.feeNQT)}
                    placeholder={'0'}
                />
                <BInput
                    value={message}
                    onChange={handleFormChange('message')}
                    title={i18n.t(transactions.screens.send.message)}
                    placeholder={i18n.t(core.placeholders.message)}
                />
                {
                    suggestedFees &&
                    <FeeSlider
                        fee={parseFloat(fee) || 0}
                        onSlidingComplete={handleFeeChangeFromSlider}
                        suggestedFees={suggestedFees}
                    />
                }
                <SwitchItem
                    text={(
                        <BText bebasFont color={Colors.WHITE}>{i18n.t(transactions.screens.receive.immutable)}</BText>
                    )}
                    value={immutable}
                    onChange={handleFormChange('immutable')}
                />
                <View style={styles.total}>
                    <BText bebasFont color={Colors.WHITE}>
                        {i18n.t(transactions.screens.send.total)}
                    </BText>
                    <AmountText amount={total || Amount.Zero()} />
                </View>
                <BButton disabled={!submitEnabled} onPress={handleSubmit}>
                    {i18n.t(transactions.screens.receive.generate)}
                </BButton>
            </View>
        </View>
    );
};
