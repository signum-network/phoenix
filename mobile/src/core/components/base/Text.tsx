import React from 'react';
import { StyleSheet, Text as RNText, TextProps } from 'react-native';
import { fonts } from '../../theme/fonts';

interface IProps extends TextProps {
  children: string | string[];
  isHeader?: boolean;
}

/**
 * Standard text component from React Native, but with our fonts.
 * isHeader stands for font that we use for headers - Bebas Neue.
 *
 * NOTE: if you pass custom style properties, you should set font manually.
 */
export class Text extends React.PureComponent<IProps> {
  getStyles = (): any => {
    const styles = {
      text: {
        fontFamily: this.props.isHeader ? fonts.bebas : fonts.noto
      }
    };

    return StyleSheet.create(styles as any);
  }

  render () {
    const { children } = this.props;
    const styles = this.getStyles();

    return (
      <RNText style={styles.text} {...this.props}>
        {children}
      </RNText>
    );
  }
}
