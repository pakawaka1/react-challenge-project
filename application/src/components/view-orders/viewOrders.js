import React, { Component } from 'react';
// import Moment from 'react-moment';
import { Template } from '../../components';
import { SERVER_IP } from '../../private';
import './viewOrders.css';
import '../../components/order-form/orderForm.css';
import SelectForm from '../../components/select-form/selectForm';

class ViewOrders extends Component {
  constructor(props) {
    super(props);
    this.updatedOrdersRef = React.createRef();
    this.state = {
      orders: [],
      order_item: '',
      quantity: '',
      deleteSelected: '',
      editSelected: '',
      ordered_by: '',
    };
  }

  componentDidMount() {
    this.fetchOrders();
  }

  fetchOrders() {
    fetch(`${SERVER_IP}/api/current-orders`)
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          this.setState({ orders: response.orders });
          console.log(this.state.orders);
        } else {
          console.log('Error getting orders');
        }
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.orders.length < this.state.orders.length) {
      return this.updatedOrdersRef.current;
    }
  }

  editItemChosen(event) {
    this.setState({ order_item: event.target.value });
  }

  editItemQuantity(event) {
    this.setState({ quantity: event.target.value });
  }

  confirmEditOrder(data) {
    if (this.state.editSelected === '') {
      return this.setState({
        editSelected: data._id,
        ordered_by: data.ordered_by,
        quantity: data.quantity,
        order_item: data.order_item,
      });
    } else {
      return this.setState({ editSelected: '' });
    }
  }

  editOrder(event, order) {
    const orderItem = order.order_item;
    const orderQuantity = order.quantity;
    fetch(`${SERVER_IP}/api/edit-order`, {
      method: 'POST',
      body: JSON.stringify({
        id: this.state.editSelected,
        order_item:
          this.state.order_item !== orderItem
            ? this.state.order_item
            : orderItem,
        quantity:
          this.state.quantity !== orderQuantity
            ? this.state.quantity
            : orderQuantity,
        ordered_by: this.state.ordered_by,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          this.fetchOrders();
        } else {
          console.log('Error getting orders');
        }
      });
  }

  confirmDeleteOrder(data) {
    console.log(data);
    if (this.state.deleteSelected === '') {
      return this.setState({ deleteSelected: data._id });
    } else {
      return this.setState({ deleteSelected: '' });
    }
  }

  deleteOrder(data) {
    fetch(`${SERVER_IP}/api/delete-order`, {
      method: 'POST',
      body: JSON.stringify({
        id: data,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (response.status === 200) {
        const updatedOrders = this.state.orders.filter(
          (order) => order._id !== data
        );
        this.setState({ orders: updatedOrders, deleteSelected: '' });
      } else {
        console.log('Error getting orders');
      }
    });
  }

  render() {
    const renderEditOrder = (order) => {
      if (this.state.editSelected === order._id) {
        return (
          <div className='form-wrapper'>
            <label className='form-label'>Edit Your Order:</label>
            <SelectForm>
              <select value={this.state.order_item} />
              <select value={this.state.quantity} />
            </SelectForm>
            <div className='editButtons'>
              <button
                type='button'
                className='btn btn-primary btn-sm btn-warning'
                onClick={(event) => this.confirmEditOrder()}
              >
                Cancel?
              </button>
              <button
                type='button'
                className='btn btn-primary btn-sm btn-success'
                onClick={(event) =>
                  this.editOrder(event, order) + this.confirmEditOrder()
                }
              >
                Update
              </button>
            </div>
          </div>
        );
      } else {
        return (
          <div>
            <h3>{order.order_item}</h3>
            <p>Quantity: {order.quantity}</p>
          </div>
        );
      }
    };

    const renderDeleteOrder = (order) => {
      if (this.state.deleteSelected === order._id) {
        return (
          <div>
            <button
              onClick={() => this.confirmDeleteOrder()}
              className='btn btn-primary btn-sm btn-warning'
              key={order.quantity}
            >
              Cancel?
            </button>
            <button
              onClick={() =>
                this.deleteOrder(order._id) + this.confirmDeleteOrder()
              }
              className='btn btn-primary btn-sm btn-danger'
              key={order.order_item}
            >
              Delete?
            </button>
          </div>
        );
      } else {
        return (
          <div>
            <button
              onClick={() => this.confirmDeleteOrder(order)}
              className='btn btn-danger'
              key={order.ordered_by}
            >
              Delete
            </button>
          </div>
        );
      }
    };
    return (
      <Template>
        <div className='container-fluid'>
          {this.state.orders.map((order) => {
            const createdDate = new Date(order.createdAt);
            return (
              <div
                className='row view-order-container'
                key={order._id}
                ref={this.updatedOrdersRef}
              >
                <div className='col-md-4 view-order-left-col p-3'>
                  {renderEditOrder(order)}
                </div>
                <div className='col-md-4 view-order-middle-col'>
                  <p>Ordered by: {order.ordered_by || ''}</p>
                  <p>
                    Order placed at{' '}
                    {/* <Moment format='hh:mm:ss'>{`${createdDate.getHours()}:${createdDate.getMinutes()}:${createdDate.getSeconds()}`}</Moment> */}
                    {`${createdDate.getHours()}:${createdDate.getMinutes()}:${createdDate.getSeconds()}`}
                  </p>
                </div>
                <div className='col-md-4 view-order-right-col'>
                  <button
                    onClick={() => this.confirmEditOrder(order)}
                    className='btn btn-primary btn-success'
                    key={order}
                  >
                    Edit
                  </button>
                  {renderDeleteOrder(order)}
                </div>
              </div>
            );
          })}
        </div>
      </Template>
    );
  }
}
export default ViewOrders;
