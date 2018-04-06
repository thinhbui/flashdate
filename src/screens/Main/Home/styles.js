import { StyleSheet, Dimensions } from 'react-native';
import { COLOR } from '../../../ultils/constants/color';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    constainer: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    button_layout: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: height * 0.05,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    name: { fontSize: 20, margin: 10, fontWeight: 'bold', color: 'black', marginBottom: 0 },
    icon: {
        // backgroundColor: 'green',
        width: width * 0.1,
        height: width * 0.1,
        borderRadius: width * 0.05,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
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
    dotView: { top: width - 5, height: 3, width: '100%', position: 'absolute', flexDirection: 'row' },
    dot: { backgroundColor: '#fff', height: 3, borderRadius: 10 },
    infoIcon: { width: 50, justifyContent: 'center', alignItems: 'center' },
    infoText: { fontSize: 18, color: 'black', marginTop: 5 },
    changeView: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },

});
