import React from 'react'
import { ActivityIndicator, StyleSheet, Text } from 'react-native'
import { colors } from '../theme/colors'
import { getFonts } from '../theme/fonts'
import { Screen } from './Screen'

function getStyles () {
  const styles = {
    view: {
      backgroundColor: colors.blue,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    loader: {
      marginTop: 100,
      marginBottom: 20
    },
    loaderText: {
      color: colors.white,
      fontFamily: getFonts().noto
    }
  }

  // TODO: fix types
  return StyleSheet.create(styles as any)
}

export class LoadingView extends React.PureComponent {
  render () {
    const styles = getStyles()

    return (
      <Screen style={styles.view}>
        <ActivityIndicator
          style={styles.loader}
          size={'large'}
          color={colors.white}
        />
        <Text style={styles.loaderText}>
          Loading application (i'm joking, just show you a loader screen)
        </Text>
      </Screen>
    )
  }
}
