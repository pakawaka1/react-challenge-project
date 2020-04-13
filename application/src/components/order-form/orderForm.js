import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Template } from '../../components';
import { connect } from 'react-redux';
import { createOrder } from '../../redux/actions/orderActions';
import './orderForm.css';
import SelectForm from '../../components/select-form/selectForm';

class OrderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order_item: '',
      quantity: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    if (this.state.order_item === '') return;
    const order = {
      order_item: this.state.order_item,
      quantity: this.state.quantity,
    };
    this.props.createOrder(order);
  }

  render() {
    return (
      <Template>
        <div className='form-wrapper'>
          <label className='form-label'>I'd like to order...</label>
          <SelectForm>
            <select value={this.state.order_item} onChange={this.onChange} />
            <select value={this.state.quantity} onChange={this.onChange} />
          </SelectForm>
          <button type='button' className='order-btn' onClick={this.onSubmit}>
            Order It!
          </button>
        </div>
      </Template>
    );
  }
}

// const mapStateToProps = (state) => ({
//   : state.order.item,
// });

const mapStateToProps = (state) => ({
  auth: state.auth,
});

OrderForm.propTypes = {
  createOrder: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, { createOrder })(OrderForm);
