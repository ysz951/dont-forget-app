import React, { Component } from 'react';
import BuyListsContext from '../context/BuyListsContext';
import { Link } from 'react-router-dom';
import './ShoppingItem.css'
export default class ShoppingItem extends Component {
  static contextType = BuyListsContext;
  state = {
      checked: false
  }
  changeCheck = (itemId) => {
    this.setState({checked: !this.state.checked})
    this.state.checked ? this.context.deleteCheck(itemId) : this.context.addCheck(itemId);
  }
  render() {
    const {item} = this.props;
    // console.log(this.context.checkSet)
    return (
        <div className="Shopping__Item">
            <button onClick={() => this.changeCheck(item.id)}>
                {this.state.checked ? 'Uncheck' : 'Check'}
            </button>
            <p className = {this.state.checked ? 'Shopping__Item_check' : 'Shopping__Item_uncheck'}>
              {item.item_name}
            </p>
            {!this.state.checked && <button>Next Time</button>}
        </div>
    );
  }
}
