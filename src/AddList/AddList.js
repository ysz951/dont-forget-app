import React, { Component } from 'react';
import BuyListsContext from '../context/BuyListsContext';
import ListNav from '../ListNav/ListNav';
import BuyListApiService from '../services/buylist-api-service';
import './AddList.css'
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
              <h2> Add a list </h2>
                <form
                    className='AddList__Form'
                    onSubmit={this.handleSubmit}
                >
                    <div className='AddList__listName_group'>
                        <label htmlFor='AddList__listName_input'>
                            List name
                        </label>
                        <input
                            name='list_name'
                            type='text'
                            required
                            id='AddList__listName_input'/>
                    </div>
                    <button className="AddItem__itemName_Btn btn_type_2" type='button'
                    onClick={() => {this.props.history.goBack()}}>
                      Cancel
                    </button>
                    {' '}
                    <button className="AddList__listName_Btn btn_type_2" type='submit'>
                      OK
                    </button>
                </form>
            </div>
        </>
    );
  }
}
