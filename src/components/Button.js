import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Text, View } from 'react-native';
import { Touch } from '../components';
import { COLOR } from '../ultils/constants/color';


const Button = ({ disable, loading, map, title, style, icon, sizeIcon, textStyle,
    contentStyle, iconColor, onPress, }) => (
        map ? <View style={[styles.contentStyle, { opacity: loading ? 0 : 1 }, style]}>
            <Touch disable={disable} onPress={onPress} >
                <View style={[styles.contentStyle, contentStyle]}>
                    {icon ? <Icon name={icon} size={sizeIcon || 15} color={iconColor || COLOR.WHITE} /> : null}
                    {title ? <Text style={textStyle}>{title}</Text> : null}
                </View>
            </Touch>
        </View > :
            <Touch disable={disable} style={style} onPress={onPress} >
                <View style={[styles.contentStyle, { opacity: loading ? 0 : 1 }, contentStyle]}>
                    {icon ? <Icon name={icon} size={sizeIcon || 15} color={iconColor || COLOR.WHITE} /> : null}
                    {title ? <Text style={textStyle}>{title}</Text> : null}
                </View>
            </Touch>
    );
const styles = {
    contentStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        // width: '100%',
        // height: '100%'
    }
};
export { Button };
