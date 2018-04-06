import React, { PureComponent } from 'react';
import {
    View,
    Dimensions,
    Image,
    FlatList,
    Text,
    StyleSheet,
    AsyncStorage,
} from 'react-native';
import { GraphRequest, GraphRequestManager, } from 'react-native-fbsdk';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { STRING } from '../ultils/resource/String';
import { Touch } from '../components';

// import { COLOR } from '../ultils/constants/color';

// import { styles } from './styles';

const { width: maxWidth } = Dimensions.get('window');

class ImageAlbums extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            listImage: [],
            page: 1,
            i: 0,
            education: [],
            hometown: [],
            work: [],
            relationship: '',
            object: {},
            load: false
        };
    }
    componentWillMount() {
        AsyncStorage.getItem(
            STRING.AsyncStorage_OBJECT_ID,
            (err, result) => {
                if (err) alert(`AsyncStorage ${err}`);
                else {
                    const objectId = JSON.parse(result);
                    console.log(STRING.AsyncStorage_OBJECT_ID, result);
                    if (objectId === null && !objectId) {
                        this.getUserImage();
                    } else {
                        AsyncStorage.getItem(
                            'infoUser',
                            (err1, result1) => {
                                if (err) alert(`AsyncStorage ${err1}`);
                                else {
                                    // console.log(STRING.AsyncStorage_LIST_IMAGE_OBJECT, result1);
                                    const response = JSON.parse(result1);
                                    if (response === null && !response) {
                                        this.getUserImage();
                                    } else {
                                        this.setState({
                                            education: response.education,
                                            hometown: response.hometown,
                                            work: response.work,
                                            relationship: response.relationship_status
                                        });
                                    }
                                }
                            });
                        AsyncStorage.getItem(
                            STRING.AsyncStorage_LIST_IMAGE_OBJECT,
                            (err1, result1) => {
                                if (err) alert(`AsyncStorage ${err1}`);
                                else {
                                    // console.log(STRING.AsyncStorage_LIST_IMAGE_OBJECT, result1);
                                    const listImage = JSON.parse(result1);
                                    if (listImage === null && !listImage) {
                                        this.getUserImage();
                                    } else {
                                        this.setState({ listImage, page: Math.floor(listImage.length / 8) });
                                    }
                                }
                            });
                    }
                }
            });
        this.getRelationShip();
    }
    componentDidMount() {
        const { user } = this.props;
        AsyncStorage.setItem(STRING.AsyncStorage_OBJECT_ID, JSON.stringify(user.user_id));
    }
    onPress(e, i) {
        const { listImage } = this.state;
        const { pageX, pageY, locationX, locationY } = e.nativeEvent;
        // console.log(e.nativeEvent);
        this.props.setView(listImage, i, pageX - locationX, pageY - locationY);
    }
    onScroll = (e) => {
        console.log(e);
    }
    getUserImage = () => {
        const { user } = this.props;
        const getProfileAlbums = new GraphRequest(
            `${user.fb_id}/?fields=albums,hometown,work,education,relationship_status`,
            null,
            (error, response) => {
                if (error) {
                    alert(error.messages);
                    console.log(error);
                } else {
                    console.log('response', response);
                    this.setState({
                        education: response.education,
                        hometown: response.hometown,
                        work: response.work,
                        relationship: response.relationship_status
                    });
                    AsyncStorage.setItem('infoUser', JSON.stringify({
                        education: response.education,
                        hometown: response.hometown,
                        work: response.work,
                        relationship: response.relationship_status
                    }));
                    const id = response.albums.data.filter(item => item.name === 'Profile Pictures');
                    this.id = id[0].id;
                    this.getImage();
                }
            }
        );
        new GraphRequestManager().addRequest(getProfileAlbums).start();
    }
    getImage = () => {
        // const { work, education, hometown, relationship } = this.state;
        const { page } = this.state;
        if (this.id) {
            const getImages = new GraphRequest(
                `${this.id}?fields=photos.limit(${page * 8}){picture,images}`,
                null,
                (error, response) => {
                    if (error) {
                        // alert(error.messages);
                        console.log(error);
                    } else {
                        this.setState({
                            listImage: response.photos.data,
                            page: page + 1
                        });
                        console.log('getImage', response.photos.data);
                        AsyncStorage.setItem(
                            STRING.AsyncStorage_LIST_IMAGE_OBJECT,
                            JSON.stringify(response.photos.data),
                            (err) => {
                                if (err) console.log(err);
                            }
                        );
                    }
                }
            );
            new GraphRequestManager().addRequest(getImages).start();
        }
    }
    getRelationShip = () => {
        let { relationship } = this.state;
        switch (relationship) {
            case ("It's complicated"):
                relationship = 'Có mối quan hệ phức tạp';
                break;
            case ('Single'):
                relationship = 'Độc thân';
                break;
            case ('In a relationship'):
                relationship = 'Hẹn hò';
                break;
            case ('Engaged'):
                relationship = 'Đã đính hôn';
                break;
            case ('Married'):
                relationship = 'Đã kết hôn';
                break;
            default:
                relationship = '';
        }
        this.setState({ relationship });
    }
    renderItem = ({ item, index }) => {
        const { listImage, } = this.state;
        if (index % 2 === 0) {
            if (index === listImage.length - 1) {
                return (
                    <Touch onPress={(e) => this.onPress(e, index)} >
                        <Image source={{ uri: item.picture }} style={styles.itemImage} />
                    </Touch >
                );
            }
            return (
                <View style={{ justifyContent: 'space-around' }}>
                    <Touch onPress={(e) => this.onPress(e, index)} >
                        <Image source={{ uri: item.picture }} style={styles.itemImage} />
                    </Touch >
                    <Touch onPress={(e) => this.onPress(e, index + 1)} >
                        <Image source={{ uri: listImage[index + 1].picture }} style={styles.itemImage} />
                    </Touch >
                </View>
            );
        }
    }
    render() {
        const { work, education, hometown, listImage, relationship } = this.state;
        console.log(this.state.page);
        return (
            <View style={{ flex: 1 }}>
                <View style={{ width: maxWidth, backgroundColor: '#fff' }}>
                    {
                        (work !== undefined && work !== [] && work[0] !== undefined) &&
                        < View style={{ flexDirection: 'row' }}>
                            <View style={styles.infoIcon}><Icon size={25} name='ios-briefcase-outline' style={{ margin: 5 }} /></View>
                            <Text style={styles.infoText}>Làm việc tại <Text style={{ fontWeight: '500' }}>{work[0].location.name}</Text></Text>
                        </View>
                    }
                    {
                        (education !== undefined && education !== [] && education[0] !== undefined) &&
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.infoIcon}><Icon size={25} name='ios-school-outline' style={{ margin: 5 }} /></View>
                            <Text style={styles.infoText}>Đã học tại <Text style={{ fontWeight: '500' }}>{education[education.length - 1].school.name}</Text></Text>
                        </View>}
                    {/* <View style={{ flexDirection: 'row' }}>
                        <View style={styles.infoIcon}><Icon size={25} name='ios-home-outline' style={{ margin: 5 }} /></View>
                        <Text style={styles.infoText}>Sống tại <Text style={{ fontWeight: '500' }}>Hà Nội</Text></Text>
                    </View> */}
                    {(relationship !== '' && relationship !== undefined) &&
                        < View style={{ flexDirection: 'row' }}>
                            <View style={styles.infoIcon}><Icon size={25} name='ios-heart-outline' style={{ margin: 5 }} /></View>
                            <Text style={[styles.infoText, { fontWeight: '500' }]}>{relationship}</Text>
                        </View>}
                    {
                        (hometown !== undefined && hometown !== {}) &&
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.infoIcon}><Icon size={25} name='ios-pin-outline' style={{ margin: 5 }} /></View>
                            <Text style={styles.infoText}>Đến từ <Text style={{ fontWeight: '500' }}>{hometown.name}</Text></Text>
                        </View>
                    }
                </View>
                <FlatList
                    style={{ height: maxWidth * 0.7 }}
                    data={listImage}
                    horizontal
                    keyExtractor={(item, index) => index}
                    renderItem={this.renderItem}
                    onEndReached={this.getImage}
                    onEndReachedThreshold={0.1}
                    getItemLayout={(data, index) => ({ length: maxWidth * 0.24, offset: maxWidth * 0.24 * index, index })}
                    ref='flatlist'
                />
            </View >
        );
    }
}
const styles = StyleSheet.create({
    infoIcon: { width: 50, justifyContent: 'center', alignItems: 'center' },
    infoText: { fontSize: 18, color: 'black', marginTop: 5 },
    itemImage: { width: maxWidth * 0.24, height: maxWidth * 0.24 }
});
export { ImageAlbums };
