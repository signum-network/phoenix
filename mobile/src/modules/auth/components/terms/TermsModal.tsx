import React from 'react';
import { Modal, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import Markdown from 'react-native-markdown-renderer';
import { connect } from 'react-redux';
import { Button } from '../../../../core/components/base/Button';
import { InjectedReduxProps } from '../../../../core/interfaces';
import { Screen } from '../../../../core/layout/Screen';
import { AppReduxState } from '../../../../core/store/app/reducer';
import { ApplicationState } from '../../../../core/store/initialState';
import { Colors } from '../../../../core/theme/colors';
import { setAgreeToTerms } from '../../store/actions';
import { AuthReduxState } from '../../store/reducer';
import { LICENSE } from './LICENSE';

interface OwnProps {
  visible: boolean;
  onAgree: () => void;
}

interface InjectedProps extends InjectedReduxProps {
  app: AppReduxState;
  auth: AuthReduxState;
}

type Props = OwnProps & InjectedProps;

const styles = StyleSheet.create({
  view: {
    backgroundColor: Colors.BLUE
  },
  heading1: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'uppercase'
  },
  heading2: {
    fontSize: 12,
    fontWeight: 'bold'
  },
  heading3: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  heading4: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  text: {
    color: '#ffffff'
  }
});

class Terms extends React.PureComponent<Props> {
  handleAgree = () => {
    this.props.dispatch(setAgreeToTerms(true));
    this.props.onAgree();
  }

  render () {
    const { visible } = this.props;

    return (
      <Modal
        animationType={'slide'}
        visible={visible}
        transparent={false}
      >
        <Screen style={styles.view}>
          <SafeAreaView>
            <ScrollView style={{ marginTop: 15, paddingLeft: 15, paddingRight: 15 }}>
              <Markdown style={styles}>{LICENSE}</Markdown>
              <Button onPress={this.handleAgree}>Agree</Button>
            </ScrollView>
          </SafeAreaView>
        </Screen>
      </Modal>
    );
  }
}

function mapStateToProps (state: ApplicationState) {
  return {
    app: state.app,
    auth: state.auth
  };
}

export const TermsModal = connect(mapStateToProps)(Terms);
