import { StyleSheet, Dimensions } from 'react-native';

import { COLOR } from '../../../ultils/constants/color';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    constainer: {
        flex: 1,
        backgroundColor: 'transparent',
        position: 'relative'
    },
    mapContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
        elevation: 0,
        // zIndex: -1
    },
    locateButton: {
        position: 'absolute',
        bottom: 30,
        right: 15,
        zIndex: 10,
        padding: 4,
        borderRadius: 25,
        width: 50,
        height: 50,
        backgroundColor: COLOR.WHITE,
        elevation: 4,
        shadowColor: COLOR.GREY_500,
        shadowRadius: 2,
        shadowOpacity: 0.7,
        shadowOffset: { width: 0, height: 0.5 }
    },
    changeView: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 30,
        bottom: height * 0.05,
        shadowColor: 'black',
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.7,
        // elevation: 4
    },
    menuButton: {
        display: 'flex',
        // width: width * 0.15,
        // height: width * 0.15,
        overflow: 'hidden',
        backgroundColor: 'transparent',
        position: 'absolute',
        top: width * 0.05,
        left: width * 0.05,
        shadowColor: 'black',
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.7,
        elevation: 4
    },
    messageButton: {
        display: 'flex',
        // width: width * 0.15,
        // height: width * 0.15,
        overflow: 'hidden',
        backgroundColor: 'transparent',
        position: 'absolute',
        top: width * 0.05,
        right: width * 0.05,
    },
    icon: {
        backgroundColor: 'green',
        width: width * 0.1,
        height: width * 0.1,
        borderRadius: width * 0.05,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerMakeStatusButton: {
        width: '100%',
        position: 'absolute',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonMakeStatus: {
        backgroundColor: 'white',
        borderRadius: 6,
        width: width * 0.9,
        //marginHorizontal: width * 0.05,
        shadowColor: 'black',
        shadowRadius: 2,
        shadowOffset: { width: 0.5, height: 3 },
        shadowOpacity: 0.4,
        elevation: 4,
        alignItems: 'flex-start',
        paddingLeft: 24,
    },
    textMakeStatus: {
        fontSize: 16,
        fontWeight: '400',
        color: COLOR.GREY_500,
    },
    zoomIn: {
        position: 'absolute',
        bottom: 90,
        right: 20,
        zIndex: 10,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLOR.WHITE,
        elevation: 4,
        shadowColor: COLOR.GREY_500,
        shadowRadius: 20,
        shadowOpacity: 0.8,
        shadowOffset: { width: 0, height: 0.2 }
    },
    zoomOut: {
        position: 'absolute',
        bottom: 140,
        right: 20,
        zIndex: 10,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLOR.WHITE,
        elevation: 4,
        shadowColor: COLOR.GREY_500,
        shadowRadius: 20,
        shadowOpacity: 0.8,
        shadowOffset: { width: 0, height: 0.2 }
    },
    zoomText: {
        fontSize: 24,
        color: COLOR.GREY_500
    }
});
