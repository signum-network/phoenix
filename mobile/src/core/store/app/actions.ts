import {
    loadAccounts,
    loadPasscode,
    loadPasscodeEnteredTime,
} from '../../../modules/auth/store/actions';
import {getSuggestedFees} from '../../../modules/network/store/actions';
import {loadHistoricalPriceApiData} from '../../../modules/price-api/store/actions';
import {AppSettings, UserSettings} from '../../interfaces';
import {fetchAppSettings} from '../../utils/keychain';
import {createAction, createActionFn} from '../../utils/store';
import {actionTypes} from './actionTypes';
import {fetchUserSettings, resetUserSettings, updateUserSettings} from '../../utils/storage';
import {selectChainApi} from './selectors';
import {asyncTryRun} from '../../utils/asyncTryRun';

const actions = {
    appLoaded: createAction<void>(actionTypes.appLoaded),
    setAppSettings: createAction<AppSettings>(actionTypes.setAppSettings),
    setUserSettings: createAction<UserSettings>(actionTypes.setUserSettings),
    // setAppSettings: createAction<AppSettings>(actionTypes.setAppSettings),
};

export const loadApp = createActionFn<void, Promise<void>>(
    async (dispatch) => {
        await Promise.all([
            dispatch(loadAccounts()),
            dispatch(loadPasscode()),
            dispatch(loadPasscodeEnteredTime()),
            dispatch(loadAppSettings()),
            dispatch(loadUserSettings())
        ]);
        dispatch(loadHistoricalPriceApiData());
        dispatch(getSuggestedFees());
        dispatch(actions.appLoaded());
    }
);

export const loadAppSettings = createActionFn<void, Promise<void>>(
    async (dispatch, _getState) =>
        asyncTryRun('loadAppSettings', async () => {
            const settings = await fetchAppSettings();
            console.log('loaded App Settings:', settings);
            dispatch(actions.setAppSettings(settings));
        })
);

export const loadUserSettings = createActionFn<void, Promise<void>>(
    async (dispatch, _getState) =>
        asyncTryRun('loadUserSettings', async () => {
            const settings = await fetchUserSettings();
            console.log('Loaded user Settings', settings);
            dispatch(actions.setUserSettings(settings));
        })
);

export const resetAppState = createActionFn<void, Promise<void>>(
    async (dispatch, _getState) =>
        asyncTryRun('resetAppState', async () => {
            const settings = await resetUserSettings();
            console.log('Reset App State', settings);
            dispatch(actions.setUserSettings(settings));
        })
);


// export const setAppSettings = createActionFn<AppSettings, Promise<void>>(
//     async (dispatch, _getState, settings) => {
//         dispatch(actions.setAppSettings(settings));
//         await saveAppSettings(settings);
//     }
// );

// export const save
//
// export const loadCurrentNode = createActionFn<void, Promise<void>>(
//     async (dispatch, getState) => {
//         const userSettings = await fetchUserSettings();
//         const state = getState();
//         if (selectIsAutomaticNodeSelection(state)) {
//             const api = selectChainApi(getState());
//             node = await api.service.selectBestHost(true);
//         }
//         // dispatch(actions.setNode(node));
//     }
// );

export const setNode = createActionFn<string, Promise<void>>(
    async (dispatch, _getState, node) => {
        await asyncTryRun('setNode', async () => {
                const partialSettings = {currentNodeHost: node};
                await updateUserSettings(partialSettings);
                dispatch(actions.setUserSettings(partialSettings));
                console.log('setNode:', node);
            }
        );
    }
);

export const agreeToTerms = createActionFn<void, Promise<void>>(
    async (dispatch, _getState) => {
        await asyncTryRun('agreeToTerms', async () => {
                const partialSettings: UserSettings = {agreedToTerms: true};
                await updateUserSettings(partialSettings);
                dispatch(actions.setUserSettings(partialSettings));
            }
        );
    }
);

export const autoSelectNode = createActionFn<boolean, Promise<void>>(
    async (dispatch, getState, isAutomatic) => {
        await asyncTryRun('autoSelectNode', async () => {
                const partialSettings = {isAutomaticNodeSelection: isAutomatic};
                dispatch(actions.setUserSettings(partialSettings));
                await updateUserSettings(partialSettings);
                console.log('autoSelectNode:', isAutomatic);
                if (!isAutomatic) {
                    return;
                }
                const state = getState();
                const api = selectChainApi(state);
                const bestNode = await api.service.selectBestHost(true);
                dispatch(setNode(bestNode));
            }
        );
    }
);
