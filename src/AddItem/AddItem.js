import React, { Component } from 'react';
import BuyListsContext from '../context/BuyListsContext';
import ListNav from '../ListNav/ListNav';
import BuyListApiService from '../services/buylist-api-service';
import './AddItem.css'
export default class AddItem extends Component {
  static contextType = BuyListsContext;
  static defaultProps = {
    history: {
        goBack: () => {},
    },
    match: {
        params:{}
    }
  };

  componentDidMount(){
    const {listId} = this.props.match.params;
    this.context.clearError();
    const { select ='' } = this.props;
    if (select === 'Now') {
        BuyListApiService.getBuyListById(listId)
        .catch(err => this.context.setError(err.error))
    }
    else {
        BuyListApiService.getNextListById(listId)
        .catch(err => this.context.setError(err.error))
    }
 }
    

  handleSubmit = ev => {
    ev.preventDefault();
    const {item_name} = ev.target;
    const {listId} = this.props.match.params;
    this.context.clearError();
    BuyListApiService.postItem(item_name.value, listId)
        .then(res => {
            this.context.addItem(res)
            this.props.history.goBack();
        })
        .catch(err => this.context.setError(err.error))
    }
  render() {

    const { select ='' } = this.props;
    const { error } = this.context;
    return (
        <>
            <ListNav select={select}/>
            {error ?
            <div role='alert'  className="Buy__Items_error">
                <p className='red'>{error}</p>
            </div>
            :
            <div className="AddItem">
                <h2>Add a item</h2>
                <form
                    className='AddItem__Form'
                    onSubmit={this.handleSubmit}
                >
                    <div className='AddItem__itemName_group'>
                        <label htmlFor='AddItem__itemName_input'>
                            Item name
                        </label>
                        <input
                            name='item_name'
                            type='text'
                            required
                            id='AddItem__itemName_input'/>
                    </div>
                    <button className="AddItem__itemName_Btn btn_type_2" type='button'
                    onClick={() => {this.props.history.goBack()}}>
                      Cancel
                    </button>
                    {' '}
                    <button className="AddItem__itemName_Btn btn_type_2" type='submit'>
                      OK
                    </button>
                </form>
            </div>}
        </>
    );
  }
}
