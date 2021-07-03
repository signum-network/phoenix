import {ApplicationState} from '../../../core/store/initialState';

export const selectIsPasscodeModalVisible = (state: ApplicationState): boolean => state.auth.passcodeModalVisible;
