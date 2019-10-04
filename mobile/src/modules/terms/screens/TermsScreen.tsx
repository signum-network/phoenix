import React from 'react';
import { StyleSheet, View } from 'react-native';
import Markdown from 'react-native-markdown-renderer';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { HeaderTitle } from '../../../core/components/header/HeaderTitle';
import { InjectedReduxProps } from '../../../core/interfaces';
import { FullHeightView } from '../../../core/layout/FullHeightView';
import { Screen } from '../../../core/layout/Screen';
import { routes } from '../../../core/navigation/routes';
import { ApplicationState } from '../../../core/store/initialState';
import { Sizes } from '../../../core/theme/sizes';
import { resetAuthState } from '../../auth/store/actions';
import { AuthReduxState } from '../../auth/store/reducer';

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

class Terms extends React.PureComponent<Props> {

  state = {
    erasePromptVisible: false
  };

  static navigationOptions = {
    headerTitle: <HeaderTitle>Terms of service</HeaderTitle>
  };

  toggleConfirmDeletePrompt = () => {
    this.setState({ erasePromptVisible: !this.state.erasePromptVisible });
  }

  confirmErase = () => {
    this.props.dispatch(resetAuthState());
    this.props.navigation.navigate(routes.home);
    this.toggleConfirmDeletePrompt();
  }

  render () {

    const copy = `# h1 Heading 8-)

    | Option | Description |
    | ------ | ----------- |
    | data   | path to data files to supply the data that will be passed into templates. |
    | engine | engine to be used for processing templates. Handlebars is the default. |
    | ext    | extension to be used for dest files. |
    `;

    return (
      <Screen>
        <FullHeightView>
          <View>
            <Markdown>{copy}</Markdown>
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

export const TermsScreen = connect(mapStateToProps)(withNavigation(Terms));
