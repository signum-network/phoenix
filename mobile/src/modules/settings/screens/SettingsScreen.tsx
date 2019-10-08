import { currentLocale, locales, translations } from 'i18n-js';
import React from 'react';
import { Alert, I18nManager, Modal, StyleSheet, View, SafeAreaView } from 'react-native';
import VersionNumber from 'react-native-version-number';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { BSelect } from '../../../core/components/base/BSelect';
import { Button } from '../../../core/components/base/Button';
import { Text } from '../../../core/components/base/Text';
import { HeaderTitle } from '../../../core/components/header/HeaderTitle';
import { i18n } from '../../../core/i18n';
import { InjectedReduxProps } from '../../../core/interfaces';
import { FullHeightView } from '../../../core/layout/FullHeightView';
import { Screen } from '../../../core/layout/Screen';
import { routes } from '../../../core/navigation/routes';
import { AppReduxState } from '../../../core/store/app/reducer';
import { ApplicationState } from '../../../core/store/initialState';
import { Sizes, FontSizes } from '../../../core/theme/sizes';
import { resetAuthState } from '../../auth/store/actions';
import { AuthReduxState } from '../../auth/store/reducer';
import { settings } from '../translations';
import { Colors } from '../../../core/theme/colors';

interface IProps extends InjectedReduxProps {
  auth: AuthReduxState,
  app: AppReduxState;
}
type Props = IProps & NavigationInjectedProps;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  hintView: {
    paddingTop: Sizes.SMALL,
    flexGrow: 1
  },
  bodyText: {
    padding: 10
  },
  flexBottom: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
});

class Settings extends React.PureComponent<Props> {

  state = {
    erasePromptVisible: false
  };

  static navigationOptions = {
    headerTitle: <HeaderTitle>{i18n.t(settings.screens.settings.title)}</HeaderTitle>
  };

  toggleConfirmDeletePrompt = () => {
    this.setState({ erasePromptVisible: !this.state.erasePromptVisible });
  }

  confirmErase = () => {
    this.props.dispatch(resetAuthState());
    this.props.navigation.navigate(routes.home);
    this.toggleConfirmDeletePrompt();
  }

  handleLanguageChange = () => {
  }

  getLocales = () => {
    return Object.keys(translations).map((locale) => {
      return {
        value: locale,
        label: locale
      };
    });
  }

  render () {
    return (
      <Screen>
        <FullHeightView>
          <View style={styles.container}>
            {/* <BSelect
                  // @ts-ignore bad .d.ts
                  value={currentLocale.locale}
                  items={this.getLocales()}
                  onChange={this.handleLanguageChange}
                  title={i18n.t(settings.screens.settings.changeLanguage)}
                  placeholder={i18n.t(settings.screens.settings.changeLanguage)}
            /> */}

            <Button onPress={this.toggleConfirmDeletePrompt}>
              {i18n.t(settings.screens.settings.erase)}
            </Button>

            <View style={[styles.flexBottom, styles.bodyText]}>
              <Text color={Colors.WHITE} size={FontSizes.SMALL}>
                Phoenix BURST Wallet {VersionNumber.appVersion} ({VersionNumber.buildVersion})
                </Text>
              <Text color={Colors.WHITE} size={FontSizes.SMALL}>
                {i18n.t(settings.screens.settings.copyright)}
              </Text>
            </View>

            <Modal
              animationType='slide'
              transparent={false}
              visible={this.state.erasePromptVisible}
              // tslint:disable-next-line: jsx-no-lambda
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
              }}
            >
              <SafeAreaView>

                <View>
                  <View style={styles.bodyText}>
                    <Text>{i18n.t(settings.screens.settings.confirmReset)}</Text>

                    <Button onPress={this.toggleConfirmDeletePrompt}>
                      {i18n.t(settings.screens.settings.cancel)}
                    </Button>

                    <Button onPress={this.confirmErase}>
                      {i18n.t(settings.screens.settings.confirmErase)}
                    </Button>
                  </View>
                </View>
              </SafeAreaView>

            </Modal>
          </View>
        </FullHeightView>
      </Screen>
    );
  }
}

function mapStateToProps(state: ApplicationState) {
  return {
    auth: state.auth
  };
}

export const SettingsScreen = connect(mapStateToProps)(withNavigation(Settings));
