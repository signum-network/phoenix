import {translations} from 'i18n-js';
import React from 'react';
import {Modal, SafeAreaView, StyleSheet, View} from 'react-native';
import VersionNumber from 'react-native-version-number';
import {NavigationInjectedProps, withNavigation} from 'react-navigation';
import {connect} from 'react-redux';
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
import {ApplicationState} from '../../../core/store/initialState';
import {Colors} from '../../../core/theme/colors';
import {FontSizes, Sizes} from '../../../core/theme/sizes';
import {resetAuthState} from '../../auth/store/actions';
import {AuthReduxState} from '../../auth/store/reducer';
import {settings} from '../translations';
import {saveNode} from '../../../core/store/app/actions';
import {defaultSettings} from '../../../core/environment';

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
    hintView: {
        paddingTop: Sizes.SMALL,
        flexGrow: 1
    },
    bodyText: {
        padding: 10
    },
    flexBottom: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
});

const modalStyles = StyleSheet.create({
    container: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
    body: {
        justifyContent: 'center',
        alignItems: 'center'
    }

});

class Settings extends React.PureComponent<Props> {

    state = {
        erasePromptVisible: false,
        selectedNode: this.props.app.chainService.settings.nodeHost
    };

    toggleConfirmDeletePrompt = () => {
        this.setState({erasePromptVisible: !this.state.erasePromptVisible});
    };

    confirmErase = () => {
        this.props.dispatch(resetAuthState());
        this.props.navigation.navigate(routes.home);
        this.toggleConfirmDeletePrompt();
    };

    getLocales = () => {
        return Object.keys(translations).map((locale) => {
            return {
                value: locale,
                label: locale
            };
        });
    };

    handleNodeSelect = (selectedNode: string) => {
        this.setState({
            selectedNode
        });
        this.props.dispatch(saveNode(selectedNode));
        this.forceUpdate();
    };

    render() {
        const nodes = (defaultSettings.reliableNodeHosts as String[]).map(n => ({label: n, value: n}));

        const {selectedNode} = this.state;

        return <Screen>
            <FullHeightView>
                <HeaderTitle>{i18n.t(settings.screens.settings.title)}</HeaderTitle>
                <View style={styles.container}>
                    <BSelect
                        // @ts-ignore bad .d.ts
                        value={selectedNode}
                        items={nodes}
                        onChange={this.handleNodeSelect}
                        title={i18n.t(settings.screens.settings.selectNode)}
                        placeholder={i18n.t(settings.screens.settings.selectNode)}
                    />

                    <Button onPress={this.toggleConfirmDeletePrompt}>
                        {i18n.t(settings.screens.settings.erase)}
                    </Button>

                    <View style={[styles.flexBottom, styles.bodyText]}>
                        <Text color={Colors.WHITE} size={FontSizes.SMALLER}>
                            Phoenix Signum Wallet {VersionNumber.appVersion} ({VersionNumber.buildVersion})
                        </Text>
                        <Text color={Colors.WHITE} size={FontSizes.SMALLER}>
                            {i18n.t(settings.screens.settings.copyright)}
                        </Text>
                    </View>

                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.erasePromptVisible}
                        // tslint:disable-next-line: jsx-no-lambda
                        onRequestClose={() => {
                            // Alert.alert('Modal has been closed.');
                        }}
                    >
                        <SafeAreaView>
                            <View style={modalStyles.container}>
                                <View style={modalStyles.body}>
                                    <Text>{i18n.t(settings.screens.settings.confirmReset)}</Text>
                                </View>

                                <Button theme={ButtonThemes.ACCENT} onPress={this.toggleConfirmDeletePrompt}>
                                    {i18n.t(settings.screens.settings.cancel)}
                                </Button>

                                <Button onPress={this.confirmErase}>
                                    {i18n.t(settings.screens.settings.confirmErase)}
                                </Button>
                            </View>
                        </SafeAreaView>
                    </Modal>
                </View>
            </FullHeightView>
        </Screen>;
    }
}

function mapStateToProps(state: ApplicationState) {
    return {
        auth: state.auth,
        app: state.app
    };
}

export const SettingsScreen = connect(mapStateToProps)(withNavigation(Settings));
