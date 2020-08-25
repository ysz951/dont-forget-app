import React, { Component } from 'react';
import BuyListsContext from '../context/BuyListsContext';
import { Link } from 'react-router-dom';
import './ShoppingItem.css'
export default class ShoppingItem extends Component {
  static defaultProps = {
    item: {},
  };
  static contextType = BuyListsContext;
  state = {
      checked: false
  }
  render() {
    const {item} = this.props;
    return (
        <div className="Shopping__Item">
            <button onClick={() => this.setState({checked: !this.state.checked})}>
                {this.state.checked ? 'Uncheck' : 'Check'}
            </button>
            <p className = {this.state.checked ? 'Shopping__Item_check' : 'Shopping__Item_uncheck'}>{item.name}</p>
            {!this.state.checked && <button>Next Time</button>}
        </div>
    );
  }
}
