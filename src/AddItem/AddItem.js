import React, { Component } from 'react';
import BuyListsContext from '../context/BuyListsContext';
import { Link } from 'react-router-dom';
import ListNav from '../ListNav/ListNav';
import BuyListApiService from '../services/buylist-api-service';
export default class AddItem extends Component {
  static contextType = BuyListsContext;
  static defaultProps = {
    history: {
        goBack: () => {},
    }
  };
  componentDidMount() {
    const {listId} = this.props.match.params;
        this.context.clearError();
        BuyListApiService.getBuyListItems(listId)
            .then(res => {
                this.context.setItems(res.listItems);
                this.setState({listName: res.listName});
                // this.context.setSelectedBuyList(res.listItems)
            })
            .catch(err => this.context.setError(err.error))
  }
  handleSubmit = ev => {
    ev.preventDefault();
    const {item_name} = ev.target;
    const {listId} = this.props.match.params;
    const type = this.props.select;
    console.log(item_name.value, type,listId);
    // return
    this.context.clearError();
    // return 
    BuyListApiService.postBuyItem(item_name.value)
        // .then(this.context.addBuyList)
        .then(res => {
            item_name.value = '';
            // console.log(res)
            const temp = res;
            
            BuyListApiService.postItemToList(res.id, listId)
                .then(res => {
                    this.context.addItem(temp);
                    this.props.history.goBack();
                })
                .catch(err => this.context.setError(err.error))
        })
        .catch(err => this.context.setError(err.error))
    }
  render() {

    const { select ='' , history} = this.props;
    const { error } = this.context;
    return (
        <>
            <ListNav select={select}/>
            {error ?
            <div role='alert'>
                <p className='red'>error</p>
            </div>
            :
            <div className="AddItem">
                <form
                    className='AddItem__Form'
                    onSubmit={this.handleSubmit}
                >
                    <div className='AddItem__itemName_group'>
                        <label htmlFor='AddItem__itemName_input'>
                            Add a item
                        </label>
                        <input
                            name='item_name'
                            type='text'
                            required
                            id='AddItem__itemName_input'/>
                    </div>
                    <button className="AddItem__itemName_submitBtn" type='submit'>
                      add
                    </button>
                </form>
            </div>}
        </>
    );
  }
}
