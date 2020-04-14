import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateOrder } from '../../redux/actions/orderActions';

class SelectForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order_item: '',
      quantity: '',
    };
  }

  async onChangeOrder(key, val) {
    await this.setState({ [key]: val });
    if (this.state.order_item !== '' && this.state.quantity !== '') {
      return this.props.updateOrder(this.state.order_item, this.state.quantity);
    }
  }

  render() {
    const renderOrderItem = () => {
      if (this.state.order_item === '') {
        return (
          <option value='' defaultValue disabled hidden>
            Lunch Menu
          </option>
        );
      }
    };

    const renderOrderQuantity = () => {
      if (this.state.quantity === '') {
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
            onChange={(e) => this.onChangeOrder('order_item', e.target.value)}
          >
            {renderOrderItem()}
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
            onChange={(e) => this.onChangeOrder('quantity', e.target.value)}
          >
            {renderOrderQuantity()}
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

export default connect(null, { updateOrder })(SelectForm);
