import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  setNewOrder,
  updateExistingOrder,
} from '../../redux/actions/orderActions';
import './selectForm.css';
class SelectForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      order_item: '',
      quantity: '',
      ordered_by: '',
    };
  }

  // to add a new Order or update existing order

  async onChangeOrder(key, val) {
    await this.setState({ [key]: val });
    const order = {
      id: this.state.id === '' ? this.props.id : this.state.id,
      order_item:
        this.state.order_item === ''
          ? this.props.order_item
          : this.state.order_item,
      quantity:
        this.state.quantity === '' ? this.props.quantity : this.state.quantity,
      ordered_by:
        this.state.ordered_by === ''
          ? this.props.ordered_by
          : this.state.ordered_by,
    };
    if (order.id === '' && order.order_item !== '' && order.quantity !== '') {
      return this.props.setNewOrder(order.order_item, order.quantity);
    } else {
      return this.props.updateExistingOrder(order);
    }
  }

  render() {
    const renderOrderItem = () => {
      if (this.props.id === '') {
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
            className='menu-select'
            value={
              this.state.order_item === ''
                ? this.props.order_item
                : this.state.order_item
            }
            onChange={(event) =>
              this.onChangeOrder('order_item', event.target.value)
            }
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
            className='menu-select'
            value={
              this.state.quantity === ''
                ? this.props.quantity
                : this.state.quantity
            }
            onChange={(event) =>
              this.onChangeOrder('quantity', event.target.value)
            }
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

const mapStateToProps = (state) => ({
  id: state.order.item.id,
  order_item: state.order.item.order_item,
  quantity: state.order.item.quantity,
  ordered_by: state.auth.email,
});

export default connect(mapStateToProps, {
  setNewOrder,
  updateExistingOrder,
})(SelectForm);
