import React, { PureComponent } from 'react';
import {
    View,
    Text,
    TextInput,
    Dimensions
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/dist/Ionicons';

import { Touch, Button } from '../../../components';
import { STRING } from '../../../ultils/resource/String';
import { COLOR } from '../../../ultils/constants/color';
import api from '../../../ultils/constants/api';

// import styles from './styles';

const { width, height } = Dimensions.get('window');

class CreateStatus extends PureComponent {
    state = {
        text: '',
        actionId: 1,
        emotionalId: 1
    }
    back = () => {
        this.props.navigation.dispatch(NavigationActions.back());
    }
    post = () => {
        const { userMain } = this.props.navigation.state.params;
        const { text, actionId, emotionalId } = this.state;
        fetch(api.createStatus, {
            method: 'POST',
            headers: {
                fb_id: userMain.fb_id,
                token_id: userMain.token_id,
            },
            // body: JSON.stringify({
            //     latitude: userMain.latitude,
            //     longitude: userMain.longitude,
            //     description: text,
            //     user_id: userMain.user_id,
            //     action_id: actionId,
            //     emotional_id: emotionalId,
            //     make_from: 1,
            // })
        })
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <View style={{ height: height * 0.1, width, flexDirection: 'row', alignItems: 'center', borderBottomColor: 'gray', borderBottomWidth: 1, backgroundColor: '#fff' }}>
                    <Button style={{ margin: 5 }} onPress={this.back} title='Hủy' textStyle={{ color: COLOR.BLUE_600 }} />

                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                        <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 18 }}>{STRING.UPDATE_STATUS}</Text>
                    </View>
                    <Button style={{ margin: 5 }} onPress={this.post} title='Đăng' textStyle={{ color: COLOR.BLUE_600 }} />

                </View>
                <TextInput
                    style={{ height: height * 0.2, width, backgroundColor: '#fff' }}
                    multiline
                    //  autoFocus
                    placeholder={STRING.PLACEHOLDER_MAKE_STATUS}
                    onChangeText={(text) => this.setState({ text })}
                />
                <View style={{ flexDirection: 'row', width, height: 50, borderBottomColor: 'gray', borderWidth: 1, backgroundColor: '#fff' }}>
                    <Touch style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                        <Icon name='ios-happy-outline' color='green' size={30} />
                        <Text style={{ marginLeft: 5, color: '#000' }}>{STRING.EMOTION}</Text>
                    </Touch>
                    <Touch style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }} >
                        <Icon name='ios-help-circle-outline' color='green' size={30} />
                        <Text style={{ marginLeft: 5, color: '#000' }}>{STRING.ASK_NEED}</Text>
                    </Touch>
                </View>
            </View >
        );
    }
}
export default CreateStatus;
