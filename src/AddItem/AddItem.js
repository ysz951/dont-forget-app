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
    },
    match: {
        params:{}
    }
  };
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
