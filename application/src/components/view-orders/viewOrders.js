import React, { Component } from 'react';
import { Template } from '../../components';
import { SERVER_IP } from '../../private';
import './viewOrders.css';


class ViewOrders extends Component {
    state = {
        orders: [],
        selected: ''        
    }

    componentDidMount() {
        fetch(`${SERVER_IP}/api/current-orders`)
            .then(response => response.json())
            .then(response => {
                if(response.success) {
                    this.setState({ orders: response.orders });
                } else {
                    console.log('Error getting orders');
                }
            });
    }
    
    componentDidUpdate(prevState) {
        if (this.state.orders < prevState.orders) {
            return this.updatedOrdersRef.current
        }
    }

    confirmDeleteOrder(data) {
        if (this.state.selected === '') {
            return this.setState({selected: data})
        } else {
            return this.setState({selected: ''})
        }
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
               this.setState({orders: updatedOrders, selected:''})
            } else {
                console.log('Error getting orders');
            }
        })
    }

    render() {
        const renderConfirmDelete = (orderId, orderItem) => {
            if (this.state.selected === orderId) {
                return (
                    <div>
                        <button onClick={() => this.confirmDeleteOrder()} className="btn btn-primary btn-sm btn-warning" key={orderId}>Cancel?</button>
                        <button onClick={() => this.deleteOrder(orderId)+ this.confirmDeleteOrder()} className="btn btn-primary btn-sm btn-danger" key={orderItem}>Delete?</button>                    
                     </div>
                    
                )
            } else {
                return (
                    <div>
                        <button onClick={() => this.confirmDeleteOrder(orderId)} className="btn btn-danger" key={orderId}>Delete</button>
                     </div>
                )
            }
        }
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
                                <div className="col-md-4 view-order-middle-col">
                                    <p>Order placed at {`${createdDate.getHours()}:${createdDate.getMinutes()}:${createdDate.getSeconds()}`}</p>
                                    <p>Quantity: {order.quantity}</p>
                                 </div>
                                 <div className="col-md-4 view-order-right-col">
                                     <button className="btn btn-primary btn-success">Edit</button>
                                     {renderConfirmDelete(order._id, order.order_item)}
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
