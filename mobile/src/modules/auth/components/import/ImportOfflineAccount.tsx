import React from 'react';
import { View } from 'react-native';
import { Button } from '../../../../core/components/base/Button';
import { Input } from '../../../../core/components/base/Input';
import { i18n } from '../../../../core/i18n';
import { flexGrowStyle } from '../../../../core/utils/styles';
import { auth } from '../../translations';
import { AccountTypeHint } from './AccountTypeHint';

interface Props {
  onFinish: (address: string) => void;
}

interface State {
  address: string;
}

export class ImportOfflineAccount extends React.PureComponent<Props, State> {
  state: State = {
    address: 'BURST-'
  };

  handleChangeAddress = (address: string) => {
    this.setState({ address });
  }

  handleFinish = () => {
    this.props.onFinish(this.state.address);
  }

  render () {
    const { address } = this.state;

    return (
      <React.Fragment>
        <View style={flexGrowStyle}>
          <Input
            hint={i18n.t(auth.models.account.address)}
            value={address}
            onChangeText={this.handleChangeAddress}
          />
          <AccountTypeHint>{i18n.t(auth.importAccount.passiveAccountHint)}</AccountTypeHint>
        </View>
        <Button fullWidth={true} onPress={this.handleFinish}>{i18n.t(auth.importAccount.import)}</Button>
      </React.Fragment>
    );
  }
}
