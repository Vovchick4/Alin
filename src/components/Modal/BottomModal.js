import React, { useEffect } from "react";
import { StyleSheet, Animated, Text, View, Modal, Button, TouchableNativeFeedback } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

import { colors } from "../../constants/constantColor";

export default function BottomModal({ children, visible, onClose }) {
    const AnimateState = {
        fromOpacity: new Animated.Value(0),
        toOpacity: new Animated.Value(1)
    }

    useEffect(() => {
        Animated.timing(AnimateState.fromOpacity, { toValue: 1, duration: 438, delay: 150, useNativeDriver: true }).start()
    }, [visible])

    return (
        <React.Fragment>
            <Modal animationType='slide' transparent={true} visible={visible}>
                <TouchableNativeFeedback onPress={onClose}>
                    <Animated.View style={{
                        opacity: AnimateState.fromOpacity,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.83)',
                        zIndex: 30,
                    }}>
                    </Animated.View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={onClose}>
                    <Text style={styles.buttonExit}>x</Text>
                </TouchableNativeFeedback>
                <View style={styles.modalContainer}>
                    <View style={styles.content}>
                        {children}
                    </View>
                </View>
            </Modal>
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        position: 'absolute',
        top: 138,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 40
    },
    dimmer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.83)',
        zIndex: 30,
    },
    contentButtonExit: {
        alignContent: 'flex-end',
        justifyContent: 'center'
    },
    buttonExit: {
        position: 'absolute',
        top: 83,
        right: 40,
        zIndex: 60,
        color: Colors.white,
        fontSize: 40,
        fontWeight: '700'
    },
    content: {
        backgroundColor: colors.danger,
        width: "100%",
        height: "100%",
        borderRadius: 12
    },
})

