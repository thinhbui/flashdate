import { StyleSheet, Dimensions, Platform } from 'react-native';
import { COLOR } from '../../../ultils/constants/color';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center'
    },
    closeButton: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: COLOR.WHITE,
        top: 5,
        right: 5,
        width: 30,
        height: 30,
        borderRadius: 15,
        zIndex: 2
    },
    name: { fontSize: 20, margin: 10, fontWeight: 'bold', color: 'black' },
    icon: {
        width: width * 0.12,
        height: width * 0.12,
        borderRadius: width * 0.06,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemImage: {
        width,
        height,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center'
    },
    gradientButton: {
        position: 'absolute',
        top: height * 0.85,
        elevation: 4,
        zIndex: 4
    },
    dotView: { top: width - 5, height: 3, width: '100%', position: 'absolute', flexDirection: 'row' },
    dot: { backgroundColor: '#fff', height: 3, borderRadius: 10 },
    infoIcon: { width: 50, justifyContent: 'center', alignItems: 'center' },
    infoText: { fontSize: 18, color: 'black', marginTop: 5 },
    changeView: {
        width: 60,
        height: 60,
        borderRadius: 30,
        shadowColor: 'black',
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.7,
    },
    controlBar: {
        flexDirection: 'row',
        width,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        position: 'absolute',
        bottom: height * 0.05,
        elevation: 1,
        zIndex: 1
    },
});
