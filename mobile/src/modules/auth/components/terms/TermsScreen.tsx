import React from 'react';
import {Modal, ScrollView, StyleSheet} from 'react-native';
// @ts-ignore
import Markdown from 'react-native-markdown-package';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Button} from '../../../../core/components/base/Button';
import {Screen} from '../../../../core/layout/Screen';
import {Colors} from '../../../../core/theme/colors';
import {LICENSE} from './LICENSE';

interface Props {
  visible: boolean;
  onAgree: () => void;
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: Colors.BLUE,
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    zIndex: 10, // must be >9
  },
});

export class TermsScreen extends React.PureComponent<Props> {
  handleAgree = () => {
    this.props.onAgree();
  };

  render() {
    const {visible} = this.props;

    return (
      <Screen style={styles.view}>
        <SafeAreaProvider>
          <ScrollView style={{paddingLeft: 15, paddingRight: 15}}>
            <Markdown
              styles={{
                heading1: {
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#FFFFFF',
                  textTransform: 'uppercase',
                },
                heading2: {
                  fontSize: 12,
                  fontWeight: 'bold',
                },
                heading3: {
                  fontSize: 18,
                  fontWeight: 'bold',
                },
                heading4: {
                  fontSize: 16,
                  fontWeight: 'bold',
                },
                text: {
                  color: '#ffffff',
                },
              }}>
              {LICENSE}
            </Markdown>
            <Button onPress={this.handleAgree}>Agree</Button>
          </ScrollView>
        </SafeAreaProvider>
      </Screen>
    );
  }
}
