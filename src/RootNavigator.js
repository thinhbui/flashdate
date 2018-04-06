import { StackNavigator } from 'react-navigation';
// import { Animated } from 'react-native';
import Splash from './screens/Splash/Splash';
import Map from './screens/Main/Map/Map';
import Home from './screens/Main/Home/Home';
import Message from './screens/Main/Message/Message';
import MessageDetail from './screens/Main/MessageDetail/MessageDetail';
import UserDetail from './screens/Main/UserDetail/UserDetail';
import CreateStatus from './screens/Main/CreateStatus/CreateStatus';

const MainNavigator = StackNavigator({
    Home: { screen: Home },    
    Map: { screen: Map },
    Message: { screen: Message },
    MessageDetail: { screen: MessageDetail },
    UserDetail: { screen: UserDetail },
    CreateStatus: { screen: CreateStatus }
},
    {
        headerMode: 'none',
    }
);

const RootNavigator = StackNavigator({
    Splash: { screen: Splash },
    Main: {
        screen: MainNavigator,
        path: 'main/:userMain'
    }
},
    {
        headerMode: 'none',
    }
);
export default RootNavigator;
