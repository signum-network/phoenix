import { Account } from '@burstjs/core';
import { PassPhraseGenerator } from '@burstjs/crypto';
import React from 'react';
import { Alert } from 'react-native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { HeaderTitle } from '../../../core/components/header/HeaderTitle';
import { i18n } from '../../../core/i18n';
import { InjectedReduxProps } from '../../../core/interfaces';
import { FullHeightView } from '../../../core/layout/FullHeightView';
import { Screen } from '../../../core/layout/Screen';
import { routes } from '../../../core/navigation/routes';
import { ApplicationState } from '../../../core/store/initialState';
import { EnterPassphraseStage } from '../components/create/EnterPassphraseStage';
import { EnterPinStage } from '../components/create/EnterPinStage';
import { NotePassphraseStage } from '../components/create/NotePassphraseStage';
import { SeedGeneratorStage } from '../components/create/SeedGeneratorStage';
import { StepCounter } from '../components/create/StepCounter';
import { addAccount, createActiveAccount } from '../store/actions';
import { AuthReduxState } from '../store/reducer';
import { auth } from '../translations';

interface IProps extends InjectedReduxProps {
  auth: AuthReduxState,
}
type Props = NavigationInjectedProps & IProps;

interface State {
  stage: Stages;
  seed: any[];
  phrase: string[];
  account: Account | null;
  pin: string;
}

enum Stages {
  GENERATE_SEED = 0,
  ENTER_PIN = 1,
  NOTE_PASSPHRASE = 2,
  ENTER_PASSPHRASE = 3
}

const getDefaultState = (): State => ({
  stage: Stages.GENERATE_SEED,
  seed: [],
  phrase: [],
  account: null,
  pin: ''
});

const passPhraseGenerator: PassPhraseGenerator = new PassPhraseGenerator();

class CreateAccount extends React.PureComponent<Props, State> {
  static navigationOptions = {
    headerTitle: <HeaderTitle>{i18n.t(auth.createAccount.title)}</HeaderTitle>
  };

  state: State = getDefaultState();

  createAccount = async () => {
    const { phrase, pin } = this.state;

    try {
      const account = await this.props.dispatch(createActiveAccount({ phrase, pin }));
      this.setState({
        account,
        stage: Stages.NOTE_PASSPHRASE
      });
    } catch (error) {
      // This error shouldn't be possible, but still
      this.setState(getDefaultState());
      Alert.alert(error.message);
    }
  }

  saveAccount = async () => {
    // @ts-ignore because we have account here 100%
    await this.props.dispatch(addAccount(this.state.account));
  }

  handlePhraseEntered = async () => {
    await this.saveAccount();
    this.props.navigation.navigate(routes.accounts);
  }

  handlePhraseNoted = () => {
    this.setState({
      stage: Stages.ENTER_PASSPHRASE
    });
  }

  handlePinEntered = (newPin: string) => {
    this.setState({ pin: newPin }, async () => {
      await this.createAccount();
    });
  }

  handleSeedGenerated = async (seed: string[]) => {
    const phrase = await passPhraseGenerator.generatePassPhrase(seed);
    this.setState({ phrase, stage: Stages.ENTER_PIN });
  }

  renderStage = () => {
    const { stage, phrase } = this.state;

    switch (stage) {
      case Stages.GENERATE_SEED:
        return <SeedGeneratorStage onSeedGenerated={this.handleSeedGenerated}/>;
      case Stages.ENTER_PIN:
        return <EnterPinStage onFinish={this.handlePinEntered}/>;
      case Stages.NOTE_PASSPHRASE:
        return <NotePassphraseStage phrase={phrase} onFinish={this.handlePhraseNoted}/>;
      case Stages.ENTER_PASSPHRASE:
        return <EnterPassphraseStage phrase={phrase} onFinish={this.handlePhraseEntered} />;
    }

    return null;
  }

  render () {
    return (
      <Screen>
        <FullHeightView>
          <StepCounter stage={this.state.stage}/>
          {this.renderStage()}
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

export const CreateAccountScreen = connect(mapStateToProps)(withNavigation(CreateAccount));
