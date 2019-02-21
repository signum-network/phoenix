import React from 'react';
import { Input, KeyboardTypes } from '../../../core/components/base/Input';
import { i18n } from '../../../core/i18n';
import { PIN_LENGTH } from '../consts';
import { auth } from '../translations';

interface Props {
  value: string;
  onChange: (pin: string) => void;
}

export const SimplePinInput: React.FunctionComponent<Props> = ({ value, onChange }: Props) => {
  return (
    <Input
      secure={true}
      maxLength={PIN_LENGTH}
      keyboardType={KeyboardTypes.NUMERIC}
      hint={i18n.t(auth.models.account.pin)}
      value={value}
      onChangeText={onChange}
    />
  );
};
