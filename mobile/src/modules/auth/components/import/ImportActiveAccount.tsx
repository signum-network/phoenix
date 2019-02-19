import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from '../../../../core/components/base/Button';
import { Input } from '../../../../core/components/base/Input';
import { i18n } from '../../../../core/i18n';
import { auth } from '../../translations';
import { SimplePinInput } from '../SimplePinInput';
import { AccountTypeHint } from './AccountTypeHint';

export interface ActiveAccountData {
  pin: string;
  passphrase: string;
}

interface Props {
  onFinish: (data: ActiveAccountData) => void;
}

interface State {
  pin: string;
  passphrase: string;
}

const styles = StyleSheet.create({
  mainBlock: {
    flexGrow: 1
  }
});

export class ImportActiveAccount extends React.PureComponent<Props, State> {
  state: State = {
    pin: '',
    passphrase: ''
  };

  handleChangePassphrase = (passphrase: string) => {
    this.setState({ passphrase });
  }

  handleChangePin = (pin: string) => {
    this.setState({ pin });
  }

  handleFinish = () => {
    const { passphrase, pin } = this.state;

    const data: ActiveAccountData = {
      passphrase,
      pin
    };
    this.props.onFinish(data);
  }

  render () {
    const { passphrase, pin } = this.state;
    return (
      <React.Fragment>
        <View style={styles.mainBlock}>
          <Input
            secure={true}
            hint={i18n.t(auth.models.account.passphrase)}
            value={passphrase}
            onChangeText={this.handleChangePassphrase}
          />
          <SimplePinInput value={pin} onChange={this.handleChangePin}/>
          <AccountTypeHint>{i18n.t(auth.importAccount.activeAccountHint)}</AccountTypeHint>
        </View>
        <Button fullWidth={true} onPress={this.handleFinish}>{i18n.t(auth.importAccount.import)}</Button>
      </React.Fragment>
    );
  }
}
