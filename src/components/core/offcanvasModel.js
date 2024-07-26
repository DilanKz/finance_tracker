import { Animated, Dimensions, Modal, TouchableWithoutFeedback, View } from "react-native";
import { useEffect, useRef } from "react";

const { height: windowHeight } = Dimensions.get('window');

export const OffCanvasModel = ({ children, modalVisible, setModalVisible,height }) => {
    const slideAnim = useRef(new Animated.Value(windowHeight)).current;

    useEffect(() => {
        if (modalVisible) {
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: windowHeight,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [modalVisible]);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    return (
        <Modal
            visible={modalVisible}
            transparent
            animationType="none"
            onRequestClose={toggleModal}
        >
            <TouchableWithoutFeedback onPress={toggleModal}>
                <View className="flex-1 justify-end" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
                    <TouchableWithoutFeedback>
                        <Animated.View
                            style={{
                                transform: [{ translateY: slideAnim }],
                                height: height,
                                backgroundColor: 'white',
                                borderTopLeftRadius: 20,
                                borderTopRightRadius: 20,
                                padding: 16,
                                shadowColor: "#000",
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                elevation: 5,
                            }}
                        >
                            {children}
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};
