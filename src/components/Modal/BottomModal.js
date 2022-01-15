import React, { useEffect, useState } from "react";
import { StyleSheet, Animated, View, Modal, TouchableNativeFeedback } from "react-native";
import { Icon } from "react-native-elements";

import { myColors } from "../../constants/constantColor";

export default function BottomModal({ children, visible, onClose }) {
    const [showModal, setShowModal] = useState(visible);
    const scaleValue = React.useRef(new Animated.Value(0)).current;

    const AnimateState = {
        fromOpacity: new Animated.Value(0),
        toOpacity: new Animated.Value(1)
    }

    useEffect(() => {
        Animated.timing(AnimateState.fromOpacity, { toValue: 1, duration: 438, delay: 150, useNativeDriver: true }).start()
        toggleModal();
    }, [visible])

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
        <Modal transparent={true} visible={showModal}>
            <View style={styles.modalBackGround} onTouchStart={onClose}></View>
            <View style={styles.centered}>
                <Animated.View
                    style={[styles.modalContainer, {
                        transform: [{
                            translateY: scaleValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0 - (-1000 / 2) + (100 * 2 / 2), 30]
                            })
                        }]
                    }]}>
                    <TouchableNativeFeedback
                        onPress={onClose}
                        background={TouchableNativeFeedback.Ripple(myColors.danger, true)}>
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
        backgroundColor: 'rgba(0,0,0,0.83)',
    },
    modalContainer: {
        position: 'relative',
        top: 138,
        width: '100%',
        backgroundColor: myColors.dark,
        paddingBottom: 183,
        borderRadius: 20,
        elevation: 20,
    },
    buttonExit: {
        position: 'absolute',
        top: -34,
        right: 15,
    },
})

