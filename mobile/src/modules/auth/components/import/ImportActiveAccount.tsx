import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from '../../../../core/components/base/Button';
import {Input} from '../../../../core/components/base/Input';
import {SwitchItem} from '../../../../core/components/base/SwitchItem';
import {i18n} from '../../../../core/i18n';
import {auth} from '../../translations';
import {AccountTypeHint} from './AccountTypeHint';

interface Props {
  onFinish: (passphrase: string) => void;
}

const styles = StyleSheet.create({
  mainBlock: {
    flexGrow: 1,
  },
  passphraseSwitch: {
    paddingTop: 10,
  },
  button: {
    paddingTop: '10%',
  },
});

export const ImportActiveAccount: React.FC<Props> = ({onFinish}) => {
  const [passphrase, setPassphrase] = useState('');
  const [showPassphrase, setShowPassphrase] = useState(false);

  const handleChangePassphrase = (phrase: string) => {
    setPassphrase(phrase);
  };

  const handleShowPassphrase = (show: boolean) => {
    setShowPassphrase(show);
  };

  const handleFinish = () => {
    onFinish(passphrase);
  };

  return (
    <React.Fragment>
      <View style={styles.mainBlock}>
        <Input
          secure={!showPassphrase}
          hint={i18n.t(auth.models.account.passphrase)}
          value={passphrase}
          onChangeText={handleChangePassphrase}
        />
        <AccountTypeHint>
          {i18n.t(auth.importAccount.activeAccountHint)}
        </AccountTypeHint>
        <View style={styles.passphraseSwitch}>
          <SwitchItem
            onChange={handleShowPassphrase}
            text={i18n.t(auth.importAccount.showPassphrase)}
            value={showPassphrase}
          />
        </View>
      </View>
      <View style={styles.button}>
        <Button
          fullWidth={true}
          onPress={handleFinish}
          disabled={passphrase.length === 0}>
          {i18n.t(auth.importAccount.import)}
        </Button>
      </View>
    </React.Fragment>
  );
};
