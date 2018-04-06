import React, { PureComponent } from 'react';
import {
    View,
    Animated,
    Platform,
    Dimensions,
    ScrollView,
    Image,
    Text,
    FlatList,
    UIManager,
    LayoutAnimation,
    BackHandler
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/dist/Ionicons';

import { Touch, ImageAlbums, StatusView, GradientButton, SwipeCard } from '../../../components';
import { styles } from './styles';
import api from '../../../ultils/constants/api';
import { COLOR } from '../../../ultils/constants/color';


const { width, height } = Dimensions.get('window');

class UserDetail extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            animated: new Animated.Value(0),
            currentImage: 0,
            tab: 1,
            view: false,
            x: 0,
            y: 0,
            list: [],
        };
        this.listImage = [];
    }
    componentWillMount() {
        // const { userMain } = this.props.navigation.state.params;
        // this.getUserImage();
    }
    componentDidMount() {
        BackHandler.addEventListener('back', this.back);
    }
    componentWillUpdate() {
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    }

    componentDidUpdate() {
        const { view, animated } = this.state;
        if (view) {
            Animated.timing(
                animated,
                {
                    toValue: 1,
                    duration: 500,
                }).start();
        }
        if (view) {
            BackHandler.removeEventListener('back', this.back);
            BackHandler.addEventListener('close', this.closeImageDetail);
        } else {
            BackHandler.removeEventListener('back', this.closeImageDetail);
            BackHandler.addEventListener('close', this.back);
        }
    }

    back = () => {
        this.props.navigation.dispatch(NavigationActions.back());
        return true;
    }
    makeRequest(actionId) {
        const { user, userMain } = this.props.navigation.state.params;
        fetch(
            api.API_LOGIN,
            {
                method: 'POST',
                headers: {
                    fb_id: userMain.fb_id,
                    token_id: userMain.token_id,
                },
                body: JSON.stringify({
                    from_id: userMain.user_id,
                    to_id: user.user_id,
                    action_id: actionId
                })
            })
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }
    closeImageDetail = () => {
        const { animated } = this.state;
        Animated.timing(
            animated,
            {
                toValue: 0,
                duration: 500
            }).start(() => this.setState({ view: false }));
    }
    componentWillUnMount() {
        BackHandler.removeEventListener('back', this.back);
        BackHandler.removeEventListener('close', this.closeImageDetail);
    }
    renderItem = ({ item }) => (
        <View style={styles.itemImage}>
            <Image source={{ uri: item.images[0].source }} style={{ width, height: width }} />
        </View>
    );
    render() {
        const { tab, currentImage, list, animated, x, y, view } = this.state;
        const { userMain } = this.props.navigation.state.params;
        console.log('view', view);
        const animatedImage = {
            width: animated.interpolate({
                inputRange: [0, 1],
                outputRange: [width * 0.24, width]
            }),
            height: animated.interpolate({
                inputRange: [0, 1],
                outputRange: [width * 0.24, width]
            }),
            top: animated.interpolate({
                inputRange: [0, 1],
                outputRange: [y, (height - width) / 2]
            }),
            left: animated.interpolate({
                inputRange: [0, 1],
                outputRange: [x, 0]
            }),
            opacity: animated.interpolate({
                inputRange: [0, 0.99, 1],
                outputRange: [1, 1, 0]
            }),
        };
        return (
            <View style={{ flex: 1 }}>
                {
                    view &&
                    <View style={{ width, height, backgroundColor: 'transparent', position: 'absolute', elevation: 5, zIndex: 5 }}>
                        <View style={styles.closeButton}>
                            <Touch onPress={this.closeImageDetail}>
                                <Icon name='md-close' size={30} />
                            </Touch>
                        </View>
                        <Animated.Image
                            source={{ uri: list[currentImage].images[0].source, }}
                            style={animatedImage}
                        />
                        <Animated.View
                            style={{
                                position: 'absolute',
                                width,
                                height,
                                opacity: animated.interpolate({
                                    inputRange: [0, 0.99, 1],
                                    outputRange: [0, 0, 1]
                                })
                            }}
                        >
                            <FlatList
                                style={{ width, height, }}
                                data={list}
                                initialScrollIndex={currentImage}
                                horizontal
                                pagingEnabled
                                keyExtractor={(item, index) => index}
                                renderItem={this.renderItem}
                                getItemLayout={(data, index) =>
                                    ({ length: width, offset: width * index, index })
                                }
                            />
                        </Animated.View>
                    </View>
                }
                <View style={{ flex: 1 }} >
                    <View style={styles.closeButton}>
                        <Touch onPress={this.back}>
                            <Icon name='md-close' size={30} />
                        </Touch>
                    </View>
                    <ScrollView style={{ flex: 1 }}>
                        <SwipeCard
                            detail
                            list={[userMain.avatar]}
                            onPress={this.onPress}
                        />
                        <View style={{ backgroundColor: '#fff' }}>
                            <Text style={styles.name}>{userMain.name}, {userMain.age}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', width, backgroundColor: '#fff', height: 50 }}>
                            <View style={styles.container}>
                                <Text style={{ fontSize: 16, color: tab === 1 ? '#000' : 'gray' }} onPress={() => this.setState({ tab: 1 })}>Trạng thái</Text>
                            </View>
                            <View style={styles.container}>
                                <Text style={{ fontSize: 16, color: tab === 2 ? '#000' : 'gray' }} onPress={() => this.setState({ tab: 2 })}>Thông tin</Text>
                            </View>
                        </View>
                        {
                            tab === 1 ?
                                <StatusView user={userMain} />
                                :
                                <ImageAlbums
                                    user={userMain}
                                    setView={(listImage, image, locationX, locationY) =>
                                        this.setState({
                                            list: listImage,
                                            view: true,
                                            currentImage: image,
                                            x: locationX,
                                            y: locationY
                                        })}
                                />
                        }
                    </ScrollView >
                    <GradientButton
                        style={[styles.gradientButton, { left: width * 0.3 }]}
                        linearStyle={styles.icon}
                        colors={COLOR.BUTTON_REQUEST}
                        icon='md-chatbubbles'
                        sizeIcon={30}
                        iconColor={COLOR.WHITE}
                        ripple={COLOR.BLUE_600}
                        onPress={() => this.makeRequest(1)}
                        ripple='rgb(252,98,77)'
                    />
                    <GradientButton
                        style={[styles.gradientButton, { right: width * 0.3 }]}
                        linearStyle={styles.icon}
                        colors={COLOR.BUTTON_INVITE}
                        icon='md-restaurant'
                        sizeIcon={30}
                        iconColor={COLOR.WHITE}
                        onPress={() => this.makeRequest(2)}
                        ripple='rgb(252,98,77)'
                    />
                </View>
            </View >
        );
    }
}
export default UserDetail;
