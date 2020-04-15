import React, { Component } from 'react';
// import Moment from 'react-moment';
import { Template } from '../../components';
import { connect } from 'react-redux';
import './viewOrders.css';
import '../../components/order-form/orderForm.css';
import SelectForm from '../../components/select-form/selectForm';
import {
  fetchOrders,
  updateExistingOrder,
  editOrder,
  deleteOrder,
} from '../../redux/actions/orderActions';
class ViewOrders extends Component {
  constructor(props) {
    super(props);
    this.updatedOrdersRef = React.createRef();
    this.state = {
      orders: [],
      order_item: '',
      quantity: '',
      deleteId: '',
      editId: '',
    };
  }
  componentDidMount() {
    this.props.fetchOrders();
  }

  componentDidUpdate() {
    this.updateRefs();
  }

  updateRefs() {
    if (this.props.orders.length) {
      return this.updatedOrdersRef.current;
    }
  }

  async confirmEditOrder(data) {
    if (this.state.editId === '') {
      await this.setState({
        editId: data._id,
        ordered_by: data.ordered_by,
        quantity: data.quantity,
        order_item: data.order_item,
      });
      return this.props.updateExistingOrder(this.state);
    } else {
      return this.setState({ editId: '' });
    }
  }

  updateOrder(event) {
    event.preventDefault();
    let order = {
      id: this.props.id,
      order_item: this.props.order_item,
      quantity: this.props.quantity,
    };
    return this.props.editOrder(order);
  }

  async confirmDeleteOrder(data) {
    if (this.state.deleteId === '') {
      await this.setState({ deleteId: data._id });
    } else {
      return this.setState({ deleteId: '' });
    }
  }

  render() {
    const renderEditOrder = (order) => {
      if (this.state.editId === order._id) {
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
                onClick={() => this.confirmEditOrder()}
              >
                Cancel?
              </button>
              <button
                type='button'
                className='btn btn-primary btn-sm btn-success'
                onClick={(event) =>
                  this.props.editOrder(event, order) + this.confirmEditOrder()
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
      if (this.state.deleteId === order._id) {
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
                this.props.deleteOrder(order._id) + this.confirmDeleteOrder()
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
          {this.props.orders.map((order) => {
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

const mapStateToProps = (state) => ({
  orders: state.order.items,
  editId: state.order.item.id,
  deleteId: state.order.item.id,
  order_item: state.order.item.order_item,
  quantity: state.order.item.quantity,
});

export default connect(mapStateToProps, {
  fetchOrders,
  updateExistingOrder,
  editOrder,
  deleteOrder,
})(ViewOrders);
