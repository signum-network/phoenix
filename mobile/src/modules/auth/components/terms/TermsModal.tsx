import React from 'react';
import { Modal, ScrollView, StyleSheet } from 'react-native';
import Markdown from 'react-native-markdown-renderer';
import { SafeAreaView } from 'react-navigation';
import { Button } from '../../../../core/components/base/Button';
import { Screen } from '../../../../core/layout/Screen';
import { Colors } from '../../../../core/theme/colors';
import { LICENSE } from './LICENSE';

interface Props {
  visible: boolean;
  onAgree: () => void;
}

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

export class TermsModal extends React.PureComponent<Props> {
  handleAgree = () => {
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
        <Screen style={styles.view} >
          <SafeAreaView>
            <ScrollView style={{ paddingLeft: 15, paddingRight: 15 }}>
              <Markdown style={styles}>{LICENSE}</Markdown>
              <Button onPress={this.handleAgree}>Agree</Button>
            </ScrollView>
          </SafeAreaView>
        </Screen>
      </Modal>
    );
  }
}
