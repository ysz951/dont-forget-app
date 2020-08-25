import React, { Component } from 'react';
import BuyListsContext from '../context/BuyListsContext';
import { Link } from 'react-router-dom';
import './BuyItemList.css';
import ListNav from '../ListNav/ListNav';
export default class BuyItemList extends Component {
  static defaultProps = {
    item: {},
  };
  static contextType = BuyListsContext;
  renderItems(ListItems) {
    return (
        ListItems.map(item => 
            <li className="Buy_List_item" key = {item.id}>
                <p>{item.name}</p>
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
    const buyLists = this.context.buyLists;
    const {listId} = this.props;
    // console.log(listId)
    const { select ='' } = this.props;
    const ListInd = buyLists.findIndex(list => list.id === Number(listId));
    const ListName = buyLists[ListInd] ? buyLists[ListInd].name : "";
    const ListItems = this.context.selectedBuyList || [];
    return (
        <>
            <ListNav select={select}/>
            <div>
                <h2>{ListName}</h2>
                <ul className="Buy__ListItems">
                    {this.renderItems(ListItems)}
                </ul>
                <p className="Buy__shoppingLink"><Link to={`/shopping/${listId}`}>Go Shopping</Link></p>
            </div>
        </>
    );
  }
}
