import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { COLOR } from '../ultils/constants/color';
import { Touch } from '../components';

const { width, height } = Dimensions.get('window');

const Header = ({ leftIcon, title, rightIcon, style, onLeftIconPress, onRightIconPress }) => (
    <LinearGradient style={[styles.container, style]} colors={COLOR.HEADER}>
        <Touch onPress={onLeftIconPress}>
            <Icon name={leftIcon} color='#FFF' style={{ paddingLeft: 20 }} size={30} />
        </Touch>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>{title}</Text>
        </View>
        <Touch onPress={onRightIconPress}>
            <Icon name={rightIcon} color='#FFF' style={{ paddingRight: 20 }} size={30} />
        </Touch>
    </LinearGradient>

);


const styles = StyleSheet.create({
    container: {
        height: height * 0.1,
        width,
        // backgroundColor: COLOR.HEADER,
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center'
    },
});
export { Header };
