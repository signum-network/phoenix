import {
    loadAccounts,
    loadAgreeToTerms,
    loadPasscode,
    loadPasscodeEnteredTime,
} from '../../../modules/auth/store/actions';
import {getSuggestedFees} from '../../../modules/network/store/actions';
import {loadHistoricalPriceApiData} from '../../../modules/price-api/store/actions';
import {AsyncStorageKeys} from '../../enums';
import {AppSettings} from '../../interfaces';
import {getAppSettings, saveAppSettings} from '../../utils/keychain';
import {createAction, createActionFn} from '../../utils/store';
import {actionTypes} from './actionTypes';
import {getCurrentNode} from './utils';
import {save} from '../../utils/storage';
import {selectChainApi, selectIsAutomaticNodeSelection} from './selectors';

const actions = {
    appLoaded: createAction<void>(actionTypes.appLoaded),
    appSettingsLoaded: createAction<AppSettings>(actionTypes.appSettingsLoaded),
    // setAppSettings: createAction<AppSettings>(actionTypes.setAppSettings),
    setNode: createAction<string>(actionTypes.setNode),
    setAutomaticNodeSelection: createAction<boolean>(actionTypes.setAutomaticNodeSelection)
};

export const loadApp = createActionFn<void, Promise<void>>(
    async (dispatch) => {
        await Promise.all([
            dispatch(loadAccounts()),
            dispatch(loadPasscode()),
            dispatch(loadPasscodeEnteredTime()),
            dispatch(loadAppSettings()),
            dispatch(loadAgreeToTerms()),
            dispatch(loadCurrentNode())
        ]);
        dispatch(loadHistoricalPriceApiData());
        dispatch(getSuggestedFees());
        dispatch(actions.appLoaded());
    }
);

export const loadAppSettings = createActionFn<void, Promise<void>>(
    async (dispatch, _getState) => {
        const settings: AppSettings = await getAppSettings();

        console.log('loadAppSettings', settings);

        dispatch(actions.appSettingsLoaded(settings));
    }
);

// export const setAppSettings = createActionFn<AppSettings, Promise<void>>(
//     async (dispatch, _getState, settings) => {
//         dispatch(actions.setAppSettings(settings));
//         await saveAppSettings(settings);
//     }
// );

export const saveNode = createActionFn<string, Promise<void>>(
    async (dispatch, _getState, node) => {
        try {
            await save(AsyncStorageKeys.currentNode, node);
            console.log('saved', node);
        } catch (error) {
            // Error saving data
        }
        dispatch(actions.setNode(node));
    }
);

export const autoSelectNode = createActionFn<boolean, Promise<void>>(
    async (dispatch, getState, isAutomatic) => {
        try {
            dispatch(actions.setAutomaticNodeSelection(isAutomatic));

            const state = getState();
            if (isAutomatic) {
                const api = selectChainApi(state);
                const bestNode = await api.service.selectBestHost(true);
                dispatch(actions.setNode(bestNode));
            }
            state.app.appSettings.isAutomaticNodeSelection = isAutomatic;


            // await saveAppSettings(state.app.appSettings);
        } catch (error) {
            // Error saving data
        }
    }
);

export const loadCurrentNode = createActionFn<void, Promise<void>>(
    async (dispatch, getState) => {
        let node = await getCurrentNode();

        const state = getState();
        if (selectIsAutomaticNodeSelection(state)) {
            const api = selectChainApi(getState());
            node = await api.service.selectBestHost(true);
        }
        dispatch(actions.setNode(node));
    }
);
