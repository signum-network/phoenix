import {StackNavigationOptions} from '@react-navigation/stack';
import {Colors} from '../theme/colors';
import {fonts} from '../theme/fonts';

export const defaultStackOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: Colors.BLUE,
    borderBottomWidth: 0,
  },
  headerTintColor: Colors.GREEN,
  headerTitleStyle: {
    fontWeight: 'bold',
    fontFamily: fonts.signum,
  },
};
