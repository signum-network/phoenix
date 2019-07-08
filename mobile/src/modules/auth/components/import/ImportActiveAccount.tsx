import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from '../../../../core/components/base/Button';
import { Input } from '../../../../core/components/base/Input';
import { i18n } from '../../../../core/i18n';
import { auth } from '../../translations';
import { AccountTypeHint } from './AccountTypeHint';

interface Props {
  onFinish: (passphrase: string) => void;
}

interface State {
  passphrase: string;
}

const styles = StyleSheet.create({
  mainBlock: {
    flexGrow: 1
  }
});

export class ImportActiveAccount extends React.PureComponent<Props, State> {
  state: State = {
    passphrase: ''
  };

  handleChangePassphrase = (passphrase: string) => {
    this.setState({ passphrase });
  }

  handleFinish = () => {
    const { passphrase } = this.state;

    this.props.onFinish(passphrase);
  }

  render () {
    const { passphrase } = this.state;
    return (
      <React.Fragment>
        <View style={styles.mainBlock}>
          <Input
            secure={true}
            hint={i18n.t(auth.models.account.passphrase)}
            value={passphrase}
            onChangeText={this.handleChangePassphrase}
          />
          <AccountTypeHint>{i18n.t(auth.importAccount.activeAccountHint)}</AccountTypeHint>
        </View>
        <Button fullWidth={true} onPress={this.handleFinish}>{i18n.t(auth.importAccount.import)}</Button>
      </React.Fragment>
    );
  }
}
