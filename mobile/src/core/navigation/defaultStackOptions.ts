import { NavigationScreenOptions } from 'react-navigation';
import { Colors } from '../theme/colors';
import { fonts } from '../theme/fonts';

export const defaultStackOptions: NavigationScreenOptions = {
  headerStyle: {
    backgroundColor: Colors.BLUE
  },
  headerTintColor: Colors.WHITE,
  headerTitleStyle: {
    fontWeight: 'bold',
    fontFamily: fonts.bebas
  }
};
