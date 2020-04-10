import React, { Component } from 'react';
import { Template } from '../../components';
import { SERVER_IP } from '../../private';
import './viewOrders.css';


class ViewOrders extends Component {
    state = {
        orders: []
    }

    componentDidMount() {
        fetch(`${SERVER_IP}/api/current-orders`)
            .then(response => response.json())
            .then(response => {
                if(response.success) {
                    this.setState({ orders: response.orders });
                    console.log(this.state.orders)
                } else {
                    console.log('Error getting orders');
                }
            });
    }

    componentDidUpdate(prevState) {
        if (this.state.orders < prevState.orders) {
            const updatedOrdersRef = this.updatedOrdersRef.current
            return updatedOrdersRef.scrollHeight - updatedOrdersRef.scrollTop;
        }
        return null;
    }


    deleteOrder(data) {
        fetch(`${SERVER_IP}/api/delete-order`, {
            method: 'POST',
            body: JSON.stringify({
                id: data
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if(response.status === 200) {
                const updatedOrders = this.state.orders.filter((order) => (
                    order._id !== data
            ))  
               this.setState({orders: updatedOrders })
            } else {
                console.log('Error getting orders');
            }
        })
    }

    render() {
        return (
            <Template>
                <div className="container-fluid">
                    {this.state.orders.map((order) => {
                        const createdDate = new Date(order.createdAt);
                        return (
                            <div className="row view-order-container" key={createdDate} ref={this.updatedOrdersRef}>
                                <div className="col-md-4 view-order-left-col p-3">
                                    <h2>{order.order_item}</h2>
                                    <p>Ordered by: {order.ordered_by || ''}</p>
                                </div>
                                <div className="col-md-4 d-flex view-order-middle-col">
                                    <p>Order placed at {`${createdDate.getHours()}:${createdDate.getMinutes()}:${createdDate.getSeconds()}`}</p>
                                    <p>Quantity: {order.quantity}</p>
                                 </div>
                                 <div className="col-md-4 view-order-right-col">
                                     <button className="btn btn-success">Edit</button>
                                     <button onClick={() => this.deleteOrder(order._id)}  className="btn btn-danger"key={order._id}>Delete</button>
                                 </div>
                            </div>
                        )
                    })
                }
                </div>
            </Template>
        );
    }
}

export default ViewOrders;
