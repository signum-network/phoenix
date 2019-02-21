import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from '../../../../core/components/base/Button';
import { Text, TextAlign, TextThemes } from '../../../../core/components/base/Text';
import { i18n } from '../../../../core/i18n';
import { flexGrowStyle } from '../../../../core/utils/styles';
import { auth } from '../../translations';

const WORDS_PER_PAGE = 3;

interface Props {
  phrase: string[];
  onFinish: () => void;
}

interface State {
  offset: number;
}

const styles = StyleSheet.create({
  words: {
    paddingBottom: 100
  }
});

export class NotePassphraseStage extends React.PureComponent<Props, State> {
  state: State = {
    offset: 0
  };

  handleNextButtonPress = () => {
    const { offset } = this.state;
    const { phrase } = this.props;
    if (offset + WORDS_PER_PAGE < phrase.length - 1) {
      this.setState({ offset: offset + WORDS_PER_PAGE });
    } else {
      this.props.onFinish();
    }
  }

  render () {
    const { offset } = this.state;
    const words = this.props.phrase.slice(offset, offset + WORDS_PER_PAGE).join(' ');

    return (
      <React.Fragment>
        <View style={flexGrowStyle}>
          <Text theme={TextThemes.HEADER}>{i18n.t(auth.createAccount.notePassphrase)}</Text>
        </View>
        <View style={styles.words}>
          <Text theme={TextThemes.ACCENT} textAlign={TextAlign.CENTER}>
            {words}
          </Text>
        </View>
        <View>
          <Text
            theme={TextThemes.HINT}
            textAlign={TextAlign.CENTER}
          >
            {i18n.t(auth.createAccount.notePassphraseHint)}
          </Text>
          <Text theme={TextThemes.DANGER}>{i18n.t(auth.createAccount.notePassphraseHint2)}</Text>
          <Button onPress={this.handleNextButtonPress}>
            {i18n.t(auth.createAccount.next)}
          </Button>
        </View>
      </React.Fragment>
    );
  }
}
