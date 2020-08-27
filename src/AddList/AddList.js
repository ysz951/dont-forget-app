import React, { Component } from 'react';
import BuyListsContext from '../context/BuyListsContext';
import { Link } from 'react-router-dom';
import ListNav from '../ListNav/ListNav';
import BuyListApiService from '../services/buylist-api-service';
export default class AddList extends Component {
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
    const {list_name} = ev.target;
    const type = this.props.select;
    console.log(list_name.value, type);
    this.context.clearError();
    // return 
    BuyListApiService.postBuyList(list_name.value, type)
        .then(this.context.addBuyList)
        .then(() => {
            list_name.value = '';
            this.props.history.goBack();
        })
        .catch(err => this.context.setError(err.error))
    }
  render() {

    const { select =''} = this.props;
    return (
        <>
            <ListNav select={select}/>
            <div className="AddList">
                <form
                    className='AddList__Form'
                    onSubmit={this.handleSubmit}
                >
                {/* <div role='alert'>
                {error && <p className='red'>{error}</p>}
                </div> */}
                    <div className='AddList__listName_group'>
                        <label htmlFor='AddList__listName_input'>
                            Add a list
                        </label>
                        <input
                            name='list_name'
                            type='text'
                            required
                            id='AddList__listName_input'/>
                    </div>
                    <button className="AddList__listName_submitBtn" type='submit'>
                      add
                    </button>
                </form>
            </div>
        </>
    );
  }
}
