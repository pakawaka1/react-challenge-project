import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Main, Login, OrderForm, ViewOrders} from '../components';

//// set props to check state for auth token ////
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const AppRouter = (props) => {
  let routes = (
    <Router>
      <Route path="/" exact component={Main} />
      <Route path="/login" exact component={Login} />
      <Redirect to='/login'></Redirect>
    </Router>
  );
  if (props.isAuthenticated) {
    routes = (
      <Router>
        <Route path="/order" exact component={OrderForm} />
        <Route path="/view-orders" exact component={ViewOrders} /> 
      </Router>
    )
  };
  return routes
}

export default connect(mapStateToProps, null)(AppRouter);
