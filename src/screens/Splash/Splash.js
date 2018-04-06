import React, { PureComponent } from 'react';
import {
    AsyncStorage,
    View,
    ImageBackground,
    StatusBar,
    Animated,
    Platform,
    Alert
} from 'react-native';
import { NavigationActions } from 'react-navigation';
// import PushNotification from 'react-native-push-notification';
import { AccessToken, GraphRequest, GraphRequestManager, LoginManager } from 'react-native-fbsdk';
import { Button } from '../../components';
import { STRING } from '../../ultils/constants/string';
// import api from '../../ultils/constants/api';
import { COLOR } from '../../ultils/constants/color';
import { styles } from './styles';

// const { width } = Dimensions.get('window');
class Splash extends PureComponent {
    constructor(props) {
        super(props);
        this.arr = ['Fla', 's', 'h', 'D', 'a', 't', 'e'];
        this.permissions = [
            'public_profile',
            'email',
            'user_photos',
            'user_birthday',
            'instagram_basic',
            'user_education_history',
            'user_hometown',
            'user_work_history',
            'user_relationships',
            'user_posts'
        ];
        //khoi tao arrAnimated cho Flashdate
        this.state = {
            slogan: new Animated.Value(0),
            animations: [],
            user: {},
            loading: true
        };
    }

    componentWillMount() {
        const arrAnimated = [];
        for (let i = 0; i < this.arr.length; i++) {
            arrAnimated.push(new Animated.Value(0));
        }
        this.setState({ animations: [...arrAnimated] });
        const { user } = this.state;
        //check login status
        AsyncStorage.getItem(STRING.AsyncStorage_USER, (err, result) => {
            if (err) alert(`AsyncStorage ${err}`);
            else {
                const userAsync = JSON.parse(result);
                console.log('AsyncStorage_USER', userAsync);
                if (userAsync === null) {
                    this.setState({ loading: false });
                } else if (!userAsync.fb_id) {
                    this.setState({ loading: false });
                } else {
                    // this.setState({ user: userAsync });
                    // console.log('user AsyncStorage', userAsync);
                    this.setState({ user: userAsync });
                    // console.log('user state ', this.state.user);
                }
            }
            this.startAnimation(this.state.user);
        });
    }
    componentDidMount() {
        if (!this.state.loading) {
            this.startAnimation(this.state.user);
        }
    }

