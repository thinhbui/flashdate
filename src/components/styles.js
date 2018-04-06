import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    infoIcon: { width: 50, justifyContent: 'center', alignItems: 'center' },
    infoText: { fontSize: 18, color: 'black', marginTop: 5 },
    name: {
        backgroundColor: 'transparent',
        position: 'absolute',
        fontSize: 20,
        color: '#FFF',
        fontWeight: 'bold',
        marginLeft: 15
    },
    swipeContainer: {
        backgroundColor: 'transparent',
        borderColor: 'gray',
        marginBottom: 0,
        borderRadius: 20,
        width: '96%',
        height: '94%',
        elevation: 2,
        position: 'absolute',
        marginTop: width * 0.01
    },
    layoutStatus: { elevation: 5, position: 'absolute', width: '100%', bottom: 0, opacity: 0.5 },
    imageBackground: { width: '100%', height: '100%', backgroundColor: 'white' }
});
