import React, { Component } from 'react';
import BuyListsContext from '../context/BuyListsContext';
import { Link } from 'react-router-dom';
import './BuyItemList.css';
import ListNav from '../ListNav/ListNav';
import BuyListApiService from '../services/buylist-api-service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {format} from 'date-fns';
export default class BuyItemList extends Component {
  static contextType = BuyListsContext;
  static defaultProps = {
    match: {
      params:{}
    }
  };
  state = {
      listName: '',
      textAreaActive: false,
      selectedItemId: null,
  }
  
  componentDidMount(){
        const {listId} = this.props.match.params;
        this.context.clearError();
        const { select ='' } = this.props;
        if (select === 'Now'){
            BuyListApiService.getBuyListItems(listId)
            .then(res => {
                this.context.setItems(res.listItems);
                this.setState({listName: res.listName});
                // this.context.setSelectedBuyList(res.listItems)
            })
            .catch(err => this.context.setError(err.error))
        }
        else {
            BuyListApiService.getNextListItems(listId)
            .then(res => {
                this.context.setItems(res.listItems);
                this.setState({listName: res.listName});
                // this.context.setSelectedBuyList(res.listItems)
            })
            .catch(err => this.context.setError(err.error))
        }
        
  }
  componentWillUnmount() {
    this.context.clearItems();
  }
  renderItems(ListItems, select) {
    return ( 
        ListItems.map(item => 
            <li className="Buy_List_item" key = {item.id}>
                {
                  this.state.textAreaActive && item.id === this.state.selectedItemId ?
                  <form
                      className='Buy_List_item_form'
                      onSubmit={this.submitUpdateItem}
                  > 
                      <textarea
                      className='Buy_List_item_textarea'
                      required
                      aria-label='Type a item name...'
                      name='updateItem'
                      id='updateItem'
                      defaultValue={item.item_name}
                      rows='1'
                      />
                      <div className="Buy__list_item_updateBtnGroup">
                        <button className="btn_type_2" type='button' 
                          onClick={this.closeTextArea}>
                            Cancel
                        </button>
                        <button className="btn_type_3" type='submit'>
                            Update
                        </button>
                      </div>
                  </form>
                  :
                  <div className="Buy__list_item_delteEditGroup">
                  <button className="Buy_List_item_deleteBtn"onClick={() => this.deleteItem(item.id)}> 
                    <FontAwesomeIcon icon='trash-alt' />
                    {/* Delete  */}
                  </button>
                  {' '}
                  <p className="Fredoka">{item.item_name}</p>
                  {' '}
                  <button className="Buy_List_item_editBtn" onClick={() => this.changeButtonClick(item.id)}> 
                    <FontAwesomeIcon icon='edit' />
                    {/* Edit */}
                  </button>
                  </div>

                }
                <p className="Buy__list_item_dateCreated Lora">{format(new Date(item.date_created), "yyyy-MM-dd HH:mm:ss")}</p>
            </li>
            
        )
    )
  }
  submitUpdateItem = ev => {
    ev.preventDefault();
    const {updateItem} = ev.target;
    const {listId} = this.props.match.params;
    BuyListApiService.updateItem(this.state.selectedItemId, updateItem.value, listId)
      .then(res => {
        this.context.updateItem(this.state.selectedItemId, updateItem.value)
        this.setState({
          textAreaActive: false,
          selectedItemId: null,
        })
      })
      .catch(this.context.setError)
  }
  deleteItem = (itemId) => {
    BuyListApiService.deleteItem(itemId)
      .then(res => {
        this.context.deleteItem(itemId);
      })
      .catch(this.context.setError)
  }
  changeButtonClick = (itemId) => {
    this.setState({
      textAreaActive: true,
      selectedItemId: itemId,
    })
  }
  closeTextArea = () => {
    this.setState({
      textAreaActive: false,
      selectedItemId: null,
    });
  }
  render() {
    const { select ='' } = this.props;
    const ListItems = this.context.items || [];
    const {listId} = this.props.match.params;
    const { error } = this.context;
    return (
        <>
            <ListNav select={select}/>
            {error ?
            <div role='alert' className="Buy__Items_error">
                <p className='red'>{error}</p>
            </div>
            :
            <section className="Buy__Items_section">
                <h2>{this.state.listName}</h2>
                <ul className="Buy__ListItems">
                    {this.renderItems(ListItems, select)}
                </ul>
                {select === "Now" ?
                <p className="Buy__shoppingLink">
                    <Link to={`/shopping/now/${listId}`}>
                    <FontAwesomeIcon className="Buy__shoppingLink__icon" icon="shopping-cart"/>
                    {' '}
                    Go Shopping
                    </Link>
                </p>
                :
                <p className="Buy__shoppingLink">
                    <Link to={`/shopping/next/${listId}`}>
                    <FontAwesomeIcon className="Buy__shoppingLink__icon" icon="shopping-cart"/>
                    {' '}
                        Go Shopping
                    </Link>
                </p>
                }
                {   
                    select === "Now" && 
                    <Link className = 'AddItem__Link' to={`/addBuyItem/${listId}`}> 
                    <FontAwesomeIcon className="AddBuyList_item__icon" icon="plus"/>
                        <span>Item</span>
                    </Link>
                  //   <Link className = 'AddBuyList__Link' to='/addbuylist'> 
                  //   <FontAwesomeIcon className="AddBuyList__icon" icon="plus"/>
                  //     <span>List</span>
                  // </Link>
                }
            </section>
            }
        </>
    );
  }
}
