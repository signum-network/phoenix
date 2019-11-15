import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from '../../../../core/components/base/Button';
import { Input } from '../../../../core/components/base/Input';
import { SwitchItem } from '../../../../core/components/base/SwitchItem';
import { i18n } from '../../../../core/i18n';
import { auth } from '../../translations';
import { AccountTypeHint } from './AccountTypeHint';

interface Props {
  onFinish: (passphrase: string) => void;
}

interface State {
  passphrase: string;
  showPassphrase: boolean;
}

const styles = StyleSheet.create({
  mainBlock: {
    flexGrow: 1
  },
  padTop: {
    paddingTop: 10
  }
});

export class ImportActiveAccount extends React.PureComponent<Props, State> {
  state: State = {
    passphrase: '',
    showPassphrase: false
  };

  handleChangePassphrase = (passphrase: string) => {
    this.setState({ passphrase });
  }

  handleShowPassphrase = (showPassphrase: boolean) => {
    this.setState({ showPassphrase });
  }

  handleFinish = () => {
    const { passphrase } = this.state;

    this.props.onFinish(passphrase);
  }

  render () {
    const { passphrase, showPassphrase } = this.state;
    return (
      <React.Fragment>
        <View style={styles.mainBlock}>
          <Input
            secure={!showPassphrase}
            hint={i18n.t(auth.models.account.passphrase)}
            value={passphrase}
            onChangeText={this.handleChangePassphrase}
          />
          <AccountTypeHint>{i18n.t(auth.importAccount.activeAccountHint)}</AccountTypeHint>
          <View style={styles.padTop}>
            <SwitchItem
                onChange={this.handleShowPassphrase}
                text={i18n.t(auth.importAccount.showPassphrase)}
                value={showPassphrase}
            />
          </View>
        </View>
        <Button fullWidth={true} onPress={this.handleFinish}>{i18n.t(auth.importAccount.import)}</Button>
      </React.Fragment>
    );
  }
}
