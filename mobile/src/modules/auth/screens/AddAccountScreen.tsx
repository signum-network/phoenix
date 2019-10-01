import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { Button, ButtonThemes } from '../../../core/components/base/Button';
import { Text, TextThemes } from '../../../core/components/base/Text';
import { HeaderTitle } from '../../../core/components/header/HeaderTitle';
import { i18n } from '../../../core/i18n';
import { InjectedReduxProps } from '../../../core/interfaces';
import { FullHeightView } from '../../../core/layout/FullHeightView';
import { Screen } from '../../../core/layout/Screen';
import { routes } from '../../../core/navigation/routes';
import { ApplicationState } from '../../../core/store/initialState';
import { Sizes } from '../../../core/theme/sizes';
import { AuthReduxState } from '../store/reducer';
import { auth } from '../translations';
import { Colors } from '../../../core/theme/colors';

interface IProps extends InjectedReduxProps {
  auth: AuthReduxState,
}
type Props = IProps & NavigationInjectedProps;

const styles = StyleSheet.create({
  hintView: {
    paddingTop: Sizes.SMALL,
    flexGrow: 1
  }
});

class AddAccount extends React.PureComponent<Props> {
  static navigationOptions = {
    headerTitle: <HeaderTitle>{i18n.t(auth.addAccount.title)}</HeaderTitle>
  };

  handleCreateAccount = () => {
    this.props.navigation.navigate(routes.createAccount);
  }

  handleImportAccount = () => {
    this.props.navigation.navigate(routes.importAccount);
  }

  render () {
    return (
      <Screen>
        <FullHeightView style={{ backgroundColor: Colors.WHITE }}>
          <View style={styles.hintView}>
            <Text theme={TextThemes.HEADER}>
              {i18n.t(auth.addAccount.hint)}
            </Text>
          </View>
          <View>
            <Button theme={ButtonThemes.ACCENT} onPress={this.handleCreateAccount}>
              {i18n.t(auth.addAccount.createAccount)}
            </Button>
            <Button onPress={this.handleImportAccount}>
              {i18n.t(auth.addAccount.importAccount)}
            </Button>
          </View>
        </FullHeightView>
      </Screen>
    );
  }
}

function mapStateToProps (state: ApplicationState) {
  return {
    auth: state.auth
  };
}

export const AddAccountScreen = connect(mapStateToProps)(withNavigation(AddAccount));
