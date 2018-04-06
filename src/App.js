import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import React, { Component } from 'react';

import store from './store';
import AppState from './AppState';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <AppState />
            </Provider>
        );
    }
}

export default App;
AppRegistry.registerComponent('flashday', () => App);
