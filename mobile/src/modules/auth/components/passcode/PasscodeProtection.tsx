import React, {useRef, useEffect} from 'react';
import {Modal, View, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {resetAuthState, setPasscodeEnteredTime, setPasscodeModalVisible} from '../../store/actions';
import {EnterPasscodeModalScreen} from './EnterPasscodeModalScreen';
import {SetPasscodeModalScreen} from './SetPasscodeModalScreen';
import {selectIsPasscodeModalVisible, selectPasscode} from '../../store/selectors';
import {resetAppState} from '../../../../core/store/app/actions';
import {defaultSettings} from '../../../../core/environment';

const styles = StyleSheet.create({
    view: {
        // @ts-ignore
        ...StyleSheet.absoluteFill
    }
});

export const PasscodeProtection: React.FC = ({children}) => {
    const timeoutHandle = useRef<number>();
    const dispatch = useDispatch();
    const passcode = useSelector(selectPasscode);
    const isPasscodeModalVisible = useSelector(selectIsPasscodeModalVisible);

    useEffect(() => {
        if (!isPasscodeModalVisible) {
            restartPasscodeTimer();
        }
        return () => {
            stopPasscodeTimer();
        };
    }, [isPasscodeModalVisible]);

    const stopPasscodeTimer = () => {
        if (timeoutHandle.current) {
            clearTimeout(timeoutHandle.current);
        }
    };

    const restartPasscodeTimer = () => {
        stopPasscodeTimer();
        timeoutHandle.current = setTimeout(() => {
            console.log('Protection active...');
            dispatch(setPasscodeModalVisible(true));
        }, defaultSettings.passcodeTime); // TODO: put the correct timer
    };

    const handleSuccess = () => {
        console.log('Correct passcode...');
        dispatch(setPasscodeModalVisible(false));
        restartPasscodeTimer();
    };

    const handleReset = () => {
        dispatch(resetAuthState());
        dispatch(resetAppState());
    };

    const handleActivity = () => {
        restartPasscodeTimer();
    };

    return (
        <>
            <Modal
                animationType={'slide'}
                visible={isPasscodeModalVisible}
                transparent={false}
            >
                {passcode
                    ? <EnterPasscodeModalScreen
                        passcode={passcode}
                        onSuccess={handleSuccess}
                        onReset={handleReset}
                    />
                    : <SetPasscodeModalScreen
                        onSuccess={handleSuccess}
                    />
                }
            </Modal>
            <View onTouchStart={handleActivity} style={styles.view}>
            {children}
           </View>
        </>
    );
};
