import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {NavigationInjectedProps, withNavigation} from 'react-navigation';
import {connect} from 'react-redux';
import {Button, ButtonThemes} from '../../../core/components/base/Button';
import {Text, TextThemes} from '../../../core/components/base/Text';
import {HeaderTitle} from '../../../core/components/header/HeaderTitle';
import {i18n} from '../../../core/i18n';
import {InjectedReduxProps} from '../../../core/interfaces';
import {FullHeightView} from '../../../core/layout/FullHeightView';
import {Screen} from '../../../core/layout/Screen';
import {routes} from '../../../core/navigation/routes';
import {ApplicationState} from '../../../core/store/initialState';
import {Colors} from '../../../core/theme/colors';
import {Sizes} from '../../../core/theme/sizes';
import {AuthReduxState} from '../store/reducer';
import {auth} from '../translations';
import {actionIcons} from '../../../assets/icons';
import {core} from '../../../core/translations';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/mainStack';

type AddAccountNavProp = StackNavigationProp<RootStackParamList, 'AddAccount'>;

interface IProps extends InjectedReduxProps {
    auth: AuthReduxState;
    navigation: AddAccountNavProp;
}

const styles = StyleSheet.create({
    hintView: {
        paddingTop: Sizes.SMALL,
        marginVertical: 40
    },
    center: {
        flex: 1,
        justifyContent: 'center'
    }
});

class AddAccount extends React.PureComponent<IProps> {
    static navigationOptions = {
        headerTitle: <HeaderTitle>{i18n.t(auth.addAccount.title)}</HeaderTitle>
    };

    handleCreateAccount = () => {
        this.props.navigation.navigate(routes.createAccount);
    }

    handleImportAccount = () => {
        this.props.navigation.navigate(routes.importAccount);
    }

    render() {
        return (
            <FullHeightView withoutPaddings style={{backgroundColor: Colors.WHITE}}>
                <View style={{backgroundColor: Colors.BLUE_DARKER, flexDirection: 'row'}}>
                    <TouchableOpacity
                        style={{flexDirection: 'row', position: 'absolute', zIndex: 1, left: 10, top: 10}}
                        onPress={this.props.navigation.goBack}>
                        <Image source={actionIcons.chevronLeft} style={{width: 30, height: 30}}/>
                        <Text color={Colors.WHITE}>{i18n.t(core.actions.back)}</Text>
                    </TouchableOpacity>
                    <View style={{flex: 1, alignItems: 'center', margin: 10}}>
                        <HeaderTitle>
                            {i18n.t(auth.addAccount.title)}
                        </HeaderTitle>
                    </View>
                </View>
                <View style={styles.center}>
                    <View style={styles.hintView}>
                        <Text theme={TextThemes.HEADER}>
                            {i18n.t(auth.addAccount.hint)}
                        </Text>
                    </View>
                    <View>
                        <Button theme={ButtonThemes.ACCENT} onPress={this.handleCreateAccount}>
                            {i18n.t(auth.addAccount.createAccount)}
                        </Button>
                        <Button theme={ButtonThemes.ACCENT} onPress={this.handleImportAccount}>
                            {i18n.t(auth.addAccount.importAccount)}
                        </Button>
                    </View>
                </View>
            </FullHeightView>
        );
    }
}

function mapStateToProps(state: ApplicationState) {
    return {
        auth: state.auth
    };
}

export const AddAccountScreen = connect(mapStateToProps)(AddAccount);
