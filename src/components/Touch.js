import React from 'react';
import { TouchableOpacity, TouchableNativeFeedback, Platform, View } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { COLOR } from '../ultils/constants/color';
const Touch = ({ disable, children, style, onPress, ripple, onLayout }) => (
    <Touchable
        style={style}
        onPress={onPress}
        background={Touchable.Ripple(ripple === undefined ? COLOR.WHITE : ripple, true)}
    >
        <View style={style} onLayout={onLayout}>
            {children}
        </View>
    </Touchable>
);

export { Touch };
