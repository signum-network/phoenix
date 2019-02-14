import { NavigationScreenOptions } from 'react-navigation';
import { Colors } from '../theme/colors';
import { fonts } from '../theme/fonts';

export const defaultStackOptions: NavigationScreenOptions = {
  headerStyle: {
    backgroundColor: Colors.blue
  },
  headerTintColor: Colors.white,
  headerTitleStyle: {
    fontWeight: 'bold',
    fontFamily: fonts.bebas
  }
};
