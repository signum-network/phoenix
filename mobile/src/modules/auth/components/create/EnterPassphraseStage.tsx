import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from '../../../../core/components/base/Button';
import { Text, TextThemes } from '../../../../core/components/base/Text';

const WORDS_PER_TRY = 3;

interface Props {
  phrase: string[];
  onFinish: () => void;
}

interface State {
  offset: number;
}

const styles = StyleSheet.create({
  hintView: {
    flexGrow: 1
  }
});

const getRandomIndex = (length: number): number => {
  return Math.floor(Math.random() * length);
};

export class EnterPassphraseStage extends React.PureComponent<Props, State> {

  isDone: boolean = false; // hax: bypass state to avoid double accounts being added
  state: State = {
    offset: 0
  };

  handleWordPress = (word: string) => () => {
    const { offset } = this.state;
    const { phrase } = this.props;
    const currentWord = phrase[offset];

    if (currentWord === word) {
      if (offset < phrase.length - 1) {
        this.setState({
          offset: offset + 1
        });
      } else if (!this.isDone) {
        this.isDone = true;
        this.props.onFinish();
      }
    }
  }

  getWords = (): string[] => {
    const { offset } = this.state;
    const { phrase } = this.props;
    const wordsCount = phrase.length;
    const currentWord = phrase[offset];

    const words: string[] = [currentWord];
    while (words.length <= WORDS_PER_TRY) {
      const word = phrase[getRandomIndex(wordsCount)];
      if (currentWord !== word) {
        words.push(word);
      }
    }

    // Sort words to prevent current word being always at first place
    return words.sort();
  }

  render () {
    const words = this.getWords();
    const passphrase = this.props.phrase.slice(0, this.state.offset).join(' ');

    return (
      <React.Fragment>
        <View style={styles.hintView}>
          <Text theme={TextThemes.HEADER}>Enter passphrase</Text>
          <Text>{passphrase}</Text>
        </View>
        <View>
          {words.map((word, idx) => {
            return (
              <Button key={`${idx}_${word}`} onPress={this.handleWordPress(word)}>{word}</Button>
            );
          })}
        </View>
      </React.Fragment>
    );
  }
}
