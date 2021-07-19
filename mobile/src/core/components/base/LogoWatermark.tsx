import {Image, StyleSheet, View} from 'react-native';
import {logos} from '../../../assets/icons';
import React from 'react';

const styles = StyleSheet.create({
        root: {
            position: 'relative',
        },
        image: {
            ...StyleSheet.absoluteFill,
            top: -128,
            left: -160,
            transform: [
                {translateX: -512},
                {translateY: -512},
                {scale: 0.33},
                {translateX: 512},
                {translateY: 512},
            ]
        },
    }
);

export const LogoWatermark: React.FC = () => (
    <View style={styles.root}>
        <Image source={logos.iconnode} style={styles.image}/>
    </View>
);
