import { NavigationScreenOptions } from 'react-navigation';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';

export const defaultStackOptions: NavigationScreenOptions = {
  headerStyle: {
    backgroundColor: colors.blue
  },
  headerTintColor: colors.white,
  headerTitleStyle: {
    fontWeight: 'bold',
    fontFamily: fonts.bebas
  }
};
