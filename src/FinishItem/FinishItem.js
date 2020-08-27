import React, { Component } from 'react';
import BuyListsContext from '../context/BuyListsContext';
export default class FinishItem extends Component {
  static contextType = BuyListsContext;
  static defaultProps = {
    uncheckItems: [{
        id: null,
        item_name: '',
    }]
  }
  render() {
    const {uncheckItems} = this.props;
    return (
        uncheckItems.map(item => 
            <li key={item.id}>
                {this.context.nextSet.has(item.id) 
                ? <span className="red">{item.item_name}</span>
                : item.item_name
                }
                {this.context.nextSet.has(item.id) 
                ? <button onClick={() => {this.context.deleteNext(item.id)}}> cancel </button>
                : <button onClick={() => {this.context.addNext(item.id)}}> add next </button>
                }
            </li>
        )
    )
 }
}
