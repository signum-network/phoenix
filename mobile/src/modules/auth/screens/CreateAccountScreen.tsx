import { Account } from '@burstjs/core';
import {
  generateMasterKeys,
  getAccountIdFromPublicKey,
  PassPhraseGenerator
} from '@burstjs/crypto';
import { toString } from 'lodash';
import React from 'react';
import {
  BackHandler,
  GestureResponderEvent,
  PanResponder,
  PanResponderGestureState,
  PanResponderInstance,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import { NavigationEventSubscription, NavigationInjectedProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { Button } from '../../../core/components/base/Button';
import { Input } from '../../../core/components/base/Input';
import { Text } from '../../../core/components/base/Text';
import { InjectedReduxProps } from '../../../core/interfaces';
import { preventBackAction, PreventBackButton } from '../../../core/layout/PreventBackButton';
import { Screen } from '../../../core/layout/Screen';
import { i18n } from '../../../core/localization/i18n';
import { ApplicationState } from '../../../core/store/initialState';
import { Colors, ColorThemeNames } from '../../../core/theme/colors';
import { defaultSideOffset, ESpaces, SizeNames } from '../../../core/theme/sizes';
import { PIN_LENGTH } from '../consts';
import { createActiveAccount } from '../store/actions';
import { AuthReduxState } from '../store/reducer';
import { auth } from '../translations';

interface Props extends InjectedReduxProps {
  auth: AuthReduxState,
}
type TProps = NavigationInjectedProps & Props;

interface State {
  seed: any[];
  seedLimit: number;
  seedGenerated: boolean;
  passphraseGenerated: boolean;
  phrase: string[];
  account: Account | null;
  pin: string;
  error: string;
}

const styles = StyleSheet.create({
  mainView: {
    paddingHorizontal: defaultSideOffset
  },
  accountTypeView: {},
  newAccountView: {
    paddingVertical: ESpaces.s
  },
  seedGeneratorView: {},
  passphraseGeneratorView: {
    height: 250,
    borderRadius: 8,
    backgroundColor: Colors.greyLight,
    borderWidth: 1,
    borderColor: Colors.grey
  }
});

const passPhraseGenerator: PassPhraseGenerator = new PassPhraseGenerator();

class CreateAccount extends React.PureComponent<TProps, State> {
  private _panResponder: PanResponderInstance;
  private _didFocusSubscription: NavigationEventSubscription;
  private _willBlurSubscription?: NavigationEventSubscription;

  static navigationOptions = {
    title: i18n.t(auth.createAccount.title),
    headerLeft: PreventBackButton
  };

  state: State = {
    seed: [],
    seedLimit: 100,
    seedGenerated: false,
    passphraseGenerated: false,
    phrase: [],
    account: null,
    pin: '',
    error: ''
  };

  constructor (props: TProps) {
    super(props);
    this._didFocusSubscription = props.navigation.addListener('didFocus', (payload) =>
      BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    );
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (e: GestureResponderEvent, state: PanResponderGestureState) => true,
      onPanResponderMove: async (e: GestureResponderEvent, state: PanResponderGestureState) => {
        if (!this.state.seedGenerated) {
          if (this.state.seed.length >= this.state.seedLimit) {
            const phrase = await passPhraseGenerator.generatePassPhrase(this.state.seed);
            this.setState({ seedGenerated: true, phrase, passphraseGenerated: true });
          } else {
            const seedItem: any[] = [state.moveX, state.moveY, new Date()];
            const seed: any[] = [...this.state.seed, seedItem];

            this.setState({ seed });
          }
        }
      }
    });
  }

  componentDidMount () {
    this._willBlurSubscription = this.props.navigation.addListener('willBlur', (payload) =>
      BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    );
  }

  onBackButtonPressAndroid = () => {
    preventBackAction(() => {
      requestAnimationFrame(() => {
        this.props.navigation.goBack();
      });
    });
  }

  getFullPassphrase = (phrase: string[]) => {
    return phrase.join(' ');
  }

  generateAccount = async (): Promise<void> => {
    const { phrase, pin } = this.state;
    const account = await this.props.dispatch(createActiveAccount({ phrase, pin }));

    this.setState({
      account,
      phrase,
      error: ''
    });
  }

  handleChangePin = (pin: string) => {
    const isPinSecure = pin.length >= PIN_LENGTH || pin.length === 0;
    const error = isPinSecure ? '' : i18n.t(auth.errors.insecurePin, { length: PIN_LENGTH });
    this.setState({ pin, error });
  }

  renderPinEnter = () => {
    const { account, pin, error } = this.state;
    const isPinCorrect = pin.length !== 0;

    return (
      <View>
        <Input
          secureTextEntry={true}
          keyboardType={'numeric'}
          value={pin}
          placeholder={i18n.t(auth.models.account.pin)}
          onChangeText={this.handleChangePin}
          editable={!account}
        />
        <Text sizeName={SizeNames.sm} colorTheme={ColorThemeNames.light}>
          {i18n.t(auth.createAccount.enterPin)}
        </Text>
        <Text textAlign={'center'} color={Colors.pink}>{error}</Text>
        {isPinCorrect && (
          <Button onPress={this.generateAccount}>{i18n.t(auth.createAccount.createAccount)}</Button>
        )}
      </View>
    );
  }

  renderAccountInfo = () => {
    const { phrase, account } = this.state;
    const passphrase = this.getFullPassphrase(phrase);

    if (account) {
      return (
        <View>
          <Text sizeName={SizeNames.sm}>{i18n.t(auth.models.account.id)}</Text>
          <Text>{toString(account.id)}</Text>
          <Text sizeName={SizeNames.sm}>{i18n.t(auth.models.account.address)}</Text>
          <Text>{toString(account.address)}</Text>
          <Text sizeName={SizeNames.sm}>{i18n.t(auth.models.account.passphrase)}</Text>
          <Text marginBottom={ESpaces.sm}>{passphrase}</Text>
          <Text
            sizeName={SizeNames.sm}
            color={Colors.pink}
          >
            {i18n.t(auth.createAccount.notePassphraseHint)}
          </Text>
        </View>
      );
    } else {
      return null;
    }
  }

  renderGenerateInfo = () => {
    return this.state.account ? this.renderAccountInfo() : this.renderPinEnter();
  }

  renderSeedGenerator = () => {
    const { seed, seedLimit, pin } = this.state;
    const percent = Math.round(seed.length / seedLimit * 100.0);

    return (
      <View style={styles.seedGeneratorView}>
        <Text>{i18n.t(auth.createAccount.howToGenerate)}</Text>
        <Text>{i18n.t(auth.createAccount.generatedPercent, { percent })}</Text>
        <View style={styles.passphraseGeneratorView} {...this._panResponder.panHandlers} />
      </View>
    );
  }

  render () {
    const { seedGenerated } = this.state;

    return (
      <Screen>
        <ScrollView>
          <View style={styles.mainView}>
            <View style={styles.newAccountView}>
              {!seedGenerated ? this.renderSeedGenerator() : this.renderGenerateInfo()}
            </View>
          </View>
        </ScrollView>
      </Screen>
    );
  }
}

function mapStateToProps (state: ApplicationState) {
  return {
    auth: state.auth
  };
}

export const CreateAccountScreen = connect(mapStateToProps)(withNavigation(CreateAccount));
