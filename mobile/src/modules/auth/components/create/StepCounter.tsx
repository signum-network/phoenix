import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TextAlign, TextThemes } from '../../../../core/components/base/Text';
import { i18n } from '../../../../core/i18n';
import { Sizes } from '../../../../core/theme/sizes';
import { auth } from '../../translations';

interface Props {
  stage: number;
}

const styles = StyleSheet.create({
  view: {
    paddingBottom: Sizes.SMALL
  }
});

export const StepCounter: React.FunctionComponent<Props> = ({ stage }: Props) => {
  return (
    <View style={styles.view}>
      <Text theme={TextThemes.HINT} textAlign={TextAlign.CENTER}>
        {i18n.t(auth.createAccount.step, { step: stage + 1 })}
      </Text>
    </View>
  );
};
