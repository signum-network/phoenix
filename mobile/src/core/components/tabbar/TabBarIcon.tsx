import * as React from 'react';
import {Image, ImageSourcePropType} from 'react-native';

interface Props {
  source: ImageSourcePropType;
}

const styles = {
  width: 20,
  height: 20,
};

export const TabBarIcon = ({source, focused}: Props) => (
  <Image source={source} style={{...styles, opacity: focused ? 1 : 0.5}} />
);
