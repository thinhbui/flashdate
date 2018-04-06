import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { Text, View } from 'react-native';
import { Touch } from '../components';
import { COLOR } from '../ultils/constants/color';

const GradientButton = ({ title, style, icon, sizeIcon, textStyle, colors,
    linearStyle, iconColor, onPress, ripple, map, disable, contentStyle, loading }) => (
        map ? <View
            style={[{
                opacity: loading ? 0 : 1,
                justifyContent: 'center',
                alignItems: 'center',
            }, style]}
        >
            <Touch disable={disable} onPress={onPress} ripple={ripple}>
                <LinearGradient
                    colors={colors || ['transparent', 'transparent']}
                    style={[contentStyle, linearStyle]}
                >
                    {icon ? <Icon name={icon} size={sizeIcon || 15} color={iconColor || COLOR.WHITE} /> : null}
                    {title ? <Text style={textStyle}>{title}</Text> : <View />}
                </LinearGradient>
            </Touch>
        </View > :
            <View style={style}>
                <Touch onPress={onPress} ripple={ripple} >
                    <LinearGradient
                        colors={colors || ['#4c669f', '#3b5998', '#192f6a']}
                        style={linearStyle}
                    >
                        {icon && <Icon name={icon} size={sizeIcon || 15} color={iconColor} />}
                        {title ? <Text style={textStyle}>{title}</Text> : null}
                    </LinearGradient>
                </Touch>
            </View>
    );
const styles = {
    contentStyle: {
        justifyContent: 'center',
        alignItems: 'center',
    }
};
export { GradientButton };
