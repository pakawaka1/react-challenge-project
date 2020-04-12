import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { createOrder, editOrder } from '../actions/postActions';

class SelectForm extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      order_item: '',
      quantity: '',
    };
  }
  //   this.onChange = this.onChange.bind(this);
  //   this.onSubmit = this.onSubmit.bind(this);
  // }

  // onChange(e) {
  //   this.setState({ [e.target.name]: e.target.value });
  // }

  // onSubmit(e) {
  //   e.preventDefault();
  //   const order = {
  //     order_item: this.state.order_item,
  //     quantity: this.state.quantity,
  //   };
  //   this.props.createrOrder(order);
  //   this.props.editOrder(order);
  // }

  render() {
    return (
      <form>
        <label>Select Menu Item: </label>
        <div>
          <select value={this.state.order_item}>
            <option value='' defaultValue disabled hidden>
              {this.state.order_item !== null
                ? this.state.order_item
                : 'Lunch Menu'}
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
          <select value={this.state.quantity}>
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

// PostForm.propTypes = {
//   createPost: PropTypes.func.isRequired,
//   editOrder: PropTypes.func.isRequired,
// };

export default SelectForm;
// export default connect(null, { createOrder, editOrder, })(SelectForm);
