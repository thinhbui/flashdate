import React, { PureComponent } from 'react';
import {
    View,
    Text,
    Dimensions,
    Animated,
    StyleSheet,
    Platform,
    Image
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { Touch } from '../components';


const { width, height } = Dimensions.get('window');

class DrawerMenu extends PureComponent {
    state = {
        animation: new Animated.Value(0)
    }
    componentDidMount() {
        Animated.timing(
            this.state.animation,
            {
                toValue: 1,
                duration: 500,
                useNativeDriver: Platform.OS !== 'ios',
            }).start();
    }
    onClose = () => {
        Animated.timing(
            this.state.animation,
            {
                toValue: 0,
                duration: 500,
                useNativeDriver: Platform.OS !== 'ios',
            }).start(() => this.props.drawer(false));
    }
    render() {
        const { animation } = this.state;
        const { avatar } = this.props;
        const translateX = animation.interpolate({
            inputRange: [0, 1],
            outputRange: [-width * 0.6, 0]
        });
        return (
            <Animated.View style={[{ transform: [{ translateX }] }, styles.container]}>
                <View style={styles.drawer}>
                    <Touch >
                        <Image
                            source={{ uri: avatar }}
                            style={{ width: width * 0.4, height: width * 0.4, borderRadius: width * 0.2 }}
                        />
                    </Touch>
                    <Text style={styles.text}>Portgas D Ace, 22</Text>
                    <Text style={{ color: '#000' }}>Petrolimex - Tập đoàn xăng dầu Việt Nam</Text>
                    <View style={{ height: 50 }} />
                    <Touch style={{ width: '100%' }} onPress={() => this.props.drawer(false)}>
                        <View style={styles.viewContainer} >
                            <Icon name='ios-cog' size={35} color={'#000'} style={{ margin: 10 }} />
                            <Text style={styles.text}>Thiết lập</Text>
                        </View>
                    </Touch>
                    <Touch style={{ width: '100%' }} onPress={() => this.props.drawer(false)}>
                        <View style={styles.viewContainer} >
                            <Icon name='ios-build' size={30} color={'#000'} style={{ margin: 10 }} />
                            <Text style={styles.text}>Sửa thông tin</Text>
                        </View>
                    </Touch>
                    <Touch style={{ width: '100%' }} onPress={() => this.props.drawer(false)}>
                        <View style={styles.viewContainer} >
                            <Icon name='md-log-out' size={30} color={'#000'} style={{ margin: 10 }} />
                            <Text style={styles.text}>Đăng xuất</Text>
                        </View>
                    </Touch>
                    <Touch style={{ width: '100%' }} onPress={this.onClose}>
                        <View style={styles.viewContainer} >
                            <Icon name='ios-redo' size={30} color={'#000'} style={{ margin: 10 }} />
                            <Text style={styles.text}>Trở về</Text>
                        </View>
                    </Touch>
                </View>
                <Touch style={{ flex: 1, backgroundColor: 'transparent' }} onPress={this.onClose} />
            </Animated.View >
        );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        position: 'absolute',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
        zIndex: 10,
        flexDirection: 'row'
    },
    viewContainer: { width: '100%', flexDirection: 'row', alignItems: 'center', marginLeft: 20 },
    text: { fontSize: 18, color: '#000' },
    drawer: {
        width: width * 0.8,
        height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    }
});
export { DrawerMenu };
