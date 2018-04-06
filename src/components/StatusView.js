import React, { PureComponent } from 'react';
import {
    View,
    Text,
    Dimensions,
    Image,
    StyleSheet,
    FlatList
} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
import { GraphRequest, GraphRequestManager, } from 'react-native-fbsdk';
// import Icon from 'react-native-vector-icons/dist/Ionicons';
// import { Touch } from '../components';
// import { COLOR } from '../ultils/constants/color';


const { width, height } = Dimensions.get('window');

class StatusView extends PureComponent {
    state = {
        listStatus: []
    }

    componentWillMount() {
        this.getStatus();
    }
    getStatus = () => {
        const { user } = this.props;
        // alert(user);
        const getStatus = new GraphRequest(
            `${user.fb_id}/?fields=posts`,
            null,
            (error, response) => {
                if (error) {
                    // alert(error.messages);
                    console.log(error);
                } else {
                    console.log('response', response);
                    const list = response.posts.data.filter((item) => item.story === undefined);
                    console.log('list', list);
                    this.setState({
                        listStatus: list
                    });
                }
            }
        );
        new GraphRequestManager().addRequest(getStatus).start();
    }
    parseDate = (dateString) => {
        let time = Date.parse(dateString);
        if (!time) {
            time = Date.parse(dateString.replace('T', ''));
            if (!time) {
                const bound = dateString.indexOf('T');
                const dateData = dateString.slice(0, bound).split('-');
                const timeData = dateString.slice(bound + 1, -1).split(':');
                time = Date.UTC(dateData[0], dateData[1] - 1, dateData[2], timeData[0], timeData[1], timeData[2]);
            }
        }
        return time;
    }

    renderItem = ({ item }) => {
        console.log(item.created_time);
        const { user } = this.props;
        const date = new Date(item.created_time);
        
        const interval = new Date().getTime() - date.getTime();
        let time = interval / 3600000;
        let unit = 'giờ';
        if (time > 24 * 30) time = '';
        else if (time > 24) {
            time /= 24;
            unit = 'ngày';
        } else if (time < 1) {
            time = (time * 60) < 1 ? 1 : time * 60;
            unit = 'phút';
        }

        return (
            <StatusItem
                name={user.name}
                avatar={user.avatar}
                status={item.message}
                createTime={time === '' ? `${date.getDate()}/${date.getMonth()}` : `${Math.round(time)} ${unit} trước`}
            />
        );
    }
    render() {
        const { listStatus } = this.state;
        return (
            <View style={{ width }}>
                <FlatList
                    style={styles.containner}
                    data={listStatus}
                    keyExtractor={(item, index) => index}
                    renderItem={this.renderItem}
                />
            </View>
        );
    }
}
const StatusItem = ({ name, status, avatar, createTime }) => {
    console.log(createTime);
    return (
        <View style={styles.frame} >
            <View style={styles.header}>
                <View style={{ marginBottom: 10 }}>
                    <Image style={styles.avatar} source={{ uri: avatar }} /></View>
                <View>
                    <Text style={{ marginLeft: 10, fontSize: 18, color: 'black' }}>{name}</Text>
                    <Text style={{ marginLeft: 10, fontSize: 14 }}>
                        {createTime}
                    </Text>
                </View>
            </View>
            <Text style={{ color: 'black', fontSize: 16, marginLeft: 10, paddingBottom: 10 }}>
                {status}
            </Text>
        </View>
    );
};


const styles = StyleSheet.create({
    containner: {
        marginBottom: 10,
        width,
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginTop: 10,
        minHeight: 135
    },
    header: { marginLeft: 20, flexDirection: 'row', alignItems: 'center' },
    frame: { paddingLeft: 10, paddingTop: 20, borderWidth: 1, borderColor: 'gray', width },
    avatar: { width: width * 0.12, height: width * 0.12, borderRadius: width * 0.06 }
});

export { StatusView };
