import React, { PureComponent } from 'react';
import {
    View,
    Platform,
    Dimensions,
    ScrollView,
    Image,
    Text,
    AppRegistry,
    TextInput,
    UIManager,
    LayoutAnimation,
    BackHandler
} from 'react-native';
// import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import { NavigationActions } from 'react-navigation';
// import { STRING } from '../../ultils/constants/string';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { Touch } from '../../../components';
// import { styles } from './styles';
import { COLOR } from '../../../ultils/constants/color';

const { width, height } = Dimensions.get('window');

class Message extends PureComponent {
    constructor(props) {
        super(props);
        this.listImage = [
            'https://dantricdn.com/2017/jun-vu2-1500994154515.png',
            'https://i.pinimg.com/originals/29/40/18/2940184ebeaa4cbf48e4c1caa2849563.jpg',
            'https://img.saostar.vn/w600/2017/05/22/1299475/vu-phuong-anh-hot-girl-7-e1495535221827.jpg',
            'https://kenh14cdn.com/2015/10-1450864493140.jpg',
        ];
        this.state = {
            text: '',
            isFocus: false
        };
    }
    componentDidMount() {
        BackHandler.addEventListener('backMessage', this.backHandler);
    }
    componentWillUpdate() {
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    }
    backHandler = () => {
        this.props.navigation.dispatch(NavigationActions.back());
        return true;
    }
    // onScroll = (e) => {
    //     const { contentOffset, layoutMeasurement } = e.nativeEvent;
    //     tis.setState({ currentImage: Math.round(contentOffset.x / layoutMeasurement.width) });
    //     console.log(this.state.currentImage);
    // }
    goDetail = () => {
        const goDetail = NavigationActions.navigate({
            routeName: 'MessageDetail',
            params: {},
            action: {}
        });
        this.props.navigation.dispatch(goDetail);
    }
    componentWillUnMount() {
        BackHandler.removeEventListener('backMessage', this.backHandler);
    }
    // hideDetail = () => false;
    render() {
        const { text, isFocus } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                    <View style={{ width: width * 0.1, height: width * 0.1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            source={{ uri: 'https://pbs.twimg.com/media/CyIXHo5UcAAa2F8.jpg' }}
                            style={{ width: width * 0.08, borderRadius: width * 0.04, height: width * 0.08 }}
                        />
                    </View>
                    <View style={{ flex: 1, marginRight: 5 }} >
                        {
                            isFocus ?
                                <View style={{ flexDirection: 'row', height: 40, borderRadius: 5, width: '100%' }}>
                                    <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#e5e5e5', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                                        <View style={{ width: 30, justifyContent: 'center', alignItems: 'center', }}><Icon name='ios-search' size={20} /></View>
                                        <TextInput
                                            autoFocus
                                            placeholder='Tìm kiếm'
                                            underlineColorAndroid='transparent'
                                            style={{ backgroundColor: '#e5e5e5', borderRadius: 5, flex: 1 }}
                                            placeholderStyle={{ alignSelf: 'center', }}
                                            onChangeText={(value) => this.setState({ text: value })}
                                            value={text}
                                        />
                                    </View>

                                    <Touch onPress={() => this.setState({ isFocus: false })} style={{ marginLeft: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
                                        <Text style={{ color: '#0084FF' }}>Hủy</Text>
                                    </Touch>
                                </View>
                                :
                                <Touch onPress={() => this.setState({ isFocus: true })}>
                                    <View style={{ height: 40, flexDirection: 'row', backgroundColor: '#e5e5e5', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                                        <Icon name='ios-search' size={20} />
                                        <Text>Tìm kiếm</Text>
                                    </View>
                                </Touch>
                        }
                    </View>
                    {/* <View style={{ width: width * 0.1, height: width * 0.1, justifyContent: 'center', alignItems: 'center' }}></View> */}
                </View>
                <ScrollView style={{ flex: 1 }}>

                    {isFocus ? <View /> :
                        <Touch onPress={this.goDetail}>
                            <View style={{ width, flexDirection: 'row', justifyContent: 'center' }}>
                                <View style={{ width: width * 0.2, height: width * 0.2, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image
                                        source={{ uri: 'https://kenh14cdn.com/2015/10-1450864493140.jpg' }}
                                        style={{ width: width * 0.16, height: width * 0.16, borderRadius: width * 0.08 }}
                                    />
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', paddingLeft: width * 0.01 }}>
                                    <Text style={{ fontSize: 16, color: '#000' }}>Jun Vũ</Text>
                                    <Text style={{}}>Jun Vũ: Vâng ạ!!</Text>
                                </View>
                                <View style={{ width: width * 0.2, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text>11:30</Text>
                                </View>
                            </View>
                        </Touch>
                    }

                </ScrollView>
            </View>
        );
    }
}

export default Message;

AppRegistry.registerComponent('flashday', () => Message);
