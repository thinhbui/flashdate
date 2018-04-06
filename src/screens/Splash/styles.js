import { StyleSheet, Dimensions, Platform } from 'react-native';
import { COLOR } from '../../ultils/constants/color';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    constainer: {
        flex: 1,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    flashdate: {
        fontSize: 60,
        color: COLOR.WHITE,
        padding: 2,
        fontFamily: Platform.OS === 'ios' ? 'Shelley Allegro Script' : 'Flashdate',
    },
    slogan: {
        fontSize: 16,
        color: 'white',
        fontFamily: Platform.OS === 'ios' ? 'Marck Script' : 'MarckScript-Regular',
    },
    buttonFacebook: {
        marginBottom: 40,
        alignSelf: 'center',
        backgroundColor: COLOR.BUTTON_FACEBOOK,
        flexDirection: 'row',
        width: width * 0.8,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textButton: {
        color: COLOR.WHITE,
        fontSize: 18,
        marginLeft: 10,
        fontFamily: Platform.OS === 'ios' ? 'Modern Antiqua' : 'ModernAntiqua-Regular',
    }
});
