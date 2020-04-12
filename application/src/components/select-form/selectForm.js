import React, { Component } from 'react';

class Form extends Component {
  constructor(props) {
    super(props);
    console.log('ballsppe');
    console.log(this.props.value);
    console.log(props.value);
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

  render() {
    console.log(this.props.value);
    return (
      <form>
        <label>Select Menu Item: </label>
        <div>
          <select
            value={this.state.order_item}
            onChange={(event) => this.menuItemChosen(event)}
          >
            <option value='' defaultValue disabled hidden>
              {this.state.order_item !== null
                ? this.state.order_item
                : 'Lunch Specials'}
            </option>
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
            onChange={(event) => this.menuQuantityChosen(event)}
          >
            <option value='' defaultValue disabled hidden>
              {this.state.quantity !== null ? this.state.quantity : '1'}
            </option>
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
export default Form;
