import {translations} from 'i18n-js';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Modal, SafeAreaView, StyleSheet, View, Image} from 'react-native';
import VersionNumber from 'react-native-version-number';
import {NavigationInjectedProps} from 'react-navigation';
import {BSelect} from '../../../core/components/base/BSelect';
import {Button, ButtonThemes} from '../../../core/components/base/Button';
import {Text} from '../../../core/components/base/Text';
import {HeaderTitle} from '../../../core/components/header/HeaderTitle';
import {i18n} from '../../../core/i18n';
import {InjectedReduxProps} from '../../../core/interfaces';
import {FullHeightView} from '../../../core/layout/FullHeightView';
import {Screen} from '../../../core/layout/Screen';
import {routes} from '../../../core/navigation/routes';
import {AppReduxState} from '../../../core/store/app/reducer';
import {Colors} from '../../../core/theme/colors';
import {FontSizes, Sizes} from '../../../core/theme/sizes';
import {resetAuthState} from '../../auth/store/actions';
import {AuthReduxState} from '../../auth/store/reducer';
import {settings} from '../translations';
import {autoSelectNode, saveNode} from '../../../core/store/app/actions';
import {defaultSettings} from '../../../core/environment';
import {useNavigation} from '@react-navigation/native';
import {selectCurrentNode, selectIsAutomaticNodeSelection} from '../../../core/store/app/selectors';
import {SwitchItem} from '../../../core/components/base/SwitchItem';
import {logos} from '../../../assets/icons';

interface IProps extends InjectedReduxProps {
    auth: AuthReduxState;
    app: AppReduxState;
}

type Props = IProps & NavigationInjectedProps;

const styles = StyleSheet.create({
    container: {
        height: '90%',
        display: 'flex',
        justifyContent: 'center'
    },
    settingsZone: {
        flex: 2,
    },
    hintView: {
        paddingTop: Sizes.SMALL,
        flexGrow: 1
    },
    bodyText: {
        padding: 10
    },
    dangerZone: {
        position: 'relative',
        flex: 1,
        padding: Sizes.MEDIUM,
        borderRadius: 4,
        borderColor: Colors.WHITE,
        borderStyle: 'solid',
        borderWidth: 1,
    },
    dangerZoneLabel: {
        position: 'absolute',
        backgroundColor: Colors.BLUE,
        top: -10,
        left: 8,
        paddingHorizontal: 2,
    },
    flexBottom: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    signumjs: {
        height: 32,
        width: 32,
        marginRight: 8,
    }
});

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

export const SettingsScreen: React.FC<Props> = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [erasePromptVisible, setErasePromptVisible] = useState(false);
    const currentNode = useSelector(selectCurrentNode);
    const isAutomatic = useSelector(selectIsAutomaticNodeSelection);
    const [selectedNode, setSelectedNode] = useState(currentNode);

    const toggleConfirmDeletePrompt = () => {
        setErasePromptVisible(!erasePromptVisible);
    };

    const confirmErase = () => {
        dispatch(resetAuthState());
        navigation.navigate(routes.home);
        toggleConfirmDeletePrompt();
    };

    const getLocales = () => {
        return Object.keys(translations).map((locale) => {
            return {
                value: locale,
                label: locale
            };
        });
    };

    const handleNodeSelect = (node: string) => {
        setSelectedNode(node);
        if (node !== currentNode) {
            dispatch(saveNode(node));
        }
    };

    const setNodeAutoSelection = (automatic: boolean) => {
        dispatch(autoSelectNode(automatic));
    };

    const getNodeList = () => (defaultSettings.reliableNodeHosts as String[]).map(n => ({label: n, value: n}));


    return (
        <Screen>
            <FullHeightView>
                <HeaderTitle>{i18n.t(settings.screens.settings.title)}</HeaderTitle>
                <View style={styles.container}>
                    <View style={styles.settingsZone}>
                        <BSelect
                            value={selectedNode}
                            items={getNodeList()}
                            onChange={handleNodeSelect}
                            title={i18n.t(settings.screens.settings.selectNode)}
                            placeholder={i18n.t(settings.screens.settings.selectNode)}
                            disabled={isAutomatic}
                        />

                        <View>
                            <SwitchItem
                                onChange={setNodeAutoSelection}
                                text={i18n.t(settings.screens.settings.autoNodeSelection)}
                                labelColor={Colors.WHITE}
                                value={isAutomatic}
                            />
                        </View>
                    </View>
                    <View style={styles.dangerZone}>

                        <View style={styles.dangerZoneLabel}>
                            <Text color={Colors.WHITE} size={FontSizes.SMALLER}>Danger Zone</Text>
                        </View>
                        <Button theme={ButtonThemes.DANGER} onPress={toggleConfirmDeletePrompt}>
                            {i18n.t(settings.screens.settings.erase)}
                        </Button>
                    </View>

                    <View style={[styles.flexBottom, styles.bodyText]}>
                        <View>
                            <Image source={logos.signumjs} style={styles.signumjs}/>
                        </View>
                        <View>
                            <Text color={Colors.WHITE} size={FontSizes.SMALLER}>
                                Phoenix Signum Wallet {VersionNumber.appVersion} ({VersionNumber.buildVersion})
                            </Text>
                            <Text color={Colors.WHITE} size={FontSizes.SMALLER}>
                                {i18n.t(settings.screens.settings.copyright)}
                            </Text>
                        </View>
                    </View>

                    <Modal
                        animationType="slide"
                        visible={erasePromptVisible}
                    >
                        <SafeAreaView>
                            <View style={modalStyles.container}>
                                <View style={modalStyles.title}>
                                    <Text size={FontSizes.LARGE}>RESET ALL</Text>
                                </View>
                                <View style={modalStyles.body}>
                                    <Text size={FontSizes.MEDIUM}>{i18n.t(settings.screens.settings.confirmReset)}</Text>
                                </View>
                                <Button theme={ButtonThemes.ACCENT} onPress={toggleConfirmDeletePrompt}>
                                    {i18n.t(settings.screens.settings.cancel)}
                                </Button>
                                <Button theme={ButtonThemes.DANGER} onPress={confirmErase}>
                                    {i18n.t(settings.screens.settings.confirmErase)}
                                </Button>
                            </View>
                        </SafeAreaView>
                    </Modal>
                </View>
            </FullHeightView>
        </Screen>
    );
};
