import React, { Component } from 'react';
import BuyListsContext from '../context/BuyListsContext';
import { Link } from 'react-router-dom';
// import './BuyItemList.css';
import ListNav from '../ListNav/ListNav';
import BuyListApiService from '../services/buylist-api-service';
export default class NextItemList extends Component {
  static contextType = BuyListsContext;
  state = {
      listName: '',
  }
  renderItems(ListItems) {
    return (
        ListItems.map(item => 
            <li className="Buy_List_item" key = {item.id}>
                <p>{item.item_name}</p>
            </li>
        )
    )
  }
  componentDidMount(){
        // console.log(this.props.match);
        const {listId} = this.props.match.params;
        this.context.clearError();
        BuyListApiService.getNextListItems(listId)
            .then(res => {
                this.context.setItems(res.listItems);
                this.setState({listName: res.listName});
                // this.context.setSelectedBuyList(res.listItems)
            })
            .catch(err => this.context.setError(err.error))
  }
  componentWillUnmount() {
    this.context.clearItems();
  }
  render() {
    // const {buyLists} = this.context;
    // const {listId} = this.props;
    // console.log(listId)
    const { select ='' } = this.props;
    // const ListInd = buyLists.findIndex(list => list.id === Number(listId));
    // const ListName = buyLists[ListInd].name;
    const ListItems = this.context.items || [];
    const {listId} = this.props.match.params;
    const { error } = this.context;
    // console.log(this.context.selectedBuyList)
    return (
        <>
            <ListNav select={select}/>
            {error ?
            <div role='alert'>
                <p className='red'>{error}</p>
            </div>
            :
            <div>
                <h2>{this.state.listName}</h2>
                <ul className="Buy__ListItems">
                    {this.renderItems(ListItems)}
                </ul>
                <p className="Buy__shoppingLink">
                    <Link to={`/shopping/${listId}`}>
                    Go Shopping
                    </Link>
                </p>
                {/* <Link className = 'AddItem__Link' to={`/addBuyItem/${listId}`}> Add a item </Link> */}
            </div>
            }
        </>
    );
  }
}
