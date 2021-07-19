import { NavigationScreenOptions } from 'react-navigation';
import { Colors } from '../theme/colors';
import { fonts } from '../theme/fonts';

export const defaultStackOptions: NavigationScreenOptions = {
  headerStyle: {
    backgroundColor: Colors.BLUE,
    borderBottomWidth: 0
  },
  headerTintColor: Colors.GREEN,
  headerTitleStyle: {
    fontWeight: 'bold',
    fontFamily: fonts.signum
  }
};
