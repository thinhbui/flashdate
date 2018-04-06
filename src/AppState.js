import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import RootNavigator from './RootNavigator';

class AppNavigatorState extends Component {
    render() {
        console.log('nav', this.props.nav);
        return (
            <RootNavigator
                navigation={addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.nav
                })}
            />
        );
    }
}

export default connect(state => ({
    nav: state.navReducer
}))(AppNavigatorState);
