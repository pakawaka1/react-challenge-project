import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateOrderForm } from '../../redux/actions/orderActions';

class SelectForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order_item: '',
      quantity: '',
    };
  }

  onChange(key, val) {
    this.setState({ [key]: val });
    this.props.updateOrder(this.state.order_item, this.state.quantity);
  }

  render() {
    const renderOrderItem = () => {
      console.log(this.state.order_item);
      if (this.state.order_item !== '') {
        return (
          <option value='' defaultValue>
            {this.state.order_item}
          </option>
        );
      } else {
        return (
          <option value='' defaultValue disabled hidden>
            Lunch Menu
          </option>
        );
      }
    };

    const renderOrderQuantity = () => {
      console.log(this.state.quantity);
      if (this.state.quantity !== '') {
        return (
          <option value='' defaultValue>
            {this.state.quantity}
          </option>
        );
      } else {
        return (
          <option value='' defaultValue disabled hidden>
            Quantity
          </option>
        );
      }
    };

    return (
      <form>
        <label>Select Menu Item: </label>
        <div>
          <select
            value={this.state.order_item}
            onChange={(e) => this.onChange('order_item', e.target.value)}
          >
            {renderOrderItem()}
            {/* <option value='' defaultValue disabled>
              {this.state.order_item !== '' ? this.state.order_item : ''}
            </option> */}
            <option value='Soup of the Day'>Soup of the Day</option>
            <option value='Linguini With White Wine Sauce'>
              Linguini With White Wine Sauce
            </option>
            <option value='Eggplant and Mushroom Panini'>
              Eggplant and Mushroom Panini
            </option>
            <option value='Chili Con Carne'>Chili Con Carne</option>
          </select>
        </div>
        <label>Quantity: </label>
        <div>
          <select
            value={this.state.quantity}
            onChange={(e) => this.onChange('quantity', e.target.value)}
          >
            {renderOrderQuantity()}
            {/* <option value='' defaultValue>
              {this.state.quantity !== '' ? this.state.quantity : '1'}
            </option> */}
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
            <option value='6'>6</option>
          </select>
        </div>
      </form>
    );
  }
}

const mapActionsToProps = (dispatch) => ({
  updateOrder(order_item, quantity) {
    dispatch(updateOrderForm(order_item, quantity));
  },
});

export default connect(null, mapActionsToProps)(SelectForm);
