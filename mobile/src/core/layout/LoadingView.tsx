import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {Colors} from '../theme/colors';
import {fonts} from '../theme/fonts';
import {FullHeightView} from './FullHeightView';

const styles = StyleSheet.create({
    loader: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: Colors.WHITE,
        fontFamily: fonts.signum
    }
});

export const LoadingView: React.FC = () => (
        <FullHeightView>
            <ActivityIndicator
                style={styles.loader}
                size={'large'}
                color={Colors.WHITE}
            />
        </FullHeightView>
);

