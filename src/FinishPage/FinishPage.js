import React, { Component } from 'react';
import BuyListsContext from '../context/BuyListsContext';
import { Link } from 'react-router-dom';
// import './ShoppingItem.css'
export default class FinishiPage extends Component {
  static contextType = BuyListsContext;
  state = {
      saveToNext: []
  }
//   changeCheck = (itemId) => {
//     this.setState({checked: !this.state.checked})
//     this.state.checked ? this.context.deleteCheck(itemId) : this.context.addCheck(itemId);
//   }
  render() {
    // const {item} = this.props;
    console.log(this.context.checkSet)
    const {selectedBuyList} = this.context;
    const uncheckItems = selectedBuyList.filter(item => !this.context.checkSet.has(item.id))
    console.log(uncheckItems)
    // console.log(window.localStorage.getItem('selectSet'))
    return (
        
        <div>
            <p>Finish</p>
            <Link to='/buyLists'> Back </Link>
           </div>
    );
  }
}
