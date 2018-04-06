/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { PureComponent } from 'react';
import {
    View, Dimensions,
} from 'react-native';

import { connect } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';
import { NavigationActions } from 'react-navigation';

import { ActionLoadMoreStatusAround, ActionGetAllStatusAround } from '../../../actions';
import { styles } from './styles';
import { COLOR } from '../../../ultils/constants/color';
import { STRING } from '../../../ultils/constants/string';
import { GradientButton, DrawerMenu } from '../../../components';

const { width: sWidth, height: sHeight } = Dimensions.get('window');
class Map extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            status: [],
            //fix view when change orientation
            topButtonStatus: (sWidth < sHeight) ? sWidth * 0.2 : sHeight * 0.1,
            heightButtonStatus: (sWidth < sHeight) ? sWidth * 0.11 : sHeight * 0.11,
            widthButtonStatus: (sWidth < sHeight) ? sWidth * 0.9 : sHeight * 0.9,
            leftButtonChangeView: (sWidth * 0.5) - 30,
            region: {
                latitude: 21.0278,
                longitude: 105.834,
                latitudeDelta: 0.04,
                longitudeDelta: 0.04,
            },
            drawerMenu: false,
        };
    }
    componentWillMount() {
        console.log('componentWillMount', this.props.navigation.state.params.userMain);
    }
    componentDidMount() {
        // console.log('componentDidMount');
        // get location before render screens
        this.getGeoLocation();
        const region = {
            latitude: 57.0954,
            longitude: -2.252504,
            latitudeDelta: 0.04,
            longitudeDelta: 0.04,
        };

        this.setState({
            region,
        });
        const { userMain } = this.props.navigation.state.params;
        const user = {
            userId: userMain.user_id,
            fbId: userMain.fb_id,
            tokenId: userMain.token_id
        };
        // alert(user.fbId);
        const status = this.props.getAllStatus(user, region, 5);
        console.log(status);
        this.setState({ status });
        //region demo
        // const regionDemo = {
        //     latitude: 57.0954,
        //     longitude: -2.252504,
        // };
        // if (this.state.status === null || this.state.status === undefined) {

        // }
    }

    componentWillReceiveProps(newProps) {
        // console.log('componentWillReceiveProps', newProps);
        if (newProps.StatusReducer === undefined) {
            alert(STRING.NONE_STATUS);
        } else if (newProps.StatusReducer === null || newProps.StatusReducer.length === 0) {
            alert(STRING.NONE_STATUS);
        } else {
            console.log('newProps.StatusReducer', newProps.StatusReducer);
            this.setState({ status: newProps.StatusReducer });
        }
    }
    /**
     * change style when orientation change
     */
    onLayout = () => {
        console.log('onLayout');
        const { width, height } = Dimensions.get('window');
        if (width < height) {
            this.setState({
                topButtonStatus: width * 0.2,
                heightButtonStatus: width * 0.11,
                widthButtonStatus: width * 0.9,
                leftButtonChangeView: (width * 0.5) - 30
            });
        } else {
            this.setState({
                topButtonStatus: height * 0.1,
                heightButtonStatus: height * 0.11,
                widthButtonStatus: height * 0.9,
                leftButtonChangeView: (width * 0.5) - 30
            });
        }
    }
    /**
     * navigate to userdetail when press marker
     */
    onPressMarker(item) {
        const { userMain } = this.props.navigation.state.params;
        this.props.navigation.dispatch(NavigationActions.navigate({
            routeName: 'UserDetail',
            params: { userMain, user: item }
        }));
    }
    /**
     * upadte position when region change
     */
    onRegionChange = (region) => {
        this.setState({ region });
        // console.log('onRegionChange', region);
    }
    /**
     * get user location
     */
    getGeoLocation = (press) => {
        console.log('getGeoLocation start');
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log('position', position);
                if (position) {
                    const region = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.02,
                        longitudeDelta: 0.02,
                    };
                    // const region = {
                    //     latitude: 21.0278,
                    //     longitude: 105.834,
                    //     latitudeDelta: 0.04,
                    //     longitudeDelta: 0.04,
                    // };
                    if (press) {
                        this.refs.Map.animateToRegion(region, 600);
                    } else {
                        this.setState({
                            region,
                        });
                        const { userMain } = this.props.navigation.state.params;
                        const user = {
                            userId: userMain.user_id,
                            fbId: userMain.fb_id,
                            tokenId: userMain.token_id
                        };
                    }
                }
            },
            (error) => { },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    }

    /**
     * change type of screen
     */
    changeToFlash = () => {
        const { userMain } = this.props.navigation.state.params;
        alert(userMain.fb_id);
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Home', params: { userMain } })
            ],

        });
        this.props.navigation.dispatch(resetAction);
    }
    makeStatus = () => {
        const { userMain } = this.props.navigation.state.params;
        console.log('makeStatus');
        const navigateAction = NavigationActions.navigate({
            routeName: 'CreateStatus',
            params: { userMain },
        });
        this.props.navigation.dispatch(navigateAction);
    }
    render() {
        const { userMain } = this.props.navigation.state.params;
        const { drawerMenu, region, status, topButtonStatus, heightButtonStatus, widthButtonStatus, leftButtonChangeView } = this.state;
        console.log('render', status);
        return (
            <View
                style={styles.constainer}
                onLayout={this.onLayout.bind(this)}
            >
                {drawerMenu && <DrawerMenu avatar={userMain.avatar} drawer={() => this.setState({ drawerMenu: false })} />}
                <MapView
                    ref='Map'
                    showsUserLocation
                    region={region}
                    onRegionChange={this.onRegionChange.bind(this)}
                    style={styles.mapContainer}
                    onLayout={() => this.getGeoLocation()}
                    showsCompass={false}
                >
                    {
                        status ? status.map((item, index) => {
                            // console.log('map item', item);
                            const coordinate = {
                                latitude: item.latitude,
                                longitude: item.longitude
                            };
                            return (
                                // <CustomMarker
                                //     key={index}
                                //     coordinate={coordinate}
                                //     item={item}
                                //     onPress={this.onPressMarker}
                                //     onLoad={() => this.forceUpdate()}
                                // />
                                <Marker key={index} coordinate={coordinate} onPress={() => this.onPressMarker(item)} />
                                // </Marker>
                            );
                        }) : null
                    }
                </MapView>
                <GradientButton
                    map
                    iconColor={COLOR.GREY_500}
                    style={styles.locateButton}
                    icon='ios-locate-outline'
                    sizeIcon={25}
                    onPress={this.getGeoLocation.bind(this, true)}
                />
                <GradientButton
                    map
                    style={[styles.changeView, {
                        left: leftButtonChangeView
                    }]}
                    colors={COLOR.HEADER}
                    icon='ios-swap-outline'
                    iconColor={COLOR.WHITE}
                    linearStyle={[styles.icon, {
                        width: sWidth * 0.12,
                        height: sWidth * 0.12,
                        borderRadius: sWidth * 0.06
                    }]}
                    sizeIcon={30}
                    onPress={this.changeToFlash.bind(this)}
                />
                <GradientButton
                    map
                    iconColor={COLOR.GREY_500}
                    style={styles.menuButton}
                    icon='ios-menu'
                    iconColor='black'
                    sizeIcon={35}
                    onPress={() => this.setState({ drawerMenu: true })}
                />
                <GradientButton
                    map
                    iconColor={COLOR.GREY_500}
                    style={styles.messageButton}
                    icon='ios-notifications-outline'
                    iconColor='black'
                    sizeIcon={35}
                />
                <View
                    style={[styles.containerMakeStatusButton, {
                        top: topButtonStatus,
                    }]}
                >
                    <GradientButton
                        map
                        style={[styles.buttonMakeStatus, {
                            height: heightButtonStatus,
                            width: widthButtonStatus
                        }]}
                        title={STRING.ASK_MAKE_STATUS}
                        textStyle={styles.textMakeStatus}
                        sizeIcon={35}
                        onPress={this.makeStatus}
                    />
                </View>

            </View>
        );
    }
}
const mapStateToProps = (state) => ({
    StatusReducer: state.StatusReducer
});
export default connect(mapStateToProps, {
    getAllStatus: ActionGetAllStatusAround,
    loadmoreStatus: ActionLoadMoreStatusAround
})(Map);
