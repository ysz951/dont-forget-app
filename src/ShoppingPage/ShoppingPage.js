import React, { Component } from 'react';
import BuyListsContext from '../context/BuyListsContext';
import { Link } from 'react-router-dom';
import ShoppingItem from '../ShoppingItem/ShoppingItem';
import BuyListApiService from '../services/buylist-api-service';
import './ShoppingPage.css';
export default class Shopping extends Component {
    static contextType = BuyListsContext;
    renderItems(ListItems) {
        return (
            ListItems.map(item => 
                <li className="Shopping__list_item" key = {item.id}>
                    <ShoppingItem item={item}/>
                </li>
            )
        )
    }
    finshiShopping = () => {
        this.props.history.push('/buyList');
    }
    componentDidMount(){
        const {listId} = this.props.match.params;
        this.context.clearError();
        BuyListApiService.getBuyListItems(listId)
            .then(res => {
                // this.context.setItems(res.listItems);
                // this.setState({listName: res.listName});
                this.context.setSelectedBuyList(res.listItems)
            })
            .catch(err => this.context.setError(err.error))
    }
    render() {
        const ListItems = this.context.selectedBuyList || [];
        const {error} = this.context;
        return (
            <div>
                <h2>Shopping</h2>
                {error  &&  
                <div role='alert'>
                    <p className='red'>{error}</p>
                </div>}
                <ul className="Shopping__list">
                    {this.renderItems(ListItems)}
                </ul>
                <button onClick={() => this.finshiShopping()}> Finish </button>
            </div>
        );
    }
}
