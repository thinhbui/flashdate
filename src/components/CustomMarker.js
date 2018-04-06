import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, Image } from 'react-native';
import { Marker } from 'react-native-maps';
import { Touch } from '../components';
import { COLOR } from '../ultils/constants/color';
// import anh from '../ultils';

const getIcon = (item) => {
    switch (item.action_id) {
        //talk
        case 1: {
            return {
                color: COLOR.BLUE_600,
                name: 'ios-chatbubbles'
            };
        }
        //eat
        case 2: {
            return {
                color: COLOR.CYAN_500,
                name: 'md-restaurant'
            };
        }
        //helf
        case 3: {
            return {
                color: COLOR.CYAN_500,
                name: 'md-help'

            };
        }
        //cafe
        case 4: {
            return {
                color: COLOR.BROWN_600,
                name: 'ios-cafe'
            };
        }
        default:
            break;
    }
};
const CustomMarker = ({ coordinate, imageStyle, item, onPress,onLoad }) => {
    console.log('CustomMaker', item);
    const action = getIcon(item);
    
    return (
        <Marker
            coordinate={coordinate}
        >
            <Touch onPress={() => console.log('press')}>
                <View style={styles.contentStyle}>

                    <Image
                        style={[styles.imageStyle, imageStyle]}
                        source={require('../ultils/images/anh.png')}
                        onError={(e) => console.log(e)}
                        onLoad={onLoad}
                    />

                    <View style={[styles.iconAction, { backgroundColor: action.color }]}>
                        <Icon
                            size={15}
                            name={action.name}
                            color={'white'}
                        />
                    </View>

                </View>
            </Touch>
        </Marker>
    );
};
const styles = {

    contentStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        borderColor: COLOR.WHITE,
        borderWidth: 1,
        shadowColor: 'black',
        shadowRadius: 2,
        shadowOffset: { width: 0.5, height: 3 },
        shadowOpacity: 0.5,
        elevation: 4
    },
    imageStyle: {
        borderRadius: 25,
        width: 50,
        height: 50,
        // zIndex: 1000
    },
    iconAction: {
        padding: 4,
        opacity: 0.7,
        position: 'absolute',
        right: 0,
        top: 0,
        borderRadius: 20,
    },
};
export { CustomMarker };