    /**
     * when user press login button
     */
    onLogin = () => {
        const { user } = this.state;

        LoginManager.logInWithReadPermissions([...this.permissions]).then(
            (result) => {
                if (result.isCancelled) {
                    alert(STRING.LOGIN_CANCELLED);
                } else {
                    AccessToken.getCurrentAccessToken()
                        .then((response) => {
                            this.setState({ loading: true });
                            user.token_id = response.accessToken;
                            this.setState({ user });
                            this.getUserInfomation();
                        })
                        .catch((error) => alert(`${STRING.LOGIN_FAIL} ${error}`)
                        );
                }
            },
            (error) => {
                console.log(error);
            }
        );
    }
    /**
     * get all user infor from fb and instagram
     */
    getUserInfomation = () => {
        const { user } = this.state;
        const infoInstagram = new GraphRequest(
            '/me/accounts',
            null,
            (error, response) => {
                if (error) {
                    console.log('infoInstagram', error);
                } else if (response === null || response.data.length === 0) {
                    this.login();
                } else {
                    console.log('infoInstagram', response);
                    const instaId = new GraphRequest(
                        `/${response.data[0].id}?fields=instagram_accounts`,
                        null,
                        (error1, response1) => {
                            if (response) {
                                user.instagram_id = response1.instagram_accounts.data[0].id;
                                console.log('user infor', user);
                                this.setState({ user });
                                this.login();
                                this.storageUser();
                            }
                        }
                    );
                    new GraphRequestManager().addRequest(instaId).start();
                }
            }
        );
        const infoRequest = new GraphRequest(
            '/me?fields=id,name,age_range,cover,birthday,picture,gender',
            null,
            (error, response) => {
                if (response) {
                    console.log('infoRequest', response);
                    // alert(response.id);
                    user.fb_id = response.id;
                    user.name = response.name;
                    user.birth_day = new Date(response.birthday).getTime();
                    user.age = response.age_range.min;
                    user.cover_photo = response.cover.source;
                    user.avatar = response.picture.data.url;
                    user.gender = response.render;
                    user.platform = Platform.OS === 'ios' ? 1 : 0;
                    new GraphRequestManager().addRequest(infoInstagram).start();
                }
            }
        );
        new GraphRequestManager().addRequest(infoRequest).start();
    }
    /**
     * reset to MainNavigator
     * @param user 
     */
    resetToMain = (user) => {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                //the userMain who is loging in app
                NavigationActions.navigate({ routeName: 'Main', params: { userMain: user } })
            ],

        });
        this.props.navigation.dispatch(resetAction);
    }
    /**
     * save user information into AsyncStorage
     */
    storageUser = () => {
        const { user } = this.state;
        // alert(user.fb_id);
        AsyncStorage.setItem(STRING.AsyncStorage_USER, JSON.stringify(user), (err) => {
            if (err) {
                // console.log('storageUser', err);
                return Alert.alert(
                    'Login problem',
                    'Can\'t save user information on this phone',
                    [
                        { text: 'Cancel', style: 'cancel' },
                        { text: 'Retry', onPress: () => this.storageUser(), style: 'cancel' },
                    ]
                );
            }
            this.resetToMain(user);
        });
    }
    /**
     * push user data to database
     */
    login = () => {
        // console.log('start login');
        const { user } = this.state;
        this.storageUser();
        // fetch(api.API_LOGIN,
        //     {
        //         method: 'POST',
        //         headers: {
        //             fb_id: user.fb_id,
        //             token_id: user.token_id,
        //         },
        //         body: JSON.stringify(user)
        //     })
        //     .then((response) => {
        //         console.log('response', response);
        //         return response.json();
        //     })
        //     .then(res => {
        //         // console.log('res', res);
        //         if (res.results.user_id !== undefined && res.results.user_id !== null) {
        //             // console.log('user_id', res.results.user_id);
        //             user.user_id = res.results.user_id;
        //             //save user information in Asyncestorage
        //             this.storageUser();
        //         }
        //     })
        //     .catch((error) => console.log('login error', error));
    }
    componentWillUnMount() {
    }
    startAnimation = (user) => {
        const animations = this.arr.map((item, i) =>
            Animated.timing(
                this.state.animations[i],
                {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: Platform.OS !== 'ios',
                },
            )
        );
        Animated.parallel([
            Animated.timing(
                this.state.slogan,
                {
                    toValue: 1,
                    duration: 1500,
                    useNativeDriver: Platform.OS !== 'ios',
                },
            ),
            Animated.stagger(
                50,
                [...animations]
            )
        ]).start(() => {
            // const { user } = this.state;
            // console.log('start', user);
            if ((user !== undefined) && (user !== null) && (user !== {}) && (user.fb_id)) {
                // console.log('animation', user);
                this.resetToMain(user);
            }
        });
    }
    render() {
        const { slogan, animations, user, loading } = this.state;
        const opacity = slogan.interpolate({
            inputRange: [0, 0.2, 1],
            outputRange: [0, 0.1, 1]
        });
        const translateYSlogan = slogan.interpolate({
            inputRange: [0, 0.4, 1],
            outputRange: [200, 100, 0]
        });
        return (
            <ImageBackground source={require('../../ultils/images/bg.png')} style={styles.constainer} >
                <StatusBar
                    translucent
                    backgroundColor="transparent"
                    barStyle="light-content"
                />
                <View style={styles.centerContainer}>
                    <View style={{ flexDirection: 'row' }}>
                        {
                            this.arr.map((value, index) => (
                                <Animated.Text key={index} style={[styles.flashdate, { opacity: animations[index] }]}>{value}</Animated.Text>
                            ))
                        }
                    </View>
                    <Animated.Text
                        style={[styles.slogan, {
                            opacity,
                            transform: [
                                { translateY: translateYSlogan }
                            ],
                        }]}
                    >
                        {STRING.SLOGAN}
                    </Animated.Text>
                </View>

                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <Button
                        loading={loading}
                        disable={!!user.user_id}
                        title={STRING.LOGIN_BY_FACEBOOK}
                        icon='logo-facebook'
                        iconColor={COLOR.WHITE}
                        sizeIcon={30}
                        onPress={this.onLogin}
                        textStyle={styles.textButton}
                        contentStyle={styles.buttonFacebook}
                    />
                </View>
            </ImageBackground>
        );
    }
}

export default Splash;
