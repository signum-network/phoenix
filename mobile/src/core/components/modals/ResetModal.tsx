import React from 'react';
import {Modal, SafeAreaView, View, StyleSheet} from 'react-native';
import {Text} from '../base/Text';
import {FontSizes, Sizes} from '../../theme/sizes';
import {i18n} from '../../i18n';
import {auth} from '../../../modules/auth/translations';
import {Button, ButtonThemes} from '../base/Button';
import {settings} from '../../../modules/settings/translations';


const modalStyles = StyleSheet.create({
    container: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        padding: Sizes.LARGER
    },
    title: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: '10%',
        fontSize: FontSizes.LARGER,
    },
    body: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: FontSizes.MEDIUM,
    }

});

interface Props {
    visible: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

export const ResetModal: React.FC<Props> = ({visible, onConfirm, onCancel}) => {
    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={visible}
        >
            <SafeAreaView>
                <View style={modalStyles.container}>
                    <View style={modalStyles.title}>
                        <Text size={FontSizes.LARGE}>RESET</Text>
                    </View>
                    <View style={modalStyles.body}>
                        <Text size={FontSizes.MEDIUM}>{i18n.t(auth.enterPasscodeModal.confirmReset)}</Text>
                    </View>
                    <Button theme={ButtonThemes.ACCENT} onPress={onCancel}>
                        {i18n.t(settings.screens.settings.cancel)}
                    </Button>
                    <Button theme={ButtonThemes.DANGER} onPress={onConfirm}>
                        {i18n.t(settings.screens.settings.confirmErase)}
                    </Button>
                </View>
            </SafeAreaView>
        </Modal>
    );
};
