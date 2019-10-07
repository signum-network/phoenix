import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Button } from '../../../../core/components/base/Button';
import { Text, TextAlign, TextThemes } from '../../../../core/components/base/Text';
import { NumericKeyboard } from '../../../../core/components/keyboards/numeric/NumericKeyboard';
import { i18n } from '../../../../core/i18n';
import { FullHeightView } from '../../../../core/layout/FullHeightView';
import { Screen } from '../../../../core/layout/Screen';
import { Colors } from '../../../../core/theme/colors';
import { Sizes } from '../../../../core/theme/sizes';
import { core } from '../../../../core/translations';
import { authWithTouchId, isTouchIDSupported } from '../../../../core/utils/keychain';
import { PASSCODE_LENGTH } from '../../consts';
import { auth } from '../../translations';
import { logos } from '../../../../assets/icons';

interface Props {
  passcode: string;
  onSuccess: () => void;
  onCancel: () => void;
}

interface State {
  code: string;
  hasError: boolean;
  hasTouchID: boolean;
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
    justifyContent: 'flex-end'
  },
  keyboard: {
    flex: 2,
    justifyContent: 'center'
  },
  hint: {
    marginBottom: Sizes.MEDIUM
  },
  logo: {
    width: 200,
    height: 53,
    marginBottom: 50
  }
});

const touchIDReason = ' ';

export class EnterPasscodeModalScreen extends React.PureComponent<Props, State> {
  state = {
    code: '',
    hasError: false,
    hasTouchID: false
  };

  async componentDidMount () {
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
          this.setState({
            code: ''
          });
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

  render () {
    const { hasError, hasTouchID } = this.state;
    const code = this.state.code.replace(/./g, 'X ') + ' ';

    return (
      <Screen style={styles.view}>
        <FullHeightView>
          <View style={styles.header}>
            <Image source={logos.white} style={styles.logo}/>
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
        </FullHeightView>
      </Screen>
    );
  }
}
