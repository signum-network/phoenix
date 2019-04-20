import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { Button } from '../../../../core/components/base/Button';
import { Text, TextAlign, TextThemes } from '../../../../core/components/base/Text';
import { NumericKeyboard } from '../../../../core/components/keyboards/numeric/NumericKeyboard';
import { i18n } from '../../../../core/i18n';
import { InjectedReduxProps } from '../../../../core/interfaces';
import { FullHeightView } from '../../../../core/layout/FullHeightView';
import { Screen } from '../../../../core/layout/Screen';
import { AppReduxState } from '../../../../core/store/app/reducer';
import { ApplicationState } from '../../../../core/store/initialState';
import { Colors } from '../../../../core/theme/colors';
import { Sizes } from '../../../../core/theme/sizes';
import { core } from '../../../../core/translations';
import { PASSCODE_LENGTH } from '../../consts';
import { setPasscode } from '../../store/actions';
import { AuthReduxState } from '../../store/reducer';
import { auth } from '../../translations';

interface InjectedProps extends InjectedReduxProps {
  app: AppReduxState,
  auth: AuthReduxState
}

interface OwnProps {
  onSuccess: () => void;
  onCancel: () => void;
}

type Props = OwnProps & InjectedProps;

interface State {
  code: string;
  savedCode: string;
  hasError: boolean;
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: Colors.BLUE
  },
  header: {
    flexGrow: 1
  },
  keyboard: {
    display: 'flex'
  },
  hint: {
    marginBottom: Sizes.MEDIUM
  }
});

class SetPasscodeModal extends React.PureComponent<Props, State> {
  state = {
    code: '',
    savedCode: '',
    hasError: false
  };

  handleNumberPress = (value: string) => {
    const { code, savedCode } = this.state;
    const newCode = code + value;

    this.setState({ hasError: false }, async () => {
      if (newCode.length === PASSCODE_LENGTH) {
        if (savedCode) {
          if (newCode === savedCode) {
            await this.props.dispatch(setPasscode(savedCode));
            this.setState({
              code: '',
              savedCode: ''
            });
            this.props.onSuccess();
          } else {
            this.setState({
              code: '',
              hasError: true
            });
          }
        } else {
          this.setState({
            code: '',
            savedCode: newCode
          });
        }
      } else {
        this.setState({
          code: newCode
        });
      }
    });
  }

  handleDelPress = () => {
    const { code } = this.state;

    if (code.length > 0) {
      this.setState({
        code: code.substr(0, code.length - 1)
      });
    }
  }

  render () {
    const { hasError, savedCode } = this.state;
    const code = this.state.code.replace(/./g, 'X ') + ' ';
    const hint = !savedCode
      ? i18n.t(auth.setPasscodeModal.passcodeHint)
      : i18n.t(auth.setPasscodeModal.enterAgain);

    return (
      <Screen style={styles.view}>
        <FullHeightView>
          <View style={styles.header}>
            <View style={styles.hint}>
              <Text theme={TextThemes.HINT} textAlign={TextAlign.CENTER} color={Colors.WHITE}>
                {hint}
              </Text>
              {hasError && (
                <Text theme={TextThemes.HINT} textAlign={TextAlign.CENTER} color={Colors.WHITE}>
                  {i18n.t(auth.errors.incorrectPasscode)}
                </Text>
              )}
            </View>
            <Text
              theme={TextThemes.HEADER}
              color={Colors.WHITE}
              textAlign={TextAlign.CENTER}
            >
              {code}
            </Text>
          </View>
          <View style={styles.keyboard}>
            <NumericKeyboard
              onDelPress={this.handleDelPress}
              onPress={this.handleNumberPress}
            />
            <Button onPress={this.props.onCancel}>
              {i18n.t(core.actions.cancel)}
            </Button>
          </View>
        </FullHeightView>
      </Screen>
    );
  }
}

function mapStateToProps (state: ApplicationState) {
  return {
    app: state.app,
    auth: state.auth
  };
}

export const SetPasscodeModalScreen = connect(mapStateToProps)(SetPasscodeModal);
