import React, { Component } from 'react';
import BuyListsContext from '../context/BuyListsContext';
import { Link } from 'react-router-dom';
import ShoppingItem from '../ShoppingItem/ShoppingItem'
import './ShoppingPage.css'
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
    componentDidMount(){
        // console.log('ok');
        const {listId} = this.props;
        const { items, itemToList } = this.context;
        const ListItems = [];
        items.forEach(item => {
            itemToList.forEach(relation => {
                if (item.id === relation.item_id && relation.list_id === Number(listId)) {
                    ListItems.push(item);
                }
            })
        });
        this.context.setSelectedBuyList(ListItems)
    }
    render() {
        const ListItems = this.context.selectedBuyList || [];
        return (
            <div>
                <h2>Shopping</h2>
                <ul className="Shopping__list">
                    {this.renderItems(ListItems)}
                </ul>
                <Link to='/'> Finish</Link>
            </div>
        );
    }
}
