import React, { Component } from 'react';
import { Template } from '../../components';
import { connect } from 'react-redux';
import { SERVER_IP } from '../../private';
import './orderForm.css';
import SelectForm from '../../components/select-form/selectForm';
const ADD_ORDER_URL = `${SERVER_IP}/api/add-order`;
const mapStateToProps = (state) => ({
  auth: state.auth,
});

class OrderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order_item: '',
      quantity: '',
    };
  }

  menuItemChosen(event) {
    this.setState({ order_item: event.target.value });
  }

  menuQuantityChosen(event) {
    this.setState({ quantity: event.target.value });
  }

  submitOrder(event) {
    event.preventDefault();
    if (this.state.order_item === '') return;
    fetch(ADD_ORDER_URL, {
      method: 'POST',
      body: JSON.stringify({
        order_item: this.state.order_item,
        quantity: this.state.quantity,
        ordered_by: this.props.auth.email || 'Unknown!',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => console.log('Success', JSON.stringify(res)))
      .catch((error) => console.error(error));
  }

  render() {
    return (
      <Template>
        <div className='form-wrapper'>
          <label className='form-label'>I'd like to order...</label>
          <br />
          <SelectForm>
            <select value={this.state.order_item} />
            <select value={this.state.quantity} />
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

export default connect(mapStateToProps, null)(OrderForm);
