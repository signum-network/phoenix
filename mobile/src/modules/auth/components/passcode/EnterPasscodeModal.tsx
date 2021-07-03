import React from 'react';
import { Modal } from 'react-native';
import { connect } from 'react-redux';
import { InjectedReduxProps } from '../../../../core/interfaces';
import { AppReduxState } from '../../../../core/store/app/reducer';
import { ApplicationState } from '../../../../core/store/initialState';
import { setPasscodeEnteredTime } from '../../store/actions';
import { AuthReduxState } from '../../store/reducer';
import { isPasscodeSet } from '../../store/utils';
import { EnterPasscodeModalScreen } from './EnterPasscodeModalScreen';
import { SetPasscodeModalScreen } from './SetPasscodeModalScreen';

interface OwnProps {
  visible: boolean;
  onSuccess: () => void;
  onCancel?: () => void;
  onDismiss?: () => void;
  onReset?: () => void;
}

interface InjectedProps extends InjectedReduxProps {
  app: AppReduxState;
  auth: AuthReduxState;
}

type Props = OwnProps & InjectedProps;

class EnterPasscode extends React.PureComponent<Props> {
  handleSubmit = () => {
    this.props.dispatch(setPasscodeEnteredTime(Date.now()));
    this.props.onSuccess();
  }

  handleDismiss = () => {
    const { onDismiss } = this.props;

    onDismiss && onDismiss();
  }

  handleCancel = () => {
    const { onCancel } = this.props;

    onCancel && onCancel();
  }

  handleReset = () => {
    const { onReset } = this.props;

    onReset && onReset();
  }

  render () {
    const { visible, auth } = this.props;
    const isCodeSet = isPasscodeSet(auth.passcode);

    return (
      <Modal
        animationType={'slide'}
        visible={visible}
        transparent={false}
        onRequestClose={this.handleCancel}
        onDismiss={this.handleDismiss}
      >
        {isCodeSet ? (
          <EnterPasscodeModalScreen
              passcode={auth.passcode}
              onSuccess={this.handleSubmit}
              onCancel={this.handleCancel}
              onReset={this.handleReset}
          />
        ) : (
          <SetPasscodeModalScreen
              onSuccess={this.handleSubmit}
              onCancel={this.handleCancel}
          />
        )}
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

export const EnterPasscodeModal = connect(mapStateToProps)(EnterPasscode);
