import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Template } from '../../components';
import { connect } from 'react-redux';
import { createOrder, clearOrder } from '../../redux/actions/orderActions';
import './orderForm.css';
import SelectForm from '../../components/select-form/selectForm';

class OrderForm extends Component {
  componentDidMount() {
    this.props.clearOrder();
  }

  submitOrder(event) {
    event.preventDefault();
    const order = {
      order_item: this.props.order_item,
      quantity: this.props.quantity,
      ordered_by: this.props.ordered_by,
    };
    this.props.createOrder(order);
  }

  render() {
    return (
      <Template>
        <div className='form-wrapper'>
          <label className='form-label'>I'd like to order...</label>
          <SelectForm>
            <select value={this.props.order_item} />
            <select value={this.props.quantity} />
          </SelectForm>
          <button
            type='button'
            className='order-btn'
            onClick={(event) => this.submitOrder(event)}
          >
            Order It!
          </button>
        </div>
      </Template>
    );
  }
}

const mapStateToProps = (state) => ({
  order_item: state.order.item.order_item,
  quantity: state.order.item.quantity,
  ordered_by: state.auth.email,
});

export default connect(mapStateToProps, { createOrder, clearOrder })(OrderForm);
