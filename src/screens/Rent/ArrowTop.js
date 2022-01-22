import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Icon } from 'react-native-elements';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { myColors } from '../../constants/constantColor';

export default function ArrowTop({ scrollTopRef, offsetY, offsetContent }) {
    const scale = React.useRef(new Animated.Value(0)).current

    useEffect(() => {
        if (offsetY >= offsetContent) {
            Animated.timing(scale, { toValue: 1, duration: 340, useNativeDriver: true }).start()
        } else {
            Animated.timing(scale, { toValue: 0, duration: 340, useNativeDriver: true }).start()
        }
    }, [offsetY])

    function scrollTop() {
        scrollTopRef.current.scrollToOffset({ offset: 0, animated: true })
    }

    return (
        <View style={styles.contentArrow}>
            <TouchableOpacity onPress={scrollTop}>
                <Animated.View style={[styles.content, { transform: [{ scale: scale }] }]}>
                    <Icon type="font-awesome-5" name="chevron-up" size={24} color={Colors.white} />
                </Animated.View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    contentArrow: {
        position: 'absolute',
        right: 8,
        bottom: 75,
        zIndex: 9999
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        borderRadius: 50,
        elevation: 50,
        backgroundColor: myColors.danger
    }
})