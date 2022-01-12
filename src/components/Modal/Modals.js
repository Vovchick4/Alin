import React, { useEffect, useState } from 'react'
import { View, Modal, StyleSheet, Animated, TouchableNativeFeedback } from 'react-native'
import { Icon } from 'react-native-elements';

import { colors } from '../../constants/constantColor';

export default function Modals({ children, visible, onClose }) {
    const [showModal, setShowModal] = useState(visible);
    const scaleValue = React.useRef(new Animated.Value(0)).current;

    useEffect(() => {
        toggleModal();
    }, [visible]);

    const toggleModal = () => {
        if (visible) {
            setShowModal(true);
            Animated.spring(scaleValue, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            setTimeout(() => setShowModal(false), 200);
            Animated.timing(scaleValue, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    };

    return (
        <Modal transparent visible={showModal}>
            <View style={styles.modalBackGround} onTouchStart={onClose}></View>
            <View style={styles.centered}>
                <Animated.View
                    style={[styles.modalContainer, { transform: [{ scale: scaleValue }] }]}>
                    <TouchableNativeFeedback
                        onPress={onClose}
                        background={TouchableNativeFeedback.Ripple(colors.danger, true)}>
                        <View style={styles.buttonExit}>
                            <Icon type='font-awesome-5' name='times' size={30} color="white" />
                        </View>
                    </TouchableNativeFeedback>
                    {children}
                </Animated.View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalBackGround: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContainer: {
        position: 'relative',
        width: '80%',
        backgroundColor: colors.dark,
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 20,
        elevation: 20,
    },
    buttonExit: {
        position: 'absolute',
        top: 15,
        right: 15,
    },
});