import React, { Component } from 'react';
import {
    View,
    Text,
    Dimensions,
    ImageBackground,
    Animated,
    PanResponder,
    TouchableWithoutFeedback,
    ScrollView,
    Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// import Icon from 'react-native-vector-icons/dist/Ionicons';
import { Touch } from '../components';
// import { COLOR } from '../ultils/constants/color';
import { styles } from './styles';

const { width, height } = Dimensions.get('window');


class SwipeCard extends Component {
    state = {
        pan: new Animated.ValueXY(),
        remove: false,
        perspective: new Animated.Value(0),
        heightStatus: 0,
        index: 0,
        limit: false,
    }
    componentWillMount() {
        this.animatedValueX = 0;
        this.animatedValueY = 0;
        this.state.pan.x.addListener((value) => { this.animatedValueX = value.value; });
        this.state.pan.y.addListener((value) => { this.animatedValueY = value.value; });
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponderCapture: (evt, gestureState) => gestureState.dx !== 0 && gestureState.dy !== 0,
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => gestureState.dx !== 0 && gestureState.dy !== 0,
            onPanResponderTerminationRequest: () => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => gestureState.dx !== 0 && gestureState.dy !== 0,
            onMoveShouldSetResponderCapture: () => true,
            onPanResponderGrant: () => {
                this.state.pan.setOffset({ x: this.animatedValueX, y: this.animatedValueY });
                this.state.pan.setValue({ x: 0, y: 0 });
            },
            onPanResponderMove: Animated.event([
                null, {
                    dx: this.state.pan.x,
                    dy: this.state.pan.y,
                },

            ]),
            onPanResponderRelease: () => {
                const x = this.state.pan.x._value;
                const y = this.state.pan.y._value;

                if (x > 200 || y > 200 || x < -200 || y < -200) {
                    this.setState({ remove: true });
                }

                this.state.pan.flattenOffset();
                Animated.spring(this.state.pan, {
                    toValue: 0,
                    useNativeDriver: true
                }).start();
            }
        });
    }

    componentWillUpdate() {
        this.state.perspective.setValue(0);
    }
    componentDidUpdate() {
        this.state.perspective.flattenOffset();
        if (this.state.limit) {
            Animated.timing(
                this.state.perspective,
                {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true
                }).start();
        }
    }

    componentWillUnmount() {
        this.state.pan.x.removeAllListeners();
        this.state.pan.y.removeAllListeners();
    }
    onScroll = (e) => {
        const { contentOffset, layoutMeasurement } = e.nativeEvent;
        this.setState({ index: Math.round(contentOffset.x / layoutMeasurement.width) });
    }
    onTapImage(e) {
        const { locationX } = e.nativeEvent;
        const { list, detail } = this.props;
        let { index } = this.state;
        if (locationX < 150 && index > 0) {
            index--;
            this.setState({ limit: false });
        } else if (locationX > 250 && index < list.length - 1) {
            index++;
            this.setState({ limit: false });
        } else {
            this.setState({ limit: true });
        }
        this.setState({ index });
        if (detail !== undefined) {
            console.log('scrollTo', index);
            this.refs.scrollView.scrollTo({ x: index, animated: true });
        }
    }
    render() {
        const { style, name, age, status, detail, list } = this.props;
        const { pan, remove, heightStatus, perspective, index } = this.state;
        // const arr = [];

        // for (let i = 0; i < numberImage; i++) arr.push(i);
        const rotate = pan.x.interpolate({
            inputRange: [-200, 0, 200],
            outputRange: ['-30deg', '0deg', '30deg']
        });
        const rotateY = perspective.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: index === 0 ? ['0deg', '-20deg', '0deg'] : ['0deg', '20deg', '0deg']
        });
        const styleAnimation = {
            transform: [
                { translateX: remove ? 500 : pan.x },
                { translateY: remove ? 500 : pan.y },
                { rotate },
                { rotateY }
            ]
        };
        return (
            <Animated.View
                {...this.panResponder.panHandlers}
                style={[
                    detail !== undefined ? {} : styleAnimation,
                    style,
                    detail === undefined ? styles.swipeContainer : { width, height: width, borderRadius: 20 }
                ]}
            >
                {
                    detail === undefined ?
                        <TouchableWithoutFeedback
                            onPress={(e) => this.onTapImage(e)}
                            style={{ width: '100%', height: '100%' }}
                        >
                            <ImageBackground source={{ uri: list[index] }} style={styles.imageBackground} >
                                <View>
                                    <LinearGradient
                                        colors={['#1e1e1e', '#424242', 'transparent']}
                                        style={{ height: 50, width: '100%', justifyContent: 'flex-start', opacity: 0.2 }}
                                    />
                                    <Text style={styles.name}>{name},{age}</Text>
                                </View>
                            </ImageBackground>
                        </TouchableWithoutFeedback>
                        :
                        <ScrollView
                            style={{ flex: 1 }}
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            onScroll={(e) => this.onScroll(e)}
                            ref='scrollView'
                        >
                            {
                                list.map((item, i) =>
                                    <View key={i} style={{ flex: 1 }}>
                                        <TouchableWithoutFeedback onPress={(e) => this.onTapImage(e)} style={{ flex: 1, backgroundColor: 'black' }}>
                                            <Image source={{ uri: item }} style={{ width, height: width }} />
                                        </TouchableWithoutFeedback>
                                    </View>
                                )
                            }
                        </ScrollView>
                }

                {
                    detail === undefined && <LinearGradient
                        colors={['transparent', '#434343', '#383838', '#000000']}
                        style={[styles.layoutStatus, { height: heightStatus }]}
                    />
                }
                <View onLayout={(e) => this.setState({ heightStatus: Math.ceil(e.nativeEvent.layout.height + 50) })} style={{ position: 'absolute', elevation: 6, bottom: 20, zIndex: 6 }}>
                    <Touch onPress={() => this.props.showDetail(true)} >
                        <Text style={{ fontSize: 20, color: '#FFF', fontWeight: 'bold', marginLeft: 15 }}>
                            {status}
                        </Text>
                    </Touch>
                </View>
                <View style={{ bottom: 0, height: 3, width: '100%', position: 'absolute', elevation: 5, flexDirection: 'row', zIndex: 5 }}>
                    <View
                        style={{
                            backgroundColor: '#fff',
                            height: 3,
                            borderRadius: 10,
                            width: `${100 / list.length}%`,
                            marginLeft: `${(100 * index) / list.length}%`
                        }}
                    />
                </View>
            </Animated.View >
        );
    }
}

export { SwipeCard };

