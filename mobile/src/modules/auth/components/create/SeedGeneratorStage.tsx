import React from 'react';
import {
  GestureResponderEvent,
  PanResponder,
  PanResponderGestureState,
  PanResponderInstance,
  StyleSheet,
  View
} from 'react-native';
import { Text, TextAlign, TextThemes } from '../../../../core/components/base/Text';
import { i18n } from '../../../../core/i18n';
import { Colors } from '../../../../core/theme/colors';
import { BorderRadiusSizes } from '../../../../core/theme/sizes';
import { flexGrowStyle } from '../../../../core/utils/styles';
import { auth } from '../../translations';

const SEED_LIMIT = 100;

const styles = StyleSheet.create({
  panResponderView: {
    height: 250,
    borderRadius: BorderRadiusSizes.LARGE,
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.BLUE
  }
});

interface Props {
  onSeedGenerated: (phrase: string[]) => void;
}

interface State {
  seedGenerated: boolean;
  seed: any[];
  percent: number;
}

export class SeedGeneratorStage extends React.PureComponent<Props, State> {
  private _panResponder: PanResponderInstance;

  state: State = {
    seedGenerated: false,
    seed: [],
    percent: 0
  };

  constructor (props: Props) {
    super(props);
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (_e: GestureResponderEvent, _state: PanResponderGestureState) => true,
      onPanResponderMove: async (_e: GestureResponderEvent, state: PanResponderGestureState) => {
        const { seed, seedGenerated } = this.state;

        if (!seedGenerated) {
          if (seed.length < SEED_LIMIT) {
            const seedItem: any[] = [state.moveX, state.moveY, new Date()];
            const newSeed: any[] = [...seed, seedItem];

            this.setState({ seed: newSeed });
          } else {
            this.props.onSeedGenerated(seed);

            this.setState({ seedGenerated: true });
          }
        }
      }
    });
  }

  render () {
    const percent = Math.round(this.state.seed.length / SEED_LIMIT * 100.0);

    return (
      <React.Fragment>
        <View style={flexGrowStyle}>
          <Text theme={TextThemes.HEADER}>{i18n.t(auth.createAccount.generateSeed)}</Text>
        </View>
        <Text textAlign={TextAlign.CENTER}>{i18n.t(auth.createAccount.generatedPercent, { percent })}</Text>
        <View style={styles.panResponderView} {...this._panResponder.panHandlers} />
        <Text theme={TextThemes.HINT}>{i18n.t(auth.createAccount.howToGenerate)}</Text>
      </React.Fragment>
    );
  }
}
