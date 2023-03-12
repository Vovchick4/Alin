import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Text, View, Modal, StyleSheet, Animated, TouchableNativeFeedback } from 'react-native'
import { Icon } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

import { myColors } from '../../constants/constantColor';

export default function Modals({ children, visible, onClose }) {
    const { colors } = useTheme()
    const { t } = useTranslation()

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
                    style={[styles.modalContainer, colors.text === '#ffffff' ?
                        { backgroundColor: myColors.gray } : { backgroundColor: 'white' }, { transform: [{ scale: scaleValue }] }]}>
                    <ScrollView horizontal={false}>
                        <View style={styles.selectContent}>
                            <Text style={{ color: colors.text, fontSize: 18, marginBottom: 20, maxWidth: '90%' }}>{t('Choose Brand Car')}!</Text>
                            <TouchableNativeFeedback
                                onPress={onClose}
                                background={TouchableNativeFeedback.Ripple(myColors.danger, true)}>
                                <View style={styles.buttonExit}>
                                    <Icon type='font-awesome-5' name='times' size={30} color={colors.text} />
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                        {children}
                    </ScrollView>
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
        maxHeight: 280,
        // backgroundColor: myColors.dark,
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 20,
        elevation: 20,
    },
    selectContent: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    }
});