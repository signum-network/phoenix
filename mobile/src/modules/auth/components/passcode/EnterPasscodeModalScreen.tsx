import React from 'react';
import { Image, Modal, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { logos } from '../../../../assets/icons';
import { Button, ButtonThemes } from '../../../../core/components/base/Button';
import { Text, TextAlign, TextThemes } from '../../../../core/components/base/Text';
import { NumericKeyboard } from '../../../../core/components/keyboards/numeric/NumericKeyboard';
import { i18n } from '../../../../core/i18n';
import { FullHeightView } from '../../../../core/layout/FullHeightView';
import { Screen } from '../../../../core/layout/Screen';
import { Colors } from '../../../../core/theme/colors';
import { Sizes } from '../../../../core/theme/sizes';
import { authWithTouchId, isTouchIDSupported } from '../../../../core/utils/keychain';
import { settings } from '../../../settings/translations';
import { PASSCODE_LENGTH } from '../../consts';
import { auth } from '../../translations';

interface Props {
  passcode: string;
  onSuccess: () => void;
  onCancel: () => void;
  onReset?: () => void;
}

interface State {
  code: string;
  hasError: boolean;
  hasTouchID: boolean;
  erasePromptVisible: boolean;
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: Colors.BLUE,
    display: 'flex',
    alignItems: 'center',
    height: '100%'
  },
  header: {
    textAlign: 'center',
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'flex-end',
    marginTop: Sizes.LARGER * 2
  },
  keyboard: {
    flex: 1.5,
    justifyContent: 'center'
  },
  hint: {
    marginBottom: Sizes.MEDIUM
  },
  bodyText: {
    padding: 10
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  footer: {
    // marginBottom: 20
  }
});

const touchIDReason = ' ';

export class EnterPasscodeModalScreen extends React.PureComponent<Props, State> {
  state = {
    code: '',
    hasError: false,
    hasTouchID: false,
    erasePromptVisible: false
  };

  async componentDidMount (): Promise<void> {
    this.handleTouchID();
    const hasTouchID = await isTouchIDSupported();
    this.setState({ hasTouchID });
  }

  handleNumberPress = (value: string) => {
    const { code } = this.state;
    const { passcode, onSuccess } = this.props;

    const newCode = code + value;

    this.setState({ hasError: false }, async () => {
      if (newCode.length === PASSCODE_LENGTH) {
        if (newCode === passcode) {
          onSuccess();
        } else {
          this.setState({
            code: '',
            hasError: true
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

  handleTouchID = () => {
    authWithTouchId(touchIDReason).then((value) => {
      if (value === true) {
        this.props.onSuccess();
      }
    });
  }

  confirmErase = () => {
    const { onReset } = this.props;
    onReset && onReset();
    this.toggleConfirmDeletePrompt();
  }

  toggleConfirmDeletePrompt = () => {
    this.setState({ erasePromptVisible: !this.state.erasePromptVisible });
  }

  render () {
    const { hasError, hasTouchID } = this.state;
    const { onReset } = this.props;
    const code = this.state.code.replace(/./g, '* ') + ' ';

    return (
      <Screen style={styles.view}>
        <FullHeightView>
         <SafeAreaView>
            <View style={styles.header}>
              <Image source={logos.white} style={styles.logo} />
              <View style={styles.hint}>
                <Text theme={TextThemes.HINT} textAlign={TextAlign.CENTER} color={Colors.WHITE}>
                  {i18n.t(auth.enterPasscodeModal.passcodeHint)}
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
                onTouchID={hasTouchID ? this.handleTouchID : undefined}
                touchIDReason={hasTouchID ? touchIDReason : undefined}
              />
            </View>
            {onReset && <View style={styles.footer}>
              <TouchableOpacity onPress={this.toggleConfirmDeletePrompt}>
                <Text theme={TextThemes.HINT} textAlign={TextAlign.CENTER} color={Colors.WHITE}>
                  {i18n.t(auth.enterPasscodeModal.forgotPin)}
                </Text>
              </TouchableOpacity>
            </View>}

            <Modal
              animationType='slide'
              transparent={false}
              visible={this.state.erasePromptVisible}
            >
              <SafeAreaView>
                <View>
                  <View style={styles.bodyText}>
                    <Text>{i18n.t(auth.enterPasscodeModal.confirmReset)}</Text>

                    <Button theme={ButtonThemes.ACCENT} onPress={this.toggleConfirmDeletePrompt}>
                      {i18n.t(settings.screens.settings.cancel)}
                    </Button>

                    <Button onPress={this.confirmErase}>
                      {i18n.t(settings.screens.settings.confirmErase)}
                    </Button>
                  </View>
                </View>
              </SafeAreaView>
            </Modal>
          </SafeAreaView>
        </FullHeightView>
      </Screen>
    );
  }
}
