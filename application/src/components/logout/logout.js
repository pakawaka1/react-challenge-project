import React, { Component } from 'react';
import * as actions from '../../redux/actions/authActions';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Logout extends Component {
    componentDidMount () {
        this.props.onLogout();
    }
    render () {
        return <Redirect to='/' />
    }
}
////  Calling lougoutUser() from ../../redux/actions/authActions' to clear user token, then redirecting route from '/logout' back to '../main' ////

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logoutUser())
    }
}

export default connect(null, mapDispatchToProps)(Logout);