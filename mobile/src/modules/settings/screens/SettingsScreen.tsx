import React from 'react';
import { StyleSheet, View, Modal, Alert } from 'react-native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { Button } from '../../../core/components/base/Button';
import { Text, TextThemes } from '../../../core/components/base/Text';
import { HeaderTitle } from '../../../core/components/header/HeaderTitle';
import { i18n } from '../../../core/i18n';
import { InjectedReduxProps } from '../../../core/interfaces';
import { FullHeightView } from '../../../core/layout/FullHeightView';
import { Screen } from '../../../core/layout/Screen';
import { ApplicationState } from '../../../core/store/initialState';
import { Sizes } from '../../../core/theme/sizes';
import { AuthReduxState } from '../../auth/store/reducer';
import { settings } from '../translations';
import { TouchableHighlight } from 'react-native-gesture-handler';

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

class Settings extends React.PureComponent<Props> {

  state = {
    erasePromptVisible: false
  };

  static navigationOptions = {
    headerTitle: <HeaderTitle>{i18n.t(settings.screens.settings.title)}</HeaderTitle>
  };

  showConfirmDeletePrompt() {
    return () => {
      return !this.state.erasePromptVisible;
    };
  }

  render() {
    return (
      <Screen>
        <FullHeightView>
          <View style={styles.hintView}>
            <Text theme={TextThemes.HEADER}>
              {i18n.t(settings.screens.settings.title)}
            </Text>
          </View>
          <View>

            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.erasePromptVisible}
// tslint:disable-next-line: jsx-no-lambda
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
              }}>
              <View style={{ marginTop: 22 }}>
                <View>
                  <Text>Hello World!</Text>

                  <TouchableHighlight
                    onPress={this.showConfirmDeletePrompt()}
                  >
                    <Text>Hide Modal</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>

            <Button onPress={this.showConfirmDeletePrompt()}>
              {i18n.t(settings.screens.settings.erase)}
            </Button>
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
