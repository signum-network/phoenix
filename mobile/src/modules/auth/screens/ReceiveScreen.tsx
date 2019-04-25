import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { Text, TextThemes } from '../../../core/components/base/Text';
import { HeaderTitle } from '../../../core/components/header/HeaderTitle';
import { i18n } from '../../../core/i18n';
import { InjectedReduxProps } from '../../../core/interfaces';
import { FullHeightView } from '../../../core/layout/FullHeightView';
import { Screen } from '../../../core/layout/Screen';
import { ApplicationState } from '../../../core/store/initialState';
import { Sizes } from '../../../core/theme/sizes';
import { AuthReduxState } from '../store/reducer';
import { core } from '../translations';

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

class Receive extends React.PureComponent<Props> {
  static navigationOptions = {
    headerTitle: <HeaderTitle>{i18n.t(core.screens.receive.title)}</HeaderTitle>
  };

  render () {
    return (
      <Screen>
        <FullHeightView>
          <View style={styles.hintView}>
            <Text theme={TextThemes.HEADER}>
                {i18n.t(core.screens.receive.title)}
            </Text>
          </View>
          <View>
              <Text>
              (Receive burst form)
              </Text>
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

export const ReceiveScreen = connect(mapStateToProps)(withNavigation(Receive));
