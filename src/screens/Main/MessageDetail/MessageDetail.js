import React, { PureComponent } from 'react';
import {
    View,
    Dimensions,
    FlatList,
    Image,
    Text,
    AppRegistry,
    TextInput,
    BackHandler
} from 'react-native';
import { NavigationActions } from 'react-navigation';
// import { TabNavigator } from 'react-navigation';
// import { STRING } from '../../ultils/constants/string';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { Touch, Header } from '../../../components';

// import { styles } from './styles';

const { width } = Dimensions.get('window');

class MessageDetail extends PureComponent {
    state = {
        text: '',
        messages: [
            { id: 2, text: 'ahihi' },
            { id: 2, text: 'ahihi' },
            { id: 2, text: 'ahihi' }, { id: 2, text: 'ahihi' },
            { id: 2, text: 'ahihi' }, { id: 2, text: 'ahihi' },
            { id: 2, text: 'ahihi' }, { id: 2, text: 'ahihi' },
            { id: 2, text: 'ahihi' }, { id: 2, text: 'ahihi' },
            { id: 2, text: 'ahihi' }, { id: 2, text: 'ahihi' },
            { id: 2, text: 'ahihi' }, { id: 2, text: 'ahihi' },
            { id: 2, text: 'ahihi' }, { id: 2, text: 'ahihi' },
            { id: 2, text: 'ahihi' }, { id: 2, text: 'ahihi' },

        ]
    }
    componentDidMount() {
        BackHandler.addEventListener('backMessage', this.backHandler);
        this.refs.flatlist.scrollToEnd();
    }
    componentDidUpdate() {
        this.refs.flatlist.scrollToEnd();
        // FlatList.scrollToIndex
    }
    onSend = () => {
        const { text, messages } = this.state;
        messages.push({ id: 1, text });
        this.setState({ text: '', messages: [...messages] });
    }

    getItemLayout = (data, index) => (
        { length: 150, offset: index, index }
    );
    backHandler = () => {
        this.props.navigation.dispatch(NavigationActions.back());
        return true;
    }
    componentWillUnMount() {
        BackHandler.removeEventListener('backMessage', this.backHandler);
    }

    renderItem = ({ item }) => (
        <View style={{ width, flexDirection: 'row', alignItems: 'center', margin: 5, justifyContent: item.id === 1 ? 'flex-end' : 'flex-start' }}>
            {
                item.id !== 1 &&
                < View style={{ width: width * 0.15, justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        style={{ width: width * 0.1, height: width * 0.1, borderRadius: width * 0.05 }}
                        source={{ uri: 'https://kenh14cdn.com/2015/10-1450864493140.jpg' }}
                    />
                </View>
            }
            <View style={{ alignSelf: 'center', backgroundColor: item.id === 1 ? 'rgb(252,98,77)' : '#e0e0d1', borderRadius: 10 }}>
                <Text style={{ color: item.id === 1 ? '#fff' : '#000', margin: 10, fontSize: 18 }}>
                    {item.text}
                </Text>
            </View >
            {
                item.id === 1 &&
                < View style={{ width: width * 0.15, justifyContent: 'center', alignItems: 'center', marginLeft: 5 }}>
                    <Image
                        style={{ width: width * 0.1, height: width * 0.1, borderRadius: width * 0.05 }}
                        source={{ uri: 'https://pbs.twimg.com/media/CyIXHo5UcAAa2F8.jpg' }}
                    />
                </View>
            }
        </View >
    )


    render() {
        const { text, messages } = this.state;
        console.log(messages);
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <Header
                    title='Jun Vũ'
                />
                <View style={{ flex: 1 }}>

                    <FlatList
                        data={messages}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index}
                        getItemLayout={this.getItemLayout}
                        ref='flatlist'
                    />

                </View>

                <View style={{ flexDirection: 'row', width }}>
                    <TextInput
                        placeholder='Aa'
                        underlineColorAndroid='transparent'
                        style={{ borderRadius: 22, flex: 1, borderWidth: 1, borderBottomColor: 'rgb(252,98,77)' }}
                        placeholderStyle={{ alignSelf: 'center', }}
                        onChangeText={(value) => this.setState({ text: value })}
                        value={text}
                        multiline
                    />
                    <Touch style={{ justifyContent: 'center', alignItems: 'center', width: width * 0.1 }} onPress={this.onSend}>
                        <Icon name='ios-paper-plane' size={35} color='rgb(252,98,77)' />
                    </Touch>
                </View>
            </View>
        );
    }
}

export default MessageDetail;

AppRegistry.registerComponent('flashday', () => MessageDetail);
