import { Account } from '@burstjs/core';
import { isEmpty, toString } from 'lodash';
import React from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { Button } from '../../../core/components/base/Button';
import { ListSeparator } from '../../../core/components/base/ListSeparator';
import { Text, TextAlign } from '../../../core/components/base/Text';
import { InjectedReduxProps } from '../../../core/interfaces';
import { FullHeightView } from '../../../core/layout/FullHeightView';
import { Screen } from '../../../core/layout/Screen';
import { i18n } from '../../../core/localization/i18n';
import { routes } from '../../../core/navigation/routes';
import { ApplicationState } from '../../../core/store/initialState';
import { defaultSideOffset, ESizes, SizeNames } from '../../../core/theme/sizes';
import { AccountListItem } from '../components/AccountListItem';
import { loadAccounts } from '../store/actions';
import { AuthReduxState } from '../store/reducer';
import { setAccounts } from '../store/utils';
import { auth } from '../translations';

interface Props extends InjectedReduxProps {
  auth: AuthReduxState,
}

type TProps = NavigationInjectedProps & Props;

const stylesConfig = {
  addAccountView: {
    alignContent: 'flex-end'
  },
  header: {
    flexGrow: 1
  }
};
const styles = StyleSheet.create(stylesConfig as any);

class Accounts extends React.PureComponent<TProps> {
  static navigationOptions = {
    title: i18n.t(auth.accounts.title)
  };

  handleClear = async () => {
    await setAccounts([]);
    await this.props.dispatch(loadAccounts());
  }

  renderNewAccountButtons = () => {
    return (
      <View>
        <Button onPress={this.handleCreateAccountPress}>{i18n.t(auth.accounts.createAccount)}</Button>
        <Button onPress={this.handleAddAccountPress}>{i18n.t(auth.accounts.addAccount)}</Button>
        <Button onPress={this.handleClear}>
          Clear
        </Button>
      </View>
    );
  }

  renderNoData = () => {
    return (
      <FullHeightView>
        <View style={styles.header}>
          <Text
            textAlign={TextAlign.center}
            marginHor={defaultSideOffset}
            marginTop={ESizes.l}
            sizeName={SizeNames.l}
            isHeader={true}
          >
            {i18n.t(auth.accounts.noAccounts)}
          </Text>
        </View>
        <View style={styles.addAccountView}>
          {this.renderNewAccountButtons()}
        </View>
      </FullHeightView>
    );
  }

  handleAccountPress = (account: Account) => {
    //
  }

  handleCreateAccountPress = () => {
    this.props.navigation.navigate(routes.createAccount);
  }

  handleAddAccountPress = () => {
    this.props.navigation.navigate(routes.addAccount);
  }

  keyExtractor = (item: Account, index: number): string => {
    const key = item.id || index;
    return toString(key);
  }

  renderAccount = (item: ListRenderItemInfo<Account>) => {
    return <AccountListItem onPress={this.handleAccountPress} account={item.item} />;
  }

  renderAccounts = () => {
    return (
      <FullHeightView>
        <FlatList
          ListFooterComponent={this.renderNewAccountButtons}
          data={this.props.auth.accounts}
          renderItem={this.renderAccount}
          keyExtractor={this.keyExtractor}
          ItemSeparatorComponent={ListSeparator}
        />
      </FullHeightView>
    );
  }

  render () {
    const hasAccounts = !isEmpty(this.props.auth.accounts);
    const content = hasAccounts ? this.renderAccounts() : this.renderNoData();

    return (
      <Screen>
        {content}
      </Screen>
    );
  }
}

function mapStateToProps (state: ApplicationState) {
  return {
    auth: state.auth
  };
}

export const AccountsScreen = connect(mapStateToProps)(withNavigation(Accounts));
