import React, { PureComponent } from 'react';
import {
    View,
    Dimensions,
    Platform,
    LayoutAnimation,
    UIManager,
} from 'react-native';
import { NavigationActions, } from 'react-navigation';
import {
    SwipeCard,
    GradientButton,
    DrawerMenu,
    Header
} from '../../../components';
import { styles } from './styles';
import { COLOR } from '../../../ultils/constants/color';


const { width, height } = Dimensions.get('window');


class Home extends PureComponent {
    state = {
        showDetail: false,
        leftButtonChangeView: (width * 0.5) - 30,
        tab: 1,
        drawerMenu: false,
    }
    componentDidMount() {
    }
    componentWillUpdate() {
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    }
    /**
     * when press on image
     */
    listImage = [
        'https://img.saostar.vn/w600/2017/05/22/1299475/vu-phuong-anh-hot-girl-7-e1495535221827.jpg',
        'https://dantricdn.com/2017/jun-vu2-1500994154515.png',
        'https://i.pinimg.com/originals/29/40/18/2940184ebeaa4cbf48e4c1caa2849563.jpg',
        'https://kenh14cdn.com/2015/10-1450864493140.jpg',
    ];
    /**
    * change type of screen
    */
    changeToMap = () => {
        const { userMain } = this.props.navigation.state.params;
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Map', params: { userMain } })
            ],

        });
        this.props.navigation.dispatch(resetAction);
    }
    gotoUserDetail = () => {
        // const {} = this.state;
        const { userMain } = this.props.navigation.state.params;
        const navigateToUserDetail = NavigationActions.navigate({
            routeName: 'UserDetail',
            params: { userMain },
            action: {}
        });
        this.props.navigation.dispatch(navigateToUserDetail);
    }
    /**
     * 
     */
    navigateToMessage = () => {
        const navigateToMessage = NavigationActions.navigate({
            routeName: 'Message',
            params: {},
            action: {}
        });
        this.props.navigation.dispatch(navigateToMessage);
    }
    render() {
        const { listImage } = this;
        const { drawerMenu } = this.state;
        const { userMain } = this.props.navigation.state.params;

        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <Header
                        onLeftIconPress={() => this.setState({ drawerMenu: true })}
                        leftIcon='ios-menu'
                        title='FlashDate'
                        rightIcon='ios-notifications-outline'
                    />
                    <View style={{ flex: 1, alignItems: 'center' }} >
                        <SwipeCard
                            style={{ elevation: 2 }}
                            name='Ngọc Trinh'
                            list={listImage}
                            age={18}
                            showDetail={this.gotoUserDetail}
                            status='ing from route name to a route config, which tells the navigator what to present for that route, see example from StackNavigator'
                        />
                        <SwipeCard
                            style={{ elevation: 2 }}
                            list={listImage}
                            name='Jun Vũ'
                            age={18}
                            status='The route configs object is a mapping from route name to a route config, which tells the navigator what to present for that route, see example from StackNavigator'
                            showDetail={this.gotoUserDetail}
                        />
                        <SwipeCard
                            style={{ elevation: 2 }}
                            name='Ngọc Trinh'
                            list={listImage}
                            age={18}
                            status='Muốn bùng cháy !!!  Ahihi'
                            showDetail={this.gotoUserDetail}
                        />
                        <SwipeCard
                            style={{ elevation: 2 }}
                            list={listImage}
                            name='Jun Vũ'
                            age={18}
                            status='to present for that route, see example from StackNavigator'
                            showDetail={this.gotoUserDetail}
                        />
                    </View>
                    <View style={styles.button_layout}>
                        <GradientButton
                            linearStyle={styles.icon}
                            colors={['#6e81a0', '#5b6b84', '#49566b']}
                            icon='ios-refresh'
                            sizeIcon={20}
                            colors={COLOR.BUTTON_REQUEST}
                            iconColor={COLOR.WHITE}
                        />
                        <GradientButton
                            linearStyle={styles.icon}
                            colors={COLOR.BUTTON_REQUEST}
                            icon='md-chatbubbles'
                            sizeIcon={20}
                            iconColor={COLOR.WHITE}
                            ripple={COLOR.BLUE_600}
                            onPress={this.navigateToMessage}
                        />
                        <GradientButton
                            map
                            style={[styles.changeView]}
                            icon='ios-swap-outline'
                            iconColor={COLOR.WHITE}
                            contentStyle={[styles.icon, {
                                width: width * 0.12,
                                height: width * 0.12,
                                borderRadius: width * 0.06
                            }]}
                            colors={COLOR.HEADER}
                            sizeIcon={30}
                            onPress={this.changeToMap.bind(this)}
                        />
                        <GradientButton
                            linearStyle={styles.icon}
                            colors={COLOR.BUTTON_INVITE}
                            icon='md-restaurant'
                            sizeIcon={20}
                            iconColor={COLOR.WHITE}
                        />
                        <GradientButton
                            linearStyle={styles.icon}
                            colors={['#af8d6d', '#7f6750', '#5e4b3a']}
                            icon='ios-add'
                            sizeIcon={20}
                            colors={COLOR.BUTTON_ADD}
                            iconColor={COLOR.WHITE}
                        />
                    </View>
                    {drawerMenu && <DrawerMenu avatar={userMain.avatar} drawer={() => this.setState({ drawerMenu: false })} />}

                </View>

            </View >
        );
    }
}

export default Home;
